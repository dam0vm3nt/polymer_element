@JS('PolymerElements')
library paper_button;
import 'dart:html';
import 'package:js/js.dart';
import 'package:polymer_element/polymer_element.dart';


abstract class PaperButtonBehavior {
  bool get raised;
  set raised(bool value);
}

//@JS('PaperButton')
@PolymerRegister('paper-button',template:'src/paper-button/paper-button.html',native:true)
class PaperButton extends PolymerElement with PaperButtonBehavior {

}
