@JS('Polymerize')
@HtmlImport('polymerize_js.html')
library polymerize_util;

import 'package:js/js.dart';
import 'package:polymerize_common/html_import.dart';
import 'package:polymer_element/polymer_element.dart';

part 'super.polymerize.dart';

/// A bad work-around to give access to super in mixins.
@JS()
external void callSuper(var target,String name,[List args]);
