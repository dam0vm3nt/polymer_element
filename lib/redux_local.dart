@JS()
library polymer_element.redux_local;

import 'package:js/js.dart';
import 'package:polymer_element/polymer_element.dart';


@BowerImport(
    ref: 'polymer-dart/polymer-redux#redux-local',
    import: "polymer-redux-local/polymer-redux-local.html",
    name: 'polymer-redux-local')
@JS("PolymerReduxLocal")
abstract class ReduxLocalBehavior {
  external get store;
  external set store(v);
  external dispatch(ReduxAction action);
}
