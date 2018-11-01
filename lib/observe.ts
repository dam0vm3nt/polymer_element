/** Library asset:polymer_element/lib/observe.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double,Omit} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";
import * as lib3 from "./dart_callbacks_behavior";
import * as lib4 from "./property_observer_behavior";
import * as js_util from "@dart2ts/dart/js_util";
import * as lib6 from "./polymer_element";
import PolymerizeObservableSupport from "./src/js/observe_support";

export var toObservable : (obj : any) => any = (obj : any) =>  {
    return properties.observeSupport.makeObservable(obj);
};
export namespace ObserveSupport {
    export type Constructors = 'ObserveSupport';
    export type Interface = Omit<ObserveSupport, Constructors>;
}
@DartClass
export class ObserveSupport {
    constructor() {
    }
    @defaultConstructor
    ObserveSupport() {
    }
    makeObservable<X>(obj : X,_namedArguments? : {callback? : (propertyName : string,oldValue : any,newValue : any,mode? : any) => any,factory? : (property : string,value : any) => CallbackFactoryResult}) : X {
        let {callback,factory} = Object.assign({
        }, _namedArguments );
        return PolymerizeObservableSupport.makeObservable(obj,callback,factory);
    }
    cancelObserver(obj : any,callback : (propertyName : string,oldValue : any,newValue : any,mode : any?) => any,factory? : (property : string,value : any) => CallbackFactoryResult) {
        return PolymerizeObservableSupport.cancelObserver(obj,callback,factory);
    }
    findProps(obj : any) : core.DartList<string> {
        return PolymerizeObservableSupport.findProps(obj);
    }
}

export namespace AutonotifyBehavior {
    export type Constructors = 'AutonotifyBehavior';
    export type Interface = Omit<AutonotifyBehavior, Constructors>;
}
@DartClass
@Implements(Polymerize.DartCallbacksBehavior,Polymerize.PropertyObserverBehavior)
@DartClassAnnotation({
    library : 'asset:polymer_element/lib/annotations.dart',type : 'PolymerBehavior',value : {
        arguments : ['Polymerize.AutonotifyBehavior'],namedArguments : {
        }}})
export class AutonotifyBehavior implements Polymerize.DartCallbacksBehavior.Interface,Polymerize.PropertyObserverBehavior.Interface {
    _mainNotifier : Notifier;

    readyPreHook() : void {
        this._mainNotifier = new Notifier(this,"",(prop : any) =>  {
            return this.onNotify(prop);
        });
    }
    onPropertiesChangedPreHook(data : any,changedProps : any,oldData : any) : void {
        Object.keys(changedProps).forEach((propName : any) =>  {
            let oldv = js_util.getProperty(oldData,propName);
            let newv = js_util.getProperty(data,propName);
            if (oldv != newv) {
                this._mainNotifier.install(propName,oldv,newv);
            }
        });
    }
    onNotify(propName : string) : void {
        (this as Polymer.Element).notifyPath(propName);
    }
    constructor() {
    }
    @defaultConstructor
    AutonotifyBehavior() {
    }
}

export namespace Notifier {
    export type Constructors = 'Notifier';
    export type Interface = Omit<Notifier, Constructors>;
}
@DartClass
export class Notifier {
    _path : string;

    _notify : (path : string) => void;

    _obj;

    _callback : (propertyName : string,oldValue : any,newValue : any,mode : any?) => any;

    _factory : (property : string,value : any) => CallbackFactoryResult;

    constructor(_obj : any,_path : string,_notify : (path : string) => void) {
    }
    @defaultConstructor
    Notifier(_obj : any,_path : string,_notify : (path : string) => void) {
        this._topLevel = new core.DartMap.literal([
        ]);
        this._obj = _obj;
        this._path = _path;
        this._notify = _notify;
        this._callback = (propName : string,oldv : any,newv : any,mode? : any) =>  {
            if (mode != properties.MODE_DELETED) this._notify(`${this._path}${propName}`);
        };
        this._factory = (property : string,value : any) =>  {
            return new Notifier(null,`${this._path}${property}.`,this._notify)._asResult();
        };
    }
    _asResult() : CallbackFactoryResult {
        return {
            callback : this._callback,factory : this._factory} as CallbackFactoryResult;
    }
    uninstall(propName : string,oldv : any) : void {
        if (oldv != null) {
            let pxy = properties.observeSupport.makeObservable(oldv);
            let res : CallbackFactoryResult = this._topLevel.remove(propName);
            if (pxy != null && res != null) {
                properties.observeSupport.cancelObserver(pxy,res.callback,res.factory);
            }
        }
    }
    _topLevel : core.DartMap<string,CallbackFactoryResult>;

    install(propName : string,oldv : any,newv : any) : void {
        this.uninstall(propName,oldv);
        let p = newv;
        if (newv != null) {
            p = properties.observeSupport.makeObservable(newv);
            if (p != null) {
                let res : CallbackFactoryResult = this._factory(propName,newv);
                this._topLevel.set(propName,res);
                properties.observeSupport.makeObservable(newv,{
                    callback : res.callback,factory : res.factory});
                if (p != newv) {
                    let __data = js_util.getProperty(this._obj,'__data');
                    if (__data != null) {
                        js_util.setProperty(__data,propName,p);
                    }
                }
            }
        }
    }
}

export class properties {
    private static __$MODE_ADDED : string;
    static get MODE_ADDED() : string { 
        if (this.__$MODE_ADDED===undefined) {
            this.__$MODE_ADDED = 'ADDED';
        }
        return this.__$MODE_ADDED;
    }
    static set MODE_ADDED(__$value : string)  { 
        this.__$MODE_ADDED = __$value;
    }

    private static __$MODE_DELETED : string;
    static get MODE_DELETED() : string { 
        if (this.__$MODE_DELETED===undefined) {
            this.__$MODE_DELETED = 'DELETED';
        }
        return this.__$MODE_DELETED;
    }
    static set MODE_DELETED(__$value : string)  { 
        this.__$MODE_DELETED = __$value;
    }

    private static __$observeSupport : ObserveSupport;
    static get observeSupport() : ObserveSupport { 
        if (this.__$observeSupport===undefined) {
            this.__$observeSupport = new ObserveSupport();
        }
        return this.__$observeSupport;
    }
    static set observeSupport(__$value : ObserveSupport)  { 
        this.__$observeSupport = __$value;
    }

}
