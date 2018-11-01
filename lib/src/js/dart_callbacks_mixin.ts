import { PolymerElement } from "@polymer/polymer";

interface HTMLElementCallbacks {
    ready();
    connectedCallback();
    disconnectedCallback();
    attributeChangedCallback(name, oldval, newval);
}

export type IPolymerElement = typeof PolymerElement & HTMLElementCallbacks;
export type IPolymerElementConstructor = new(...args: any[]) => IPolymerElement;

export const DartCallbacksBehavior = <T extends IPolymerElementConstructor>(base: T) => class extends base {
    readyPreHook?: () => any;
    readyPostHook?: () => any;
    connectedCallbackPreHook?: () => any;
    connectedCallbackPostHook?: () => any;
    disconnectedCallbackPreHook?: () => any;
    disconnectedCallbackPostHook?: () => any;
    attributeChangedCallbackPreHook?: (name: string, old: any, value: any) => any;
    attributeChangedCallbackPostHook?: (name: string, old: any, value: any) => any;

    ready() {
        if (this.readyPreHook) {
            this.readyPreHook();
        }
        super.ready();
        if (this.readyPostHook) {
            this.readyPostHook();
        }
    }

    connectedCallback() {
        if (this.connectedCallbackPreHook) {
            this.connectedCallbackPreHook();
        }
        super.connectedCallback();
        if (this.connectedCallbackPostHook) {
            this.connectedCallbackPostHook();
        }
    }

    disconnectedCallback() {
        if (this.disconnectedCallbackPreHook) {
            this.disconnectedCallbackPreHook();
        }
        super.disconnectedCallback();
        if (this.disconnectedCallbackPostHook) {
            this.disconnectedCallbackPostHook();
        }
    }

    attributeChangedCallback(name: string, old: any, value: any) {
        if (this.attributeChangedCallbackPreHook) {
            this.attributeChangedCallbackPreHook(name, old, value);
        }
        super.attributeChangedCallback(name, old, value);
        if (this.attributeChangedCallbackPostHook) {
            this.attributeChangedCallbackPostHook(name, old, value);
        }
    }
}
                /*
                Redux: {
                    createStore: redux.createStore
                },

                resolveJsObject: function (path) {
                    let obj = window;
                    path.split('.').forEach(function (p) {
                        obj = obj && obj[p];
                    });

                    return obj;
                },

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
            }*/