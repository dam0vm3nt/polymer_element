@JS('Polymerize')
library polymer_element.dart_callbacks;

import 'package:js/js.dart';

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
}