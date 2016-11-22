@JS('PolymerElements')
library iron_icon;
import 'package:js/js.dart';
import 'package:polymer_element/polymer_element.dart';

@JS('IronIcon')
class _IronIcon extends PolymerElement {
}



@PolymerRegister('iron-icon',template:'src/iron-icon/iron-icon.html',native:true)
class IronIcon extends _IronIcon {
}
