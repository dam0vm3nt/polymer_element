@JS()
library polymer_element.redux_local;

import 'package:js/js.dart';
import 'package:polymer_element/polymer_element.dart';


typedef Reducer(state, ReduxAction action);


@JS()
@anonymous
class ReduxAction<X> {
  external String get type;
  external X get detail;
  external factory ReduxAction({String type, X detail});
}

class ReduxActionFactory {
  const ReduxActionFactory();
}

const ReduxActionFactory reduxActionFactory = const ReduxActionFactory();



@BowerImport(
    ref: 'polymer-dart/polymer-redux#local-redux-3',
    import: "polymer-redux-local/polymer-redux-local.html",
    name: 'polymer-redux-local')
@JS("PolymerReduxLocal")
abstract class ReduxLocalBehavior {
  external get store;
  external set store(v);
  external dispatch(ReduxAction action);
}
