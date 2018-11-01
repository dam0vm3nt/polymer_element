var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Module_1;
import { namedConstructor, DartClass, OperatorMethods } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
let ModuleComponent = class ModuleComponent {
    _(_module, _path) {
        this._module = _module;
        this._path = _path;
    }
    executeMethod(name, args) {
        return this._module.executeMethod(this._path, name, args);
    }
    getProperty(name) {
        return this._module.getProperty(this._path, name);
    }
};
__decorate([
    namedConstructor
], ModuleComponent.prototype, "_", null);
ModuleComponent = __decorate([
    DartClass
], ModuleComponent);
export { ModuleComponent };
let Module = Module_1 = class Module {
    _(_jsObject, _helper) {
        this._components = new core.DartMap();
        this._jsObject = _jsObject;
        this._helper = _helper;
    }
    static loadPackage(packageName) {
        return new async.Future.fromPromise((() => __awaiter(this, void 0, void 0, function* () { return new Module_1._(yield import(packageName), null); }))());
        /*
                let whenLoaded : async.DartCompleter<Module> = new async.DartCompleter<any>();
                js.properties.context.callMethod('require',new core.DartList.literal(new js.JsArray.from(new core.DartList.literal(`${packageName}/${packageName}`,'polymer_element/module_helper')),(pkg : js.JsObject,helper : js.JsObject) =>  {
                    whenLoaded.complete(new Module._(pkg,helper));
                }));
                return whenLoaded.future;*/
    }
    [OperatorMethods.INDEX](path) {
        return this._components.putIfAbsent(path, () => {
            return new ModuleComponent._(this, path);
        });
    }
    executeMethod(path, name, args) {
        return this._jsObject[path][name].apply(this._jsObject[path], args);
        //return this._helper.callMethod('execute',new core.DartList.literal(this._jsObject,path,name,args));
    }
    getProperty(path, name) {
        return this._jsObject[path][name];
        //return this._helper.callMethod('getProperty',new core.DartList.literal(this._jsObject,path,name));
    }
};
__decorate([
    namedConstructor
], Module.prototype, "_", null);
Module = Module_1 = __decorate([
    DartClass
], Module);
export { Module };
export class properties {
}
//# sourceMappingURL=module.js.map