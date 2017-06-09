define(['dart_sdk'], function (sdk) {
    let _callbacks = Symbol('_callbacks');
    let _observable = Symbol('_observable');
    let _sub = Symbol('_sub');

    class Callbacks {


        constructor() {
            this.cbs = [];
            this.callbackFactories = [];
        }

        set(tgt, property, value) {
            let oldVal = tgt[property];
            this.callbackFactories.forEach((cbf) => {
                if (cbf[_sub] && cbf[_sub][property]) {
                    cbf[_sub][property]();
                    delete cbf[_sub][property];
                }
            });
            tgt[property] = value;
            // NOTE : array length oldVal will already be equals to newVal ...
            if (property !== _callbacks && property !== _observable && (  !oldVal || oldVal[_observable] !== value) && (oldVal !== value || property === 'length')) {
                this.cbs.forEach(function (cb) {
                    cb(property, oldVal, value);
                });
            }
            return true;
        }

        get(tgt, property) {
            let val = tgt[property];
            if (val && typeof val === 'object' && typeof property === 'string' && this.callbackFactories.length > 0
                && property !== _callbacks
                && property !== _observable
                && property !== 'new'
                && property !== 'constructor'
                && property !== '__proto__') {
                this.callbackFactories.forEach((callbackFactory) => {
                    if (callbackFactory[_sub] && callbackFactory[_sub][property]) {
                        return;
                    }

                    let cb = callbackFactory(property, val);
                    callbackFactory[_sub] = callbackFactory[_sub] || {};
                    callbackFactory[_sub][property] = () => {
                        cancelObserver(val[_observable], cb.callback, cb.factory);
                    };

                    let pxy = makeObservable(val, cb.callback, cb.factory);
                    if (pxy !== val) {
                        tgt[property] = pxy;
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

    var makeObservable = function (dartObj, callback, callbackFactory) {
        //let obj = sdk.js._convertToDart(dartObj);
        if (typeof dartObj !== 'object') {
            return null;
        }

        let obj = dartObj;

        if (!obj[_observable]) {

            let cbs = new Callbacks();
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

    var cancelObserver = function (dartObj, callback, callbackFactory) {
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

    window.PolymerizeObservableSupport = {
        makeObservable: makeObservable,

        cancelObserver: cancelObserver,

        findProps: function (obj) {
            return Object.keys(_findProps(obj));
        }
    };

    return window.PolymerizeObservableSupport;
});


