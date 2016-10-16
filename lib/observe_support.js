define(['dart_sdk'], function(sdk) {
  let _callbacks = Symbol('_callbacks');

  return {
    makeObservable: function(dartObj, callback) {
      let obj = sdk.js._convertToDart(dartObj);
      if (!obj[_callbacks]) {
        obj = new Proxy(obj, {
          set: function(tgt, property, value) {
            let oldVal = tgt[property];
            tgt[property] = value;
            if (property != _callbacks) {
              obj[_callbacks].forEach(function(cb) {
                cb(property, oldVal, value);
              });
            }
            return true;
          }
        });

        obj[_callbacks] = [];
      }

      obj[_callbacks].push(callback);

      return sdk.js._convertToJS(obj);
    }
  };
});
