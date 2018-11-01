import { Omit } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
import { Callback, CallbackFactory, CallbackFactoryResult } from "./src/js/observe_support";
import { IPolymerElementConstructor } from './src/js/dart_callbacks_mixin';
export declare var toObservable: (obj: any) => any;
export declare namespace ObserveSupport {
    type Constructors = 'ObserveSupport';
    type Interface = Omit<ObserveSupport, Constructors>;
}
export declare class ObserveSupport {
    constructor();
    ObserveSupport(): void;
    makeObservable<X>(obj: X, _namedArguments?: {
        callback?: Callback<X>;
        factory?: CallbackFactory<X>;
    }): X;
    cancelObserver<X>(obj: X, callback: Callback<X>, factory?: CallbackFactory<X>): void;
    findProps(obj: any): core.DartList<string>;
}
export declare const AutonotifyBehavior: <T extends IPolymerElementConstructor>(base: T) => {
    new (): {
        [x: string]: any;
        _mainNotifier: Notifier<T>;
        readyPreHook(): void;
        onPropertiesChangedPreHook(data: any, changedProps: any, oldData: any): void;
        onNotify(propName: string): void;
    };
    [x: string]: any;
};
export declare namespace Notifier {
    type Constructors = 'Notifier';
    type Interface<T> = Omit<Notifier<T>, Constructors>;
}
export declare class Notifier<T> {
    _path: string;
    _notify: (path: string) => void;
    _obj: T;
    _callback: Callback<T>;
    _factory: CallbackFactory<T>;
    constructor(_obj: any, _path: string, _notify: (path: string) => void);
    Notifier(_obj: any, _path: string, _notify: (path: string) => void): void;
    _asResult(): CallbackFactoryResult<T>;
    uninstall<K extends keyof T>(propName: K, oldv: T[K]): void;
    private _topLevel;
    install<K extends keyof T>(propName: K, oldv: T[K], newv: T[K]): void;
}
export declare class properties {
    private static __$MODE_ADDED;
    static MODE_ADDED: string;
    private static __$MODE_DELETED;
    static MODE_DELETED: string;
    private static __$observeSupport;
    static observeSupport: ObserveSupport;
}
