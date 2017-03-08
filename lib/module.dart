import 'dart:async';
import 'dart:js';

class ModuleComponent {
  Module _module;
  String _path;

  ModuleComponent._(this._module, this._path);

  executeMethod(String name, List args) {
    return _module.executeMethod(_path, name, args);
  }

  getProperty(String name) {
    return _module.getProperty(_path, name);
  }
}

class Module {
  JsObject _jsObject;
  JsObject _helper;
  Map<String, ModuleComponent> _components = new Map();

  Module._(this._jsObject, this._helper);

  static Future<Module> loadPackage(String packageName) {
    Completer<Module> whenLoaded = new Completer();

    context.callMethod('require', [
      new JsArray.from([
        '${packageName}/${packageName}',
        'polymer_element/module_helper'
      ]),
      (JsObject pkg, JsObject helper) {
        whenLoaded.complete(new Module._(pkg, helper));
      }
    ]);

    return whenLoaded.future;
  }

  ModuleComponent operator [](String path) {
    return _components.putIfAbsent(
        path, () => new ModuleComponent._(this, path));
  }

  executeMethod(String path, String name, List args) {
    return _helper.callMethod('execute', [_jsObject, path, name, args]);
  }

  getProperty(String path, String name) {
    return _helper.callMethod('getProperty', [_jsObject, path, name]);
  }
}
