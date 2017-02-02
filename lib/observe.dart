@JS()
library observe;

import 'dart:async';
import 'package:polymer_element/require.dart';
import 'package:js/js.dart';
import 'package:js/js_util.dart';

@JS()
@anonymous
class _Support {
  external makeObservable(obj, observer callback);
  external cancelObserver(obj, observer callback);
}

typedef observer(String propertyName, oldValue, newValue);

Future getMetadata(Type t) async => callMethod((await require(['external/polymer_element/polymerize'])).single,'recoverMetadata',[t]);

class ObserveSupport {
  var _observe_support;

  ObserveSupport._(this._observe_support);

  static ObserveSupport _loaded;

  static Future<ObserveSupport> load() async =>
      _loaded ??
      (_observe_support) {
        _loaded = new ObserveSupport._(_observe_support);
        return _loaded;
      }((await require(['external/polymer_element/observe_support'])).single);

  /***
   * Makes an observable version of "obj". When properties are changed
   * the callback is called.
   *
   * Calling it on an already observable object returns the same object but
   * adds a listener.
   */
  makeObservable(obj, observer callback) => _observe_support.makeObservable(obj, callback);

  cancelObserver(obj, observer callback) => _observe_support.cancelObserver(obj, callback);
}
