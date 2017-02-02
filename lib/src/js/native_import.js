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
      var c = classForTag(tagName);
      if (c) {
        target[actualClass] = classForTag(tagName);
      } else {
        target[actualClass] = Object;
      }
    }
  }

  return {
    importNative: importNative
  };

});
