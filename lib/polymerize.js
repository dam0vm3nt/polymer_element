define(['dart_sdk', 'polymer_element/polymer_element'], function(sdk,
  dart_polymer_element) {

  // PATCHING THE SDK ...
  sdk.html.Element.prototype.created = function() {
    //this[Symbol('_created')].call(this);
  }

  const _owner = Symbol('_owner');
  const _cache = Symbol('_cache');

  function importDart(jsClass, dartClass) {
    let overridden = {};
    let res = class extends jsClass {
      constructor() {
        super();
        // TODO(dam0vm3nt)
        // __data is created in "super" using "__dataProto".
        // "_owner" should be set before, but there isn't a simple
        // way to do that without patching "polymer" itself.
        // This is a problem only for setter and getter that are not
        // correctly initialized.
        this.__data[_owner] = this;
        this['new'].apply(this);
      }

      __callSuper(name, args) {
        return overridden[name] && overridden[name].apply(this, args);
      }
    };

    res.prototype.__dataProto = {};

    // Copy dart properties and method to this element prototype
    // Gettter and setter need to be implemented in the `__dataProto`
    // because they get ovverridden by polymer.
    for (let p of Object.getOwnPropertyNames(dartClass.prototype).concat(
        Object.getOwnPropertySymbols(dartClass.prototype))) {

      if (p != 'constructor') { // Fortunately dart constructor will only call super and ['new'], we can regenerate it
        let descr = Object.getOwnPropertyDescriptor(
          dartClass.prototype, p);

        // Getter and setter should be executed on the element not the model
        if (descr.get || descr.set) {
          Object.defineProperty(res.prototype.__dataProto, p, {
            get: function() {
              if (this[_owner]) {
                return descr.get.call(this[_owner]);
              } else {
                return this[_cache] && this[_cache][p];
              }
            },
            set: function(v) {
              if (this[_owner]) {
                descr.set.call(this[_owner], v);
              } else {
                this[_cache] = this[_cache] || {};
                this[_cache][p] = v;
              }
            }

          });

        }

        if (res.prototype[p]) {
          overridden[p] = res.prototype[p];
        }
        Object.defineProperty(res.prototype, p, descr);
      }
    }

    return res;
  }

  //
  // There should be a better way to do this.
  function typeOf(sig) {
    if (sig == sdk.core.int) {
      return Number;
    }

    if (sig == sdk.core.String) {
      return String;
    }

    if (sig == sdk.core.List) {
      return Array;
    }


    return Object;
  }

  // Maps "Polymer.Element" to dark class. The dart class MUST extends HTMLElement.
  sdk.dart.registerExtension(Polymer.Element, dart_polymer_element.polymer_element
    .PolymerElement);

  function polymerize(type, tag, config) {
    let m = importDart(Polymer.Element,
      type);

    /** Actually this will be overridden by the build **/
    let sig = sdk.dart.getFieldSig(type);

    config = config || {};
    let cfg = type.CONFIG;
    config.observers = config.observers || (cfg && cfg.observers);
    config.properties = config.properties || (cfg && cfg.properties) || {};

    // Adding descriptors for props if not already there
    for (let pn in sig) {
      if (!(pn in config.properties)) {
        config.properties[pn] = {
          defined: true,
          type: typeOf(sig[pn])
        }
      }
    }

    // Adding is and config
    Object.defineProperty(m, 'is', {
      get: function() {
        return tag || type.TAG;
      }
    });

    Object.defineProperty(m, 'config', {
      get: function() {
        return config;
      }
    });

    // Copy things for dart
    sdk.dart.registerExtension(m, type);
    customElements.define(m.is, m);


    return m;

  }

  // START THE ROOT ISOLATE
  // TODO : Provide a method to start it from dart
  sdk._isolate_helper.startRootIsolate((args) => null, []);

  return polymerize;
});
