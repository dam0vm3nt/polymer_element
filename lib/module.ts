/** Library asset:polymer_element/lib/module.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double,Omit} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
//import * as js from "@dart2ts/dart/js";

export namespace ModuleComponent {
    export type Constructors = '_';
    export type Interface = Omit<ModuleComponent, Constructors>;
}
@DartClass
export class ModuleComponent {
    _module : Module;

    _path : string;

    @namedConstructor
    _(_module : Module,_path : string) {
        this._module = _module;
        this._path = _path;
    }
    static _ : new(_module : Module,_path : string) => ModuleComponent;

    executeMethod(name : string,args : core.DartList<any>) {
        return this._module.executeMethod(this._path,name,args);
    }
    getProperty(name : string) {
        return this._module.getProperty(this._path,name);
    }
}

export namespace Module {
    export type Constructors = '_';
    export type Interface = Omit<Module, Constructors>;
}
@DartClass
export class Module {
    _jsObject : any;

    _helper : any;

    _components : core.DartMap<string,ModuleComponent>;

    @namedConstructor
    _(_jsObject : any,_helper : any) {
        this._components = new core.DartMap<any,any>();
        this._jsObject = _jsObject;
        this._helper = _helper;
    }
    static _ : new(_jsObject : any,_helper : any) => Module;

    static  loadPackage(packageName : string) : async.Future<Module> {

        return new async.Future.fromPromise((async () => new Module._(await import(packageName),null))());
/*
        let whenLoaded : async.DartCompleter<Module> = new async.DartCompleter<any>();
        js.properties.context.callMethod('require',new core.DartList.literal(new js.JsArray.from(new core.DartList.literal(`${packageName}/${packageName}`,'polymer_element/module_helper')),(pkg : js.JsObject,helper : js.JsObject) =>  {
            whenLoaded.complete(new Module._(pkg,helper));
        }));
        return whenLoaded.future;*/
    }
    [OperatorMethods.INDEX](path : string) : ModuleComponent {
        return this._components.putIfAbsent(path,() =>  {
            return new ModuleComponent._(this,path);
        });
    }
    executeMethod(path : string,name : string,args : core.DartList<any>) {
        return this._jsObject[path][name].apply(this._jsObject[path],args);
        //return this._helper.callMethod('execute',new core.DartList.literal(this._jsObject,path,name,args));
    }
    getProperty(path : string,name : string) {
        return this._jsObject[path][name];
        //return this._helper.callMethod('getProperty',new core.DartList.literal(this._jsObject,path,name));
    }
}

export class properties {
}
