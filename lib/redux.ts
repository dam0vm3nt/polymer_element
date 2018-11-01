/** Library asset:polymer_element/lib/redux.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double,Omit} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";

export namespace Action {
    export type Constructors = 'Action';
    export type Interface<X> = Omit<Action<X>, Constructors>;
}
@DartClass
export class Action<X> {
    _obj;

    get type() : string {
        return this._obj.type;
    }
    get detail() : X {
        return this._obj.detail;
    }
    constructor(_obj : any) {
    }
    @defaultConstructor
    Action(_obj : any) {
        this._obj = _obj;
    }
}

export class properties {
    private static __$REDUX_INIT_ACTION_NAME : string;
    static get REDUX_INIT_ACTION_NAME() : string { 
        if (this.__$REDUX_INIT_ACTION_NAME===undefined) {
            this.__$REDUX_INIT_ACTION_NAME = '@@redux/INIT';
        }
        return this.__$REDUX_INIT_ACTION_NAME;
    }
    static set REDUX_INIT_ACTION_NAME(__$value : string)  { 
        this.__$REDUX_INIT_ACTION_NAME = __$value;
    }

}
