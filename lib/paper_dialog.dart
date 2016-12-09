@JS('PolymerElements')
library paper_dialog;
import 'package:js/js.dart';
import 'package:polymer_element/polymer_element.dart';


//@JS('PaperDialog')


@PolymerRegister('paper-dialog',template:'src/paper-dialog/paper-dialog.html',native:true)
abstract class PaperDialog extends PolymerElement {
  bool get opened;
  set opened(bool v);
  void open();
}
