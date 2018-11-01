var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defaultConstructor, DartClass } from "@dart2ts/dart/utils";
let PolymerRegister = class PolymerRegister {
    constructor(tagName, _namedArguments) {
    }
    PolymerRegister(tagName, _namedArguments) {
        let { template, native, uses } = Object.assign({
            "native": false
        }, _namedArguments);
        this.tagName = tagName;
        this.template = template;
        this.native = native;
        this.uses = uses;
    }
};
__decorate([
    defaultConstructor
], PolymerRegister.prototype, "PolymerRegister", null);
PolymerRegister = __decorate([
    DartClass
], PolymerRegister);
export { PolymerRegister };
let BowerImport = class BowerImport {
    constructor(_namedArguments) {
    }
    BowerImport(_namedArguments) {
        let { ref, _import, name } = Object.assign({}, _namedArguments);
        this.ref = ref;
        this.import = _import;
        this.name = name;
    }
};
__decorate([
    defaultConstructor
], BowerImport.prototype, "BowerImport", null);
BowerImport = __decorate([
    DartClass
], BowerImport);
export { BowerImport };
let Property = class Property {
    constructor(_namedArguments) {
    }
    Property(_namedArguments) {
        let { notify, computed, statePath, extra, statePathSelector } = Object.assign({
            "notify": false
        }, _namedArguments);
        this.notify = notify;
        this.computed = computed;
        this.statePath = statePath;
        this.extra = extra;
        this.statePathSelector = statePathSelector;
    }
};
__decorate([
    defaultConstructor
], Property.prototype, "Property", null);
Property = __decorate([
    DartClass
], Property);
export { Property };
let PolymerBehavior = class PolymerBehavior {
    constructor(name) {
    }
    PolymerBehavior(name) {
        this.name = name;
    }
};
__decorate([
    defaultConstructor
], PolymerBehavior.prototype, "PolymerBehavior", null);
PolymerBehavior = __decorate([
    DartClass
], PolymerBehavior);
export { PolymerBehavior };
let Observe = class Observe {
    constructor(observed) {
    }
    Observe(observed) {
        this.observed = observed;
    }
};
__decorate([
    defaultConstructor
], Observe.prototype, "Observe", null);
Observe = __decorate([
    DartClass
], Observe);
export { Observe };
let Notify = class Notify {
    constructor() {
    }
    Notify() {
    }
};
__decorate([
    defaultConstructor
], Notify.prototype, "Notify", null);
Notify = __decorate([
    DartClass
], Notify);
export { Notify };
export class properties {
    static get notify() {
        if (this.__$notify === undefined) {
            this.__$notify = new Notify();
        }
        return this.__$notify;
    }
    static set notify(__$value) {
        this.__$notify = __$value;
    }
}
//# sourceMappingURL=annotations.js.map