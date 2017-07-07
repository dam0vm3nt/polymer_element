@JS()
@JsMap('bower_components/polymer-redux/dist/polymer-redux.js')
library polymer_element.redux_local;

import 'package:js/js.dart';
import 'package:polymer_element/polymer_element.dart';
import 'package:polymerize_common/map.dart';
import 'package:polymer_element/redux.dart' as redux;

typedef Reducer(state, ReduxAction action);

@JS()
@anonymous
class ReduxAction<X> {
  external String get type;
  external X get detail;
  external factory ReduxAction({String type, X detail});
}

redux.Action<X> asAction<X>(ReduxAction<X> a) => new redux.Action<X>(a);

@BowerImport(
    ref: 'polymer-dart/polymer-redux#v2.0.1',
    import: "polymer-redux/polymer-redux-local.html",
    name: 'polymer-redux')
@JS("PolymerReduxLocal")
abstract class ReduxLocalBehavior {
  external get store;
  external set store(v);
  external dispatch(ReduxAction action);
}
