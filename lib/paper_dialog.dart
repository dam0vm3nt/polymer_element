@JS('PolymerElements')
library paper_dialog;
import 'package:js/js.dart';
import 'package:polymer_element/polymer_element.dart';


//@JS('PaperDialog')
@PolymerRegister('paper-dialog',template:'src/paper-dialog/paper-dialog.html',native:true)
class PaperDialog extends PolymerElement {
  external bool get opened;
  external set opened(bool v);
  external void open();
}
