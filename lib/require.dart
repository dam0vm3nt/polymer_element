@JS()
library require;

import 'dart:async';

import 'package:js/js.dart';
import 'package:js/js_util.dart' show callMethod;
import 'package:html5/html.dart';

@JS('require')
external _require(List modules, Function body);

Future<List> require(List<String> modules) async {
  // Load all html imports
  await Future.wait(modules.map((module) {
    HTMLLinkElement lnk = (document.createElement('link') as HTMLLinkElement)
      ..rel = 'import'
      ..href = "${module}.html";
    document.querySelector('head').append(lnk);
    Completer completer = new Completer();
    lnk.onload = (ev)=>completer.complete();
    return completer.future;
  }));

  Completer<List> whenLoaded = new Completer();

  _require(['external/polymer_element/utils'], (utils) {
    callMethod(utils, 'require_varargs', [
      modules,
      (res) {
        whenLoaded.complete(res);
      }
    ]);
  });

  return whenLoaded.future;
}
