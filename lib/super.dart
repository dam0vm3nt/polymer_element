@JS('Polymerize')
library polymerize_util;

import 'package:js/js.dart';

/// A bad work-around to give access to super in mixins.
@JS()
external void callSuper(var target,String name,[List args]);
