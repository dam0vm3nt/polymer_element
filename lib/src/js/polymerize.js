define(['dart_sdk', 'external/polymer_element/polymer_element',
    'external/polymer_element/utils', 'external/html5/support'
  ],
  function(sdk,
    dart_polymer_element, utils, html5_support) {


    const _owner = Symbol('_owner');

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

    const _summary = Symbol('_summary');

    function recoverMetadata(type) {
      return sdk.js._convertToDart(sdk.dart.unwrapType(type)[_summary]);
    }

    sdk.dart.registerExtension(Polymer.PolymerElement, Polymer.PolymerElement);

    function polymerize(type, tag, config, summary, native, templateUrl) {


      /**
       * For natives (JS) component we just have to
       * register the extension in order to allow Dart to cast
       * the JS object back to a Dart one.
       * NO MORE NEEDED FOR HTML5LIB
       */
      if (native) {
        // Probably only need to patch for check and as ...
        return;
      }

      //_patchTypeForDart(type);
      // Copy things for dart

      //sdk.dart.registerExtension(m, type);

      // Add method to recover summary INFO
      Object.defineProperty(type, _summary, {
        value: summary
      });

      // Override props in order to call an handler
      summary && summary.props && summary.props.forEach(function(prop) {
        console.log("Override JS : " + prop);

        // TODO : replace the orig prop with one that calls the handler for
        // observability
        let descr = Object.getOwnPropertyDescriptor(type.prototype, prop);
        console.dir(descr);
      });

      // Add native mixins



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
    html5_support.run(() => null);
    //sdk._isolate_helper.startRootIsolate((args) => null, []);

    return {
      register: polymerize,
      recoverMetadata: recoverMetadata
    };
  });
