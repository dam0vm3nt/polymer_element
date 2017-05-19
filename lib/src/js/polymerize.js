define(['dart_sdk',
        'external/polymer_element/utils', 'external/html5/support', 'exports'
    ],
    function (sdk, utils, html5_support, exports) {


        const _owner = Symbol('_owner');

        const _summary = Symbol('_summary');

        const _propertyBag = Symbol('_propertyBag');

        function recoverMetadata(type) {
            return sdk.js._convertToDart(sdk.dart.unwrapType(type)[_summary]);
        }

        function _collectProps(obj, decl) {
            if (obj == null || obj.constructor == HTMLElement) {
                return {};
            }

            if (obj[_propertyBag]) {
                return obj[_propertyBag];
            }

            decl = Object.assign(decl || {}, obj.constructor.properties || {});

            let bag = {};
            if (obj.__proto__) {
                bag = Object.assign(bag, _collectProps(obj.__proto__,
                    decl));
            }

            for (let prop of Object.getOwnPropertyNames(obj)) {
                if (!decl[prop]) {
                    continue;
                }
                let descr = Object.getOwnPropertyDescriptor(obj, prop);
                if (descr.get || descr.set) {
                    bag[prop] = descr;
                }
            }

            obj[_propertyBag] = bag;

            return bag;
        }

        var DartPropertySupportMixin = Polymer.dedupingMixin((base) => class extends base {

            /**
             * Overrides PropertyAccessors method in order
             * to create a dataProto
             */
            _initializeProperties() {
                let bag = _collectProps(this);

                super._initializeProperties();

                let element = this;

                for (let prop in bag) {
                    let origDescr = bag[prop];
                    let descr = {
                        get: function () {
                            return origDescr.get.apply(element);
                        },
                        set: function (v) {
                            origDescr.set && origDescr.set.apply(element, [v]);
                        }
                    };
                    let v = this.__data[prop];
                    Object.defineProperty(this.__data, prop, descr);
                    this.__data[prop] = v;
                }
            }


        });


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

            type = sdk.dart.unwrapType(type);

            //_patchTypeForDart(type);
            // Copy things for dart

            //sdk.dart.registerExtension(m, type);

            // Add method to recover summary INFO
            Object.defineProperty(type, _summary, {
                value: summary
            });

            // Override props in order to call an handler
            summary && summary.props && summary.props.forEach(function (prop) {
                console.log("Override JS : " + prop);

                // TODO : replace the orig prop with one that calls the handler for
                // observability
                let descr = Object.getOwnPropertyDescriptor(type.prototype, prop);
                console.dir(descr);
            });

            // Add native mixins

            config.actions = {};
            config.reduxActions.forEach(function (name) {
                config.actions[name] = type[name]; // static methods
            });

            let myConfig = config;


            let polymerizeGenerated =
                /* Polymer.mixinBehaviors(
                 config.behaviors,*/
                class extends DartPropertySupportMixin(type) {
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
                        return myConfig;
                    }

                    static get actions() {
                        return myConfig.actions;
                    }

                    static get properties() {
                        return myConfig.properties;
                    }

                    static get observers() {
                        return myConfig.observers;
                    }

                } /*)*/;

            // Applies all v2 mixins first
            let oldBehaviors = [];
            config.behaviors.forEach(function (b) {
                if (typeof b === 'function') {
                    polymerizeGenerated = b(polymerizeGenerated);
                } else {
                    oldBehaviors.push(b);
                }
            });

            // Apply remaining mixins
            if (oldBehaviors.length > 0) {
                polymerizeGenerated = Polymer.mixinBehaviors(oldBehaviors,
                    polymerizeGenerated);
            }


            if (config.reduxInfo && config.reduxInfo.reducer) {
                let reduxMixin = require(['redux', 'polymer-redux'
                    ],
                    function (redux, polymer_redux) {
                        let def = config.reduxInfo.reducer;
                        let res = def[_redux];
                        if (!res) {
                            // need to create the store AND the behavior
                            let store = redux.createStore(def);
                            res = polymer_redux(store);
                            def[_redux] = res;
                        }
                        return res;
                    });

                polymerizeGenerated = reduxMixin(polymerizeGenerated);
            }

            customElements.define(tag || type.TAG, polymerizeGenerated);
        }

        let _redux = Symbol('_redux');


        /**
         * Emulate polymer behavior with a dart class
         */
        var defineBehavior = function (behaviorName, dartClass, config) {


            var generatedBehavior = (base) => {
                // TODO : apply behaviors to behavior

                var newClass = class extends base {
                    static get properties() {
                        return config.properties;
                    }
                };
                // Mix props
                Object.getOwnPropertyNames(dartClass.prototype).forEach((name) => {
                    if (name == 'constructor') {
                        return;
                    }
                    let descr = Object.getOwnPropertyDescriptor(dartClass.prototype,
                        name);
                    Object.defineProperty(newClass.prototype, name,
                        descr);
                });

                return newClass;

            }


            // Publish

            let ctx = window;
            let comps = behaviorName.split('.');
            let name = comps.pop();
            comps.forEach((n) => {
                if (!ctx[n]) {
                    ctx[n] = {};
                }
                ctx = ctx[n];
            });
            ctx[name] = generatedBehavior;
        }


        // Patching Polymer.Element for @JS :
        // Adding a fake "new" constructor wanted by Dart to extend this Polymer.Element
        Object.defineProperty(Polymer.Element.prototype, 'new', {
            value: function () {
            }
        });


        // START THE ROOT ISOLATE
        // TODO : Provide a method to start it from dart
        html5_support.run(() => null);
        //sdk._isolate_helper.startRootIsolate((args) => null, []);

        exports.register = polymerize;
        exports.recoverMetadata = recoverMetadata;
        exports.defineBehavior = defineBehavior;

        // Define util funcs
        window.Polymerize = {
            register: polymerize,
            recoverMetadata: recoverMetadata,
            defineBehavior: defineBehavior,

            callSuper: function (instance, name, args) {
                // Look
                var fn = instance[name];

                var sup = instance.__proto__;
                while (sup && sup[name] === fn) {
                    sup = sup.__proto__;
                }

                if (sup && sup[name]) {
                    return sup[name].apply(instance, args);
                }
            }
        }
    });
