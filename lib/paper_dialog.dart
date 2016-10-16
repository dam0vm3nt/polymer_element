import 'package:polymer_element/polymer_element.dart';

@PolymerRegister('paper-dialog',template:'src/paper-dialog/paper-dialog.html',native:true)
class PaperDialog extends PolymerElement {
  bool opened;
  void open() {}
}
