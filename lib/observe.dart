@JS()
@HtmlImport('observe_support.html')
library observe;

import 'dart:async';
import 'package:html5/html.dart';
import 'package:polymer_element/dart_callbacks_behavior.dart';
import 'package:polymer_element/property_observer_behavior.dart';
import 'package:polymerize_common/init.dart';
import 'package:polymer_element/polymer_element.dart';
import 'package:polymer_element/require.dart';
import 'package:js/js.dart';
import 'package:js/js_util.dart';
import 'package:polymerize_common/html_import.dart';

@JS()
@anonymous
class _Support {
  external makeObservable(obj, observer callback);
  external cancelObserver(obj, observer callback);
  external List<String> findProps(obj);
}

typedef observer(String propertyName, oldValue, newValue);

class ObserveSupport {
  var _observe_support;

  ObserveSupport._(this._observe_support);

  static ObserveSupport _loaded;

  static Future<ObserveSupport> load() =>
      _loaded ??
      requireOne('polymer_element/observe_support').then((_observe_support) {
        _loaded = new ObserveSupport._(_observe_support);
        return _loaded;
      });

  /***
   * Makes an observable version of "obj". When properties are changed
   * the callback is called.
   *
   * Calling it on an already observable object returns the same object but
   * adds a listener.
   */
  makeObservable(obj, observer callback) => _observe_support.makeObservable(obj, callback);

  cancelObserver(obj, observer callback) => _observe_support.cancelObserver(obj, callback);

  List<String> findProps(obj) => _observe_support.findProps(obj);
}

ObserveSupport observeSupport;

@init
preloadObserveSupport() {
  ObserveSupport.load().then((x) {
    observeSupport = x;
  });
}

@JS('Object')
external _JSObject get JSObject;

@JS()
@anonymous
class _JSObject {
  external List<String> keys(obj);
}

@PolymerBehavior('Polymerize.AutonotifyBehavior')
abstract class AutonotifyBehavior implements DartCallbacksBehavior, PropertyObserverBehavior {
  //PropertyChangeHandler _rootHandler;
  Set<String> _topLevelProps;
  Observer _mainObserver;
  Notifier _mainNotifier;
  void readyPreHook() {
    String tagName = (this as HTMLElement).tagName;
    Metadata data = metadataRegistry[tagName];

    // Need to observe only the top level names of nested props
    //_rootHandler = new PropertyChangeHandler.root(this as PolymerElement);
    _topLevelProps = new Set.from(data.observedPaths.map((p) => p.split('.').first));
  }

  void onPropertiesChangedPreHook(data, changedProps, oldData) {
    if (_mainObserver == null) {
      _mainObserver = new Observer();
      _mainNotifier = new Notifier(data, "", (prop) => onNotify(prop), _mainObserver, filter: _topLevelProps);
    }

    JSObject.keys(changedProps).forEach((propName) {
      var oldv = getProperty(oldData, propName);
      var newv = getProperty(data, propName);
      if (oldv != newv) {
        _mainObserver(propName, oldv, newv);
      }
    });
  }

  void onNotify(String propName) {
    // Filter on top level listened props

    (this as PolymerElement).notifyPath(propName);
  }
}

typedef void Notify(String path);

class Change {
  String property;
  var oldValue;
  var newValue;

  Change(this.property, this.oldValue, this.newValue);
}

class Observer {
  StreamController<Change> _consumer = new StreamController.broadcast();
  Stream<Change> get changes => _consumer.stream;

  void call(propName, oldv, newv) {
    _consumer.add(new Change(propName, oldv, newv));
  }
}

class Notifier {
  String _path;
  Notify _notify;
  Observer _observer;
  var _obj;
  Map<String, Notifier> _childObservers = {};

  Notifier._(this._obj, this._path, this._notify, this._observer) {}

  factory Notifier(_obj, String _path, Notify _notify, Observer _observer, {Set<String> filter,Set examined}) {
    // TODO : CONVERTIRE IN FACTORY ED EVITARE I LOOP RICORSIVI
    if (examined == null) {
      examined = new Set();
    }

    if (examined.contains(_obj)) {
      return null;
    }

    examined.add(_obj);

    Notifier n = new Notifier._(_obj, _path, _notify, _observer);
    List<String> props = observeSupport.findProps(_obj);
    print("FOUND ${props} in ${_obj}");
    props.forEach((name) {
      if (filter != null && !filter.contains(name)) return;
      var val = getProperty(_obj, name);
      if (val != null) {
        n._observeProp(val, name,examined);
      }
    });

    examined.remove(_obj);

    // Add listeners
    _observer.changes.listen(n._onChange);

    return n;
  }

  void _observeProp(val, String name,[Set examined]) {
    Observer obs = new Observer();
    var obsVal = observeSupport.makeObservable(val, obs);
    if (obsVal != null) {
      Notifier forProp = new Notifier(val, "${_path}${name}.", _notify, obs,examined: examined);
      setProperty(_obj, name, obsVal);
      _childObservers[name] = forProp;
    }
  }

  void close() {
    _childObservers.forEach((String prop, Notifier not) {
      not.close();
    });
    _childObservers.clear();
    // Stop observing
    observeSupport.cancelObserver(_obj, _observer);

    // clear refs
    _observer = null;
    _obj = null;
    _notify = null;
    _path = null;
  }

  void _onChange(Change chg) {
    // Remove prev listener
    Notifier _prev = _childObservers.remove(chg.property);
    if (_prev != null) {
      _prev.close();
    }

    if (chg.newValue != null) {
      _observeProp(chg.newValue, chg.property);
    }

    // Notify
    _notify("${_path}${chg.property}");
  }
}

class PropertyChangeHandler {
  PolymerElement _target;
  String _propPath;
  String _propName;
  bool _notify = true;
  Map<String, PropertyChangeHandler> _subPropertyHandlers;

  PropertyChangeHandler();
  var parent;
  var current;

  void call(prop, oldv, newv) {
    PropertyChangeHandler handler = _subPropertyHandlers[prop];
    if (handler != null) {
      handler.handlePropertyChange(current, oldv, newv);
    }
  }

  void install(parent) {
    this.parent = parent;
    if (_propName != null && _subPropertyHandlers.isNotEmpty) {
      current = getProperty(parent, _propName);

      if (current != null) {
        setProperty(parent, _propName, observeSupport.makeObservable(current, this));
      }

      // install subhandlers too
      installSubListeners();
    }
  }

  void installSubListeners() {
    if (current != null) {
      _subPropertyHandlers.forEach((pname, handler) {
        handler.install(current);
      });
    }
  }

  void uninstallSubListeners() {
    _subPropertyHandlers.values.forEach((sub) => sub.uninstall());
  }

  void uninstall() {
    uninstallSubListeners();
    if (current != null) {
      observeSupport.cancelObserver(current, this);
      current = null;
    }
  }

  factory PropertyChangeHandler.root(PolymerElement target) {
    Metadata data = metadataRegistry[target.tagName];
    if (data == null) {
      return null;
    }

    PropertyChangeHandler handler = new PropertyChangeHandler()
      .._target = target
      .._propPath = null
      .._propName = null
      .._notify = false
      .._subPropertyHandlers = createHandlerTree(target, data.observedPaths.map((x) => x.split('.')), notify: false);

    return handler;
  }

  static Map<String, PropertyChangeHandler> createHandlerTree(PolymerElement target, Iterable<List<String>> propPaths, {String rootPath = "", bool notify: true}) {
    Map<String, List<List<String>>> tree = {};

    propPaths.where((l) => l.isNotEmpty).forEach((List<String> propPath) {
      String topLevelName = propPath.first;
      List<List<String>> subTree = tree.putIfAbsent(topLevelName, () => []);
      subTree.add(propPath.sublist(1));
    });

    Map<String, PropertyChangeHandler> handlers = {};
    // Now create handlers
    tree.forEach((String topLevelName, List<List<String>> subPaths) {
      String thisPath = "${rootPath}${topLevelName}";
      handlers[topLevelName] = new PropertyChangeHandler()
        .._target = target
        .._propPath = thisPath
        .._propName = topLevelName
        .._notify = notify
        .._subPropertyHandlers = createHandlerTree(target, subPaths, rootPath: "${thisPath}.");
    });

    return handlers;
  }

  void handlePropertyChange(parent, oldv, newv) {
    if (_notify) _target.notifyPath(_propPath);

    // uninstall old sub listeners
    uninstall();

    current = newv;

    // install new sub listeners
    install(parent);
  }

  toString() => "{ ${_propPath} -> [ ${_subPropertyHandlers.values.map((x) => x.toString()).join(',\n')} ] }";
}
