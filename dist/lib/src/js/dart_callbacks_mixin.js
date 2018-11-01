export const DartCallbacksBehavior = (base) => class extends base {
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
    attributeChangedCallback(name, old, value) {
        if (this.attributeChangedCallbackPreHook) {
            this.attributeChangedCallbackPreHook(name, old, value);
        }
        super.attributeChangedCallback(name, old, value);
        if (this.attributeChangedCallbackPostHook) {
            this.attributeChangedCallbackPostHook(name, old, value);
        }
    }
};
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
//# sourceMappingURL=dart_callbacks_mixin.js.map