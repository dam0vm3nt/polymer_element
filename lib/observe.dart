@JS()
library observe;

import 'dart:async';
import 'package:polymer_element/require.dart';
import 'package:js/js.dart';

@JS()
@anonymous
class _Support {
  external makeObservable(obj, observer callback);
  external cancelObserver(obj, observer callback);
}


var _observe_support;

Future get whenReady async {
  if (_observe_support == null) {
    _observe_support = (await require(['external/polymer_element/observe_support']))
        .single;
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
makeObservable(obj, observer callback) =>
    _observe_support.makeObservable(obj, callback);

cancelObserver(obj, observer callback) =>
    _observe_support.cancelObserver(obj, callback);
