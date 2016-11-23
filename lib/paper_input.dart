@JS('PolymerElements')
library paper_input;
import 'dart:html';
import 'package:js/js.dart';
import 'package:polymer_element/iron_input.dart';
import 'package:polymer_element/polymer_element.dart';


//@JS('PaperInput')
@PolymerRegister('paper-input',template:'src/paper-input/paper-input.html',native:true)
class PaperInput extends PolymerElement {
  external IronInput get inputElement;

}
