@JS('PolymerElements')
library paper_input;
import 'dart:html';
import 'package:js/js.dart';
import 'package:polymer_element/polymer_element.dart';

@JS('PaperInput')
class _PaperInput extends PolymerElement {
  external InputElement get inputElement;
}



@PolymerRegister('paper-input',template:'src/paper-input/paper-input.html',native:true)
class PaperInput extends _PaperInput {
}
