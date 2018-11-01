var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Notifier_1;
import { defaultConstructor, DartClass } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
import PolymerizeObservableSupport from "./src/js/observe_support";
import { DartCallbacksBehavior } from './src/js/dart_callbacks_mixin';
export var toObservable = (obj) => {
    return properties.observeSupport.makeObservable(obj);
};
let ObserveSupport = class ObserveSupport {
    constructor() {
    }
    ObserveSupport() {
    }
    makeObservable(obj, _namedArguments) {
        let { callback, factory } = Object.assign({}, _namedArguments);
        return PolymerizeObservableSupport.makeObservable(obj, callback, factory);
    }
    cancelObserver(obj, callback, factory) {
        return PolymerizeObservableSupport.cancelObserver(obj, callback, factory);
    }
    findProps(obj) {
        return new core.DartList.fromArray(PolymerizeObservableSupport.findProps(obj));
    }
};
__decorate([
    defaultConstructor
], ObserveSupport.prototype, "ObserveSupport", null);
ObserveSupport = __decorate([
    DartClass
], ObserveSupport);
export { ObserveSupport };
export const AutonotifyBehavior = (base) => class extends DartCallbacksBehavior(base) {
    readyPreHook() {
        this._mainNotifier = new Notifier(this, "", (prop) => {
            return this.onNotify(prop);
        });
    }
    onPropertiesChangedPreHook(data, changedProps, oldData) {
        Object.keys(changedProps).forEach((propName) => {
            let oldv = oldData[propName] /*js_util.getProperty(oldData,propName)*/;
            let newv = data[propName] /*js_util.getProperty(data,propName)*/;
            if (oldv != newv) {
                this._mainNotifier.install(propName, oldv, newv);
            }
        });
    }
    onNotify(propName) {
        this.notifyPath(propName);
    }
};
let Notifier = Notifier_1 = class Notifier {
    constructor(_obj, _path, _notify) {
    }
    Notifier(_obj, _path, _notify) {
        this._topLevel = new core.DartMap.literal([]);
        this._obj = _obj;
        this._path = _path;
        this._notify = _notify;
        this._callback = (propName, oldv, newv, mode) => {
            if (mode != properties.MODE_DELETED)
                this._notify(`${this._path}${propName}`);
        };
        this._factory = (property, value) => {
            return new Notifier_1(null, `${this._path}${property}.`, this._notify)._asResult();
        };
    }
    _asResult() {
        return {
            callback: this._callback, factory: this._factory
        };
    }
    uninstall(propName, oldv) {
        if (oldv != null) {
            let pxy = properties.observeSupport.makeObservable(oldv);
            let res = this._topLevel.remove(propName);
            if (pxy != null && res != null) {
                properties.observeSupport.cancelObserver(pxy, res.callback, res.factory);
            }
        }
    }
    install(propName, oldv, newv) {
        this.uninstall(propName, oldv);
        let p = newv;
        if (newv != null) {
            p = properties.observeSupport.makeObservable(newv);
            if (p != null) {
                let res = this._factory(propName, newv);
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
};
__decorate([
    defaultConstructor
], Notifier.prototype, "Notifier", null);
Notifier = Notifier_1 = __decorate([
    DartClass
], Notifier);
export { Notifier };
export class properties {
    static get MODE_ADDED() {
        if (this.__$MODE_ADDED === undefined) {
            this.__$MODE_ADDED = 'ADDED';
        }
        return this.__$MODE_ADDED;
    }
    static set MODE_ADDED(__$value) {
        this.__$MODE_ADDED = __$value;
    }
    static get MODE_DELETED() {
        if (this.__$MODE_DELETED === undefined) {
            this.__$MODE_DELETED = 'DELETED';
        }
        return this.__$MODE_DELETED;
    }
    static set MODE_DELETED(__$value) {
        this.__$MODE_DELETED = __$value;
    }
    static get observeSupport() {
        if (this.__$observeSupport === undefined) {
            this.__$observeSupport = new ObserveSupport();
        }
        return this.__$observeSupport;
    }
    static set observeSupport(__$value) {
        this.__$observeSupport = __$value;
    }
}
//# sourceMappingURL=observe.js.map