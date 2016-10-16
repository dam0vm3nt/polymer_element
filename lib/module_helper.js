define(['dart_sdk', 'polymer_element/utils'], function(sdk, utils) {
  return {
    execute: function(module, path, methodName, args) {
      return sdk.js._convertToJS(module[path][methodName](utils.deinteropList(
        args)));
    },

    getProperty: function(module, path, propertyName) {
      return sdk.js._convertToJS(module[path][propertyName]);
    }
  };
});
