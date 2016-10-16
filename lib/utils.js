define(['dart_sdk', 'require'], function(sdk, require) {
  return {
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
