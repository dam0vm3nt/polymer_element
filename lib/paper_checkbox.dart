@JS('PolymerElements')
library paper_checkbox;
import 'package:js/js.dart';
import 'package:polymer_element/polymer_element.dart';

@JS('PaperCheckbox')
class _PaperCheckbox extends PolymerElement {
}



@PolymerRegister('paper-checkbox',template:'src/paper-checkbox/paper-checkbox.html',native:true)
class PaperCheckbox extends _PaperCheckbox {
}
