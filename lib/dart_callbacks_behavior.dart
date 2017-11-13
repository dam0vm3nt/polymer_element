@JS('Polymerize')
library polymer_element.dart_callbacks;

import 'package:js/js.dart';
import 'package:polymer_element/polymer_element.dart';

@anonymous
@JS()
abstract class Unregister {
  external void unregister();
}


@JS('DartCallbacksBehavior')
abstract class DartCallbacksBehavior {

  readyPostHook();

  connectedCallbackPostHook();

  disconnectedCallbackPostHook();

  attributeChangedCallbackPostHook(name, old, value);

  readyPreHook();

  connectedCallbackPreHook();

  disconnectedCallbackPreHook();

  attributeChangedCallbackPreHook(name, old, value);

  external Unregister registerConnectedCallback(void callback(),[bool post=false]);
  external Unregister registerDisconnectedCallback(void callback(),[bool post=false]);
  external Unregister registerAttributeChangedCallback(void callback(String name,oldValue,newValue),[bool post=false]);
  external Unregister registerReadyCallback(void callback(),[bool post=false]);

}