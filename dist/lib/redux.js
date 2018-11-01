var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defaultConstructor, DartClass } from "@dart2ts/dart/utils";
let Action = class Action {
    constructor(_obj) {
    }
    get type() {
        return this._obj.type;
    }
    get detail() {
        return this._obj.detail;
    }
    Action(_obj) {
        this._obj = _obj;
    }
};
__decorate([
    defaultConstructor
], Action.prototype, "Action", null);
Action = __decorate([
    DartClass
], Action);
export { Action };
export class properties {
    static get REDUX_INIT_ACTION_NAME() {
        if (this.__$REDUX_INIT_ACTION_NAME === undefined) {
            this.__$REDUX_INIT_ACTION_NAME = '@@redux/INIT';
        }
        return this.__$REDUX_INIT_ACTION_NAME;
    }
    static set REDUX_INIT_ACTION_NAME(__$value) {
        this.__$REDUX_INIT_ACTION_NAME = __$value;
    }
}
//# sourceMappingURL=redux.js.map