@JS('Polymer')
library polymer_element;

import 'dart:html' as html;
import 'dart:html_common';

import 'package:js/js.dart';

//@JS('Element')
abstract class Element implements html.Element  {
  set(propertyName,value);
}
