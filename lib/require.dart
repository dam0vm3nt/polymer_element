@JS()
library require;

import 'dart:async';
import 'dart:js';

import 'package:js/js.dart';
import 'package:js/js_util.dart';

@JS('require')
external _require(List modules,Function body);

Future<List> require(List<String> modules) {
  Completer<List> whenLoaded = new Completer();

  _require(['polymer_element/utils'],(utils) {
    callMethod(utils,'require_varargs',[modules,(res) {
        whenLoaded.complete(res);
    }]);
  });
/*
  context.callMethod('require', [
    new JsArray.from(['polymer_element/utils']),
    (JsObject utils) {
      utils.callMethod('require_varargs', [
        new JsArray.from(modules),
        (JsArray res) {
          whenLoaded.complete(new List<JsObject>.from(res));
        }
      ]);
    }
  ]);
*/
  return whenLoaded.future;
}
