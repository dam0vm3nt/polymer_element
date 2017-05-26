define('polymer_element/observe_support', ['dart_sdk'], function (sdk) {
    let _callbacks = Symbol('_callbacks');


    class Callbacks {

        constructor(cbs) {
            this.cbs = cbs;
        }

        set(tgt, property, value) {
            let oldVal = tgt[property];
            tgt[property] = value;
            if (property != _callbacks) {
                this.cbs.forEach(function (cb) {
                    cb(property, oldVal, value);
                });
            }
            return true;
        }
    }


    return {
        makeObservable: function (dartObj, callback) {
            //let obj = sdk.js._convertToDart(dartObj);
            if (typeof dartObj !== 'object') {
                return dartObj;
            }

            let obj = dartObj;
            if (!obj[_callbacks]) {

                let cbs = [];
                obj = new Proxy(obj, new Callbacks(cbs));

                obj[_callbacks] = cbs;
            }

            obj[_callbacks].push(callback);

            //return sdk.js._convertToJS(obj);
            return obj;
        },

        cancelObserver: function(dartObj,callback) {
            if (dartObj[_callbacks]) {
                let p = dartObj[_callbacks].indexOf(callback);
                dartObj[_callbacks].splice(p,1);
            }
        }
    };
});


