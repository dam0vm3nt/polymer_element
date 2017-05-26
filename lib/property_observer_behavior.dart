@JS('Polymerize')
library polymer_element.property_observer_behavior;

import 'package:js/js.dart';

@JS('PropertyObserverBehavior')
abstract class PropertyObserverBehavior {
  onPropertiesChangedPreHook(data,changedProps,oldData);

  onPropertiesChangedPostHook(data,changedProps,oldData);
}