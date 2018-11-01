
const _callbacks = Symbol('_callbacks');
const _observable = Symbol('_observable');
const _sub = Symbol('_sub');

type RemoveHandlers<T> = {
    [K in keyof T]: RemoveHandler
}

export interface CallbackFactory<T> {
    <K extends keyof T>(property: K, val: T[K]): CallbackFactoryResult<T[K]>,
    [_sub]?: RemoveHandlers<T>
}

export interface CallbackFactoryResult<T> {
    callback?: Callback<T>,
    factory?: CallbackFactory<T>,
}

export type CallbackMode = "ADDED" | "DELETED" | undefined;

export interface Callback<T> {
    <K extends keyof T>(property?: K, oldVal?: T[K], value?: T[K], mode?: CallbackMode): any,
}

type RemoveHandler = () => void;

export class Callbacks<T extends Object> implements ProxyHandler<T> {
    cbs: Callback<T>[];
    callbackFactories: CallbackFactory<T>[];
    oldLen: number;

    constructor(obj) {
        this.cbs = [];
        this.callbackFactories = [];
        this.oldLen = obj.length;
    }

    set<K extends keyof T>(tgt: T, property: K, value: T[K]) {
        if (typeof property === 'symbol') {
            tgt[property as K] = value;

            // If dart list length changed, treat it as it was length
            /*if (property === sdk.dartx.length) {
                property = 'length';
            } else {
                return true;
            }*/
        }
        let oldVal: any = tgt[property];
        if (property === 'length') {
            oldVal = this.oldLen;
        }
        this.callbackFactories.forEach((cbf: CallbackFactory<T>) => {
            if (cbf[_sub] && cbf[_sub][property]) {
                cbf[_sub][property]();
                delete cbf[_sub][property];
            }
        });

        let mode = undefined;
        if (!tgt.hasOwnProperty(property) && (!isNaN(+property.toString()))) { // ADDED OR DELETED ONLY FOR NUM PROPS
            mode = 'ADDED';
        }

        // Update len
        if (property === 'length')
            this.oldLen = value as any;
        tgt[property] = value;
        // NOTE : array length oldVal will already be equals to newVal ...
        if (property !== _callbacks && property !== _observable && (!oldVal || oldVal[_observable] !== value) && (oldVal !== value)) {
            this.cbs.forEach(function (cb) {
                cb(property, oldVal, value, mode);
            });
        }

        // Note if prop is len and type is array : validate any props
        if (property === 'length' && Array.isArray(tgt) && value < oldVal) {
            let newLen: number = value as any;
            this.callbackFactories.forEach((cbf) => {
                for (let prop = newLen; prop < oldVal; prop++) {
                    if (cbf[_sub] && cbf[_sub][prop.toString()]) {
                        cbf[_sub][prop]();
                        delete cbf[_sub][prop];
                    }
                }
            });
        }
        return true;
    }

    deleteProperty<K extends keyof T>(tgt: T, property: K) {
        if (typeof property === 'symbol') {
            delete tgt[property];
            return true;
        }
        let oldVal = tgt[property];
        this.callbackFactories.forEach((cbf) => {
            if (cbf[_sub] && cbf[_sub][property]) {
                cbf[_sub][property]();
                delete cbf[_sub][property];
            }
        });
        delete tgt[property];
        // NOTE : ADDED OR DELETED ONLY FOR NUM PROPS FOR NOW
        if (property !== _callbacks && property !== _observable && !isNaN(+property.toString())) {
            this.cbs.forEach(function (cb) {
                cb(property, oldVal, null, "DELETED");
            });
        }
        return true;
    }

    get<K extends keyof T>(tgt: T, property: K) {
        if (typeof property === 'symbol') {
            return tgt[property];
        }
        let val = tgt[property];

        let descr;
        let _t = tgt;
        while (!descr && _t) {
            descr = Object.getOwnPropertyDescriptor(_t, property);
            _t = Object.getPrototypeOf(_t);
        }

        if (val && typeof val === 'object' && typeof property === 'string' && this.callbackFactories.length > 0
            //&& property !== _callbacks
            //&& property !== _observable
            && descr && (!descr.get && descr.writable || descr.set) //only readable and writable props
            && property !== 'new'
            && property !== 'constructor'
            && property !== '__proto__') {
            this.callbackFactories.forEach((callbackFactory) => {
                // Skip those factories already registered
                if (callbackFactory[_sub] && callbackFactory[_sub][property]) {
                    return;
                }

                // Create a new callback for that property
                let cb = callbackFactory(property, val);
                callbackFactory[_sub] = callbackFactory[_sub] || ({} as RemoveHandlers<T>);
                // Register the cancel handler for the callback
                callbackFactory[_sub][property] = () => {
                    cancelObserver(val[_observable], cb.callback, cb.factory);
                };

                // Add the callback for the value (if val is already a proxy it will be returned)
                let pxy = makeObservable(val, cb.callback, cb.factory);
                if (pxy !== val) {
                    tgt[property as K] = pxy;
                    val = pxy;
                }
            });
        }
        return val;
    }


}

let _findProps = function (obj) {
    if (!obj || obj === Object.prototype || obj === HTMLElement.prototype || typeof obj !== 'object') {
        return {};
    }

    let bag = {};
    Object.getOwnPropertyNames(obj).forEach((x) => {
        let descr = Object.getOwnPropertyDescriptor(obj, x);
        if (descr.set) {
            bag[x] = 1;
        }
    });

    return Object.assign(_findProps(obj.__proto__), bag);
};

interface Proxied<T> {
    [_callbacks]?: Callbacks<T>,
    [_observable]?: any
}

let makeObservable = function <T>(dartObj: T, callback: Callback<T>, callbackFactory: CallbackFactory<T>): T {
    //let obj = sdk.js._convertToDart(dartObj);
    if (typeof dartObj !== 'object') {
        return null;
    }

    let obj: Proxied<T> & T = dartObj;

    if (!obj[_observable]) {

        let cbs = new Callbacks<T>(obj);
        let pxy = new Proxy(obj, cbs);

        obj[_callbacks] = cbs;
        obj[_observable] = pxy;
    }

    if (callback) {
        obj[_callbacks].cbs.push(callback);
    }

    if (callbackFactory) {
        obj[_callbacks].callbackFactories.push(callbackFactory);
    }

    //return sdk.js._convertToJS(obj);
    return obj[_observable];
};

let cancelObserver = function <T>(arg: T, callback, callbackFactory) {
    let dartObj: Proxied<T> & T = arg;
    if (dartObj && dartObj[_callbacks]) {
        let p = dartObj[_callbacks].cbs.indexOf(callback);
        if (p >= 0) {
            dartObj[_callbacks].cbs.splice(p, 1);
        }

        if (callbackFactory) {
            p = dartObj[_callbacks].callbackFactories.indexOf(callbackFactory);
            if (p >= 0) {
                dartObj[_callbacks].callbackFactories.splice(p, 1);
            }

            for (let prop in callbackFactory[_sub]) {
                callbackFactory[_sub][prop]();
            }
            callbackFactory[_sub] = {};
        }
    }
};

let PolymerizeObservableSupport = {
    makeObservable: makeObservable,

    cancelObserver: cancelObserver,

    findProps: function (obj) {
        return Object.keys(_findProps(obj));
    }
};

export default PolymerizeObservableSupport;