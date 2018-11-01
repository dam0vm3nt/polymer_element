var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defaultConstructor, DartClass } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
export var createCustomEvent = (type, detail, opt) => {
    opt = opt || new EventOptions();
    let ev = new CustomEvent(type, ((_) => {
        {
            _.bubbles = opt.bubbles;
            _.cancelable = opt.cancelable;
            _.composed = opt.composed;
            _.detail = detail;
            return _;
        }
    })({}));
    return ev;
};
let EventOptions = class EventOptions {
    constructor(_namedArguments) {
    }
    EventOptions(_namedArguments) {
        let { bubbles, cancelable, node, composed } = Object.assign({
            "bubbles": true,
            "cancelable": false,
            "composed": true
        }, _namedArguments);
        this.bubbles = bubbles;
        this.cancelable = cancelable;
        this.node = node;
        this.composed = composed;
    }
};
__decorate([
    defaultConstructor
], EventOptions.prototype, "EventOptions", null);
EventOptions = __decorate([
    DartClass
], EventOptions);
export { EventOptions };
/*
export namespace PropertyEffectsUtils {
    export type Constructors = 'PropertyEffectsUtils';
    export type Interface = Omit<PropertyEffectsUtils, Constructors>;
}
@DartClass
export class PropertyEffectsUtils {
    static splice(el : Polymer.PropertyEffects,path : string,index : number,howmany : number,items : core.DartList<any>) {
        return js_util.callMethod(el as any,'splice',((_) : core.DartList<any> =>  {
            {
                _.addAll(items);
                return _;
            }
        })(new core.DartList.literal(path,index,howmany)));
    }
    static unshift(el : Polymer.PropertyEffects,path : string,items? : any) {
        return js_util.callMethod(el as any,'unshift',((_) : core.DartList<any> =>  {
            {
                _.addAll(items);
                return _;
            }
        })(new core.DartList.literal(path)));
    }
    static push(el : Polymer.PropertyEffects,path : string,items? : any) {
        return js_util.callMethod(el as any,'push',((_) : core.DartList<any> =>  {
            {
                _.addAll(items);
                return _;
            }
        })(new core.DartList.literal(path)));
    }
    constructor() {
    }
    @defaultConstructor
    PropertyEffectsUtils() {
    }
}
*/
export class properties {
    static get POLYMER_VERSION() {
        if (this.__$POLYMER_VERSION === undefined) {
            this.__$POLYMER_VERSION = "v2.0.1";
        }
        return this.__$POLYMER_VERSION;
    }
    static set POLYMER_VERSION(__$value) {
        this.__$POLYMER_VERSION = __$value;
    }
    static get WEB_COMPONENTS() {
        if (this.__$WEB_COMPONENTS === undefined) {
            this.__$WEB_COMPONENTS = "v1.0.1";
        }
        return this.__$WEB_COMPONENTS;
    }
    static set WEB_COMPONENTS(__$value) {
        this.__$WEB_COMPONENTS = __$value;
    }
    static get _Undefined() {
        if (this.__$_Undefined === undefined) {
            this.__$_Undefined = new core.DartMap.literal([]);
        }
        return this.__$_Undefined;
    }
    static set _Undefined(__$value) {
        this.__$_Undefined = __$value;
    }
}
//# sourceMappingURL=polymer_element.js.map