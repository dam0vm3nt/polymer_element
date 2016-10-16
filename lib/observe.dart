import 'dart:async';
import 'dart:js';
import 'package:polymer_element/require.dart';

JsObject _observe_support;

Future get whenReady async {
  if (_observe_support == null) {
    _observe_support =
        (await require(['polymer_element/observe_support'])).single;
  }
  return true;
}

typedef observer(String propertyName, oldValue, newValue);

/***
 * Makes an observable version of "obj". When properties are changed
 * the callback is called.
 *
 * Calling it on an already observable object returns the same object but
 * adds a listener.
 */
makeObservable(obj, observer callback) {
  return _observe_support.callMethod('makeObservable', [obj, callback]);
}

cancelObserver(obj, observer callback) {
  _observe_support.callMethod('cancelObserver', [obj, callback]);
}
