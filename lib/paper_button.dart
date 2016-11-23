@JS('PolymerElements')
library paper_button;
import 'dart:html';
import 'package:js/js.dart';
import 'package:polymer_element/iron_input.dart';
import 'package:polymer_element/polymer_element.dart';


//@JS('PaperButton')
@PolymerRegister('paper-button',template:'src/paper-button/paper-button.html',native:true)
class PaperButton extends PolymerElement {
  external IronInput get inputElement;

}
