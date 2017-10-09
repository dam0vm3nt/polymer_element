@JS()
library require;

import 'dart:async';

import 'package:js/js.dart';
import 'package:js/js_util.dart' show callMethod;
import 'package:html5/html.dart';

@JS('require')
external _require(List modules, Function callback,Function errback);

Future loadModule(module) {
  Completer done = new Completer();
  _require([module], (mod) => done.complete(mod),(error)=>done.completeError(error));
  return done.future;
}