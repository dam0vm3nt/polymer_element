@JS()
library require;

import 'dart:async';

import 'package:js/js.dart';
import 'package:js/js_util.dart' show callMethod;
import 'package:html5/html.dart';

@JS('require')
external _require(List modules, Function body);

Future requireOne(String module) async => (await require([module])).single;

Future<List> require(List<String> modules) async {
  List result = [];
  modules.forEach((m) => _require([m], (x) => result.add(x)));
  return result;
}