define(['dart_sdk'], function(sdk) {
  return {

    // Path dart Type to be DDC compliant

    patchTypeForDart: function(type) {
      Object.defineProperty(type, '_check', {
        value: function(x) {
          return x;
        }
      });
      Object.defineProperty(type, 'as', {
        value: function(x) {
          return x;
        }
      });
    },

    deinteropList: function(args) {
      args = sdk.js._convertToDart(args);
      let newArgs = [];
      for (let x of args) {
        newArgs.push(sdk.js._convertToDart(x));
      }

      return newArgs;
    },

    require_varargs: function(modules, callback) {
      require(modules, function() {
        callback(Array.prototype.slice.call(arguments));
      });
    }
  }
});
