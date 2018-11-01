/** Library asset:polymer_element/lib/observe.dart */
import { is, isNot, equals } from "@dart2ts/dart/_common";
import { defaultConstructor, namedConstructor, namedFactory, defaultFactory, DartClass, Implements, With, op, Op, OperatorMethods, DartClassAnnotation, DartMethodAnnotation, DartPropertyAnnotation, Abstract, AbstractProperty, int, bool, double, Omit } from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./dart_callbacks_behavior";
import * as lib4 from "./property_observer_behavior";
import * as js_util from "@dart2ts/dart/js_util";
import * as lib6 from "./polymer_element";
import PolymerizeObservableSupport, { CallbackMode } from "./src/js/observe_support";
import { Callback, CallbackFactory, CallbackFactoryResult } from "./src/js/observe_support";
import { DartCallbacksBehavior, IPolymerElement, IPolymerElementConstructor } from './src/js/dart_callbacks_mixin';
import { PolymerElement } from "@polymer/polymer";

export var toObservable: (obj: any) => any = (obj: any) => {
    return properties.observeSupport.makeObservable(obj);
};
export namespace ObserveSupport {
    export type Constructors = 'ObserveSupport';
    export type Interface = Omit<ObserveSupport, Constructors>;
}

@DartClass
export class ObserveSupport {
    constructor() {
    }
    @defaultConstructor
    ObserveSupport() {
    }
    makeObservable<X>(obj: X, _namedArguments?: { callback?: Callback<X>, factory?: CallbackFactory<X> }): X {
        let { callback, factory } = Object.assign({
        }, _namedArguments);
        return PolymerizeObservableSupport.makeObservable(obj, callback, factory);
    }
    cancelObserver<X>(obj: X, callback: Callback<X>, factory?: CallbackFactory<X>) {
        return PolymerizeObservableSupport.cancelObserver(obj, callback, factory);
    }
    findProps(obj: any): core.DartList<string> {
        return new core.DartList.fromArray(PolymerizeObservableSupport.findProps(obj));
    }
}

export const AutonotifyBehavior = <T extends IPolymerElementConstructor>(base: T) => class extends DartCallbacksBehavior<any>(base) {
    _mainNotifier: Notifier<T>;

    readyPreHook(): void {
        this._mainNotifier = new Notifier(this, "", (prop: any) => {
            return this.onNotify(prop);
        });
    }
    onPropertiesChangedPreHook(data: any, changedProps: any, oldData: any): void {
        Object.keys(changedProps).forEach((propName: any) => {
            let oldv = oldData[propName] /*js_util.getProperty(oldData,propName)*/;
            let newv = data[propName] /*js_util.getProperty(data,propName)*/;
            if (oldv != newv) {
                this._mainNotifier.install(propName, oldv, newv);
            }
        });
    }
    onNotify(propName: string): void {
        this.notifyPath(propName);
    }

}

export namespace Notifier {
    export type Constructors = 'Notifier';
    export type Interface<T> = Omit<Notifier<T>, Constructors>;
}
@DartClass
export class Notifier<T> {
    _path: string;

    _notify: (path: string) => void;

    _obj: T;

    _callback: Callback<T>;

    _factory: CallbackFactory<T>;

    constructor(_obj: any, _path: string, _notify: (path: string) => void) {
    }
    @defaultConstructor
    Notifier(_obj: any, _path: string, _notify: (path: string) => void) {
        this._topLevel = new core.DartMap.literal([
        ]);
        this._obj = _obj;
        this._path = _path;
        this._notify = _notify;
        this._callback = <K extends keyof T>(propName: K, oldv: T[K], newv: T[K], mode?: CallbackMode) => {
            if (mode != properties.MODE_DELETED) this._notify(`${this._path}${propName}`);
        };
        this._factory = <K extends keyof T>(property: K, value: T[K]) => {
            return new Notifier<T[K]>(null, `${this._path}${property}.`, this._notify)._asResult();
        };
    }
    _asResult(): CallbackFactoryResult<T> {
        return {
            callback: this._callback, factory: this._factory
        };
    }
    uninstall<K extends keyof T>(propName: K, oldv: T[K]): void {
        if (oldv != null) {
            let pxy = properties.observeSupport.makeObservable(oldv);
            let res: CallbackFactoryResult<T[K]> = this._topLevel.remove(propName);
            if (pxy != null && res != null) {
                properties.observeSupport.cancelObserver(pxy, res.callback, res.factory);
            }
        }
    }
    private _topLevel: core.DartMap<any, CallbackFactoryResult<any>>;

    install<K extends keyof T>(propName: K, oldv: T[K], newv: T[K]): void {
        this.uninstall(propName, oldv);
        let p = newv;
        if (newv != null) {
            p = properties.observeSupport.makeObservable(newv);
            if (p != null) {
                let res: CallbackFactoryResult<T[K]> = this._factory(propName, newv);
                this._topLevel.set(propName, res);
                properties.observeSupport.makeObservable(newv, {
                    callback: res.callback, factory: res.factory
                });
                if (p != newv) {
                    let __data = this._obj['__data'];
                    if (__data != null) {
                        __data[propName] = p;
                        //js_util.setProperty(__data, propName, p);
                    }
                }
            }
        }
    }
}

export class properties {
    private static __$MODE_ADDED: string;
    static get MODE_ADDED(): string {
        if (this.__$MODE_ADDED === undefined) {
            this.__$MODE_ADDED = 'ADDED';
        }
        return this.__$MODE_ADDED;
    }
    static set MODE_ADDED(__$value: string) {
        this.__$MODE_ADDED = __$value;
    }

    private static __$MODE_DELETED: string;
    static get MODE_DELETED(): string {
        if (this.__$MODE_DELETED === undefined) {
            this.__$MODE_DELETED = 'DELETED';
        }
        return this.__$MODE_DELETED;
    }
    static set MODE_DELETED(__$value: string) {
        this.__$MODE_DELETED = __$value;
    }

    private static __$observeSupport: ObserveSupport;
    static get observeSupport(): ObserveSupport {
        if (this.__$observeSupport === undefined) {
            this.__$observeSupport = new ObserveSupport();
        }
        return this.__$observeSupport;
    }
    static set observeSupport(__$value: ObserveSupport) {
        this.__$observeSupport = __$value;
    }

}
