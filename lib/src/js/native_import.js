define([], function() {

  function addDDCMethods(base) {
    return class extends base {
      static _check(something) {
        return something;
      }

      static as(that) {
        return that;
      }


    };
  }

  function classForTag(tag) {
    return customElements.get(tag);
  }


  function importNative(tagName, className) {

    let target = window;
    let actualClass = className.pop();
    for (let p of className) {
      let newTarget = target[p];
      if (!newTarget) {
        newTarget = {};
        target[p] = newTarget;
      }
      target = newTarget;
    }

    if (!target[actualClass]) {

      Object.defineProperty(target, actualClass, {
        get: function() {
          return classForTag(tagName) || Object
        }
      });

    }
  }

  return {
    importNative: importNative
  };

});
