/** Library asset:polymer_element/lib/polymer_element.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double,Omit} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "@dart2ts.packages/html5/lib/html";
import * as js_util from "@dart2ts/dart/js_util";

export var createCustomEvent : (type : string,detail? : any,opt? : EventOptions) => Event = (type : string,detail? : any,opt? : EventOptions) : Event =>  {
    opt = opt || new EventOptions();
    let ev : Event = new CustomEvent(type,((_) : CustomEventInit =>  {
        {
            _.bubbles = opt.bubbles;
            _.cancelable = opt.cancelable;
            _.composed = opt.composed;
            _.detail = detail;
            return _;
        }
    })({
    } as CustomEventInit));
    return ev;
};
/*
export var stamp : (templateClass : any,model? : core.DartList<any>) => Polymer.TemplateInstance = (templateClass : any,model? : core.DartList<any>) : Polymer.TemplateInstance =>  {
    return js_util.callConstructor(templateClass,model);
};
*/
export namespace EventOptions {
    export type Constructors = 'EventOptions';
    export type Interface = Omit<EventOptions, Constructors>;
}
@DartClass
export class EventOptions {
    bubbles : boolean;

    cancelable : boolean;

    composed : boolean;

    node : HTMLElement;

    constructor(_namedArguments? : {bubbles? : boolean,cancelable? : boolean,node? : HTMLElement,composed? : boolean}) {
    }
    @defaultConstructor
    EventOptions(_namedArguments? : {bubbles? : boolean,cancelable? : boolean,node? : HTMLElement,composed? : boolean}) {
        let {bubbles,cancelable,node,composed} = Object.assign({
            "bubbles" : true,
            "cancelable" : false,
            "composed" : true}, _namedArguments );
        this.bubbles = bubbles;
        this.cancelable = cancelable;
        this.node = node;
        this.composed = composed;
    }
}
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
    private static __$POLYMER_VERSION : string;
    static get POLYMER_VERSION() : string { 
        if (this.__$POLYMER_VERSION===undefined) {
            this.__$POLYMER_VERSION = "v2.0.1";
        }
        return this.__$POLYMER_VERSION;
    }
    static set POLYMER_VERSION(__$value : string)  { 
        this.__$POLYMER_VERSION = __$value;
    }

    private static __$WEB_COMPONENTS : string;
    static get WEB_COMPONENTS() : string { 
        if (this.__$WEB_COMPONENTS===undefined) {
            this.__$WEB_COMPONENTS = "v1.0.1";
        }
        return this.__$WEB_COMPONENTS;
    }
    static set WEB_COMPONENTS(__$value : string)  { 
        this.__$WEB_COMPONENTS = __$value;
    }

    private static __$_Undefined;
    static get _Undefined() { 
        if (this.__$_Undefined===undefined) {
            this.__$_Undefined = new core.DartMap.literal([
            ]);
        }
        return this.__$_Undefined;
    }
    static set _Undefined(__$value : any)  { 
        this.__$_Undefined = __$value;
    }

}
