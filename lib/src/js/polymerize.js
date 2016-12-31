define(['dart_sdk', 'external/polymer_element/polymer_element',
    'external/polymer_element/utils'
  ],
  function(sdk,
    dart_polymer_element, utils) {

    // PATCHING THE SDK ...
    sdk.html.Element.prototype.created = function() {
      //this[Symbol('_created')].call(this);
    }

    const _owner = Symbol('_owner');


    // TODO : BAD HACK NEED TO IMPROVE THIS
    window._addEventDetail = function(ev, detail) {
      Object.defineProperty(ev, 'detail', {
        value: sdk.js._convertToDart(detail)
      });
    };

    // Path dart Type to be DDC compliant

    function _patchTypeForDart(type) {
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
    }

    function polymerize(type, tag, config, native, templateUrl) {


      if (native) {
        return;
      }

      _patchTypeForDart(type);
      // Copy things for dart

      //sdk.dart.registerExtension(m, type);



      customElements.define(tag || type.TAG, class extends type {
        constructor() {
          super();
          if (this.__data) {
            this.__data[_owner] = this;
          }
          this['new'] && this['new'].apply(this);
        }

        static get is() {
          return tag || type.TAG;
        }

        static get config() {
          return config;
        }

      });
    }

    // Patching Polymer.Element for @JS :
    // Adding a fake "new" constructor wanted by Dart to extend this Polymer.Element
    Object.defineProperty(Polymer.Element.prototype, 'new', {
      value: function() {}
    });


    // START THE ROOT ISOLATE
    // TODO : Provide a method to start it from dart
    sdk._isolate_helper.startRootIsolate((args) => null, []);

    return {
      register: polymerize
    };
  });
