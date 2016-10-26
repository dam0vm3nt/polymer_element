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
    return document.createElement(tag).__proto__.constructor;
  }


  function importNative(tagName, ...className) {
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
      target[actualClass] = addDDCMethods(classForTag(tagName));
    }
  }

  return {
    importNative: importNative
  };

});
