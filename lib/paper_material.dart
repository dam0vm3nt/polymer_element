@JS('PolymerElements')
library paper_material;
import 'package:js/js.dart';
import 'package:polymer_element/polymer_element.dart';

@JS('PaperMaterial')
class _PaperMaterial extends PolymerElement {
}



@PolymerRegister('paper-material',template:'src/paper-material/paper-material.html',native:true)
class PaperMaterial extends _PaperMaterial {
}
