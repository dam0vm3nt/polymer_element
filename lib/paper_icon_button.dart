@JS('PolymerElements')
library paper_icon_button;
import 'package:js/js.dart';
import 'package:polymer_element/polymer_element.dart';

@JS('PaperIconButton')
class _PaperIconButton extends PolymerElement {
}



@PolymerRegister('paper-icon-button',template:'src/paper-icon-button/paper-icon-button.html',native:true)
class PaperIconButton extends _PaperIconButton {
}
