import { OperatorMethods, Omit } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
export declare namespace ModuleComponent {
    type Constructors = '_';
    type Interface = Omit<ModuleComponent, Constructors>;
}
export declare class ModuleComponent {
    _module: Module;
    _path: string;
    _(_module: Module, _path: string): void;
    static _: new (_module: Module, _path: string) => ModuleComponent;
    executeMethod(name: string, args: core.DartList<any>): any;
    getProperty(name: string): any;
}
export declare namespace Module {
    type Constructors = '_';
    type Interface = Omit<Module, Constructors>;
}
export declare class Module {
    _jsObject: any;
    _helper: any;
    _components: core.DartMap<string, ModuleComponent>;
    _(_jsObject: any, _helper: any): void;
    static _: new (_jsObject: any, _helper: any) => Module;
    static loadPackage(packageName: string): async.Future<Module>;
    [OperatorMethods.INDEX](path: string): ModuleComponent;
    executeMethod(path: string, name: string, args: core.DartList<any>): any;
    getProperty(path: string, name: string): any;
}
export declare class properties {
}
