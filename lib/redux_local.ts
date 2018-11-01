/** Library asset:polymer_element/lib/redux_local.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double,Omit} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./polymerize_js";
import * as lib4 from "./redux";

export var asAction : <X>(a : {type:string,detail?:any}) => lib4.Action<X> = <X>(a : {type:string,detail?:any}) : lib4.Action<X> =>  {
    return new lib4.Action<X>(a);
};
export class properties {
}
