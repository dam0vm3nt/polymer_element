import 'dart:async';
import 'dart:js';

Future<List<JsObject>> require(List<String> modules) {
  Completer<List<JsObject>> whenLoaded = new Completer();

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

  return whenLoaded.future;
}
