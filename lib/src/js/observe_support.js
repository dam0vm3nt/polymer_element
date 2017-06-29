define(['dart_sdk'], function (sdk) {
    let _callbacks = Symbol('_callbacks');
    let _observable = Symbol('_observable');
    let _sub = Symbol('_sub');

    class Callbacks {
        constructor(obj) {
            this.cbs = [];
            this.callbackFactories = [];
            this.oldLen = obj.length;
        }

        set(tgt, property, value) {
            if (typeof property === 'symbol') {
                tgt[property] = value;

                // If dart list length changed, treat it as it was length
                if (property === sdk.dartx.length) {
                    property = 'length';
                } else {
                    return true;
                }
            }
            let oldVal = tgt[property];
            if (property === 'length') {
                oldVal = this.oldLen;
            }
            this.callbackFactories.forEach((cbf) => {
                if (cbf[_sub] && cbf[_sub][property]) {
                    cbf[_sub][property]();
                    delete cbf[_sub][property];
                }
            });

            let mode = undefined;
            if (!tgt.hasOwnProperty(property) && (!isNaN(property.toString()))) { // ADDED OR DELETED ONLY FOR NUM PROPS
                mode = 'ADDED';
            }

            // Update len
            if (property === 'length')
                this.oldLen = value;
            tgt[property] = value;
            // NOTE : array length oldVal will already be equals to newVal ...
            if (property !== _callbacks && property !== _observable && (  !oldVal || oldVal[_observable] !== value) && (oldVal !== value )) {
                this.cbs.forEach(function (cb) {
                    cb(property, oldVal, value, mode);
                });
            }

            // Note if prop is len and type is array : validate any props
            if (property === 'length' && Array.isArray(tgt) && value < oldVal) {
                this.callbackFactories.forEach((cbf) => {
                    for (let prop = value; prop < oldVal; prop++) {
                        if (cbf[_sub] && cbf[_sub][prop.toString()]) {
                            cbf[_sub][prop]();
                            delete cbf[_sub][prop];
                        }
                    }
                });
            }
            return true;
        }

        deleteProperty(tgt, property) {
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
            if (property !== _callbacks && property !== _observable && !isNaN(property.toString())) {
                this.cbs.forEach(function (cb) {
                    cb(property, oldVal, null, "DELETED");
                });
            }
            return true;
        }

        get(tgt, property) {
            if (typeof property === 'symbol') {
                return tgt[property];
            }
            let val = tgt[property];

            let descr;
            let _t = tgt;
            while (!descr && _t) {
                descr = Object.getOwnPropertyDescriptor(_t, property);
                _t = _t.__proto__;
            }

            if (val && typeof val === 'object' && typeof property === 'string' && this.callbackFactories.length > 0
                && property !== _callbacks
                && property !== _observable
                && descr && (!descr.get && descr.writable || descr.set) //only readable and writable props
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

            let cbs = new Callbacks(obj);
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


