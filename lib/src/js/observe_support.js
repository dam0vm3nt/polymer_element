define('polymer_element/observe_support', ['dart_sdk'], function (sdk) {
    let _callbacks = Symbol('_callbacks');
    let _observable = Symbol('_observable');

    class Callbacks {

        constructor() {
            this.cbs = [];
        }

        set(tgt, property, value) {
            let oldVal = tgt[property];
            tgt[property] = value;
            if (property !== _callbacks && property !== _observable && (  !oldVal || oldVal[_observable] !== value) && oldVal !== value) {
                this.cbs.forEach(function (cb) {
                    cb(property, oldVal, value);
                });
            }
            return true;
        }
    }

    let _findProps = function (obj) {
        if (!obj || obj === Object.prototype || typeof obj !== 'object') {
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


    return {
        makeObservable: function (dartObj, callback) {
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

            obj[_callbacks].cbs.push(callback);

            //return sdk.js._convertToJS(obj);
            return obj[_observable];
        },

        cancelObserver: function (dartObj, callback) {
            if (dartObj[_callbacks]) {
                let p = dartObj[_callbacks].cbs.indexOf(callback);
                if (p>=0) {
                    dartObj[_callbacks].cbs.splice(p, 1);
                }
            }
        },

        findProps: function (obj) {
            return Object.keys(_findProps(obj));
        }
    };
});


