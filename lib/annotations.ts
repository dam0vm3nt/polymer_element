/** Library asset:polymer_element/lib/annotations.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double,Omit} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";

export namespace PolymerRegister {
    export type Constructors = 'PolymerRegister';
    export type Interface = Omit<PolymerRegister, Constructors>;
}
@DartClass
export class PolymerRegister {
    tagName : string;

    template : string;

    native : boolean;

    uses : core.DartList<core.Type>;

    constructor(tagName : string,_namedArguments? : {template? : string,native? : boolean,uses? : core.DartList<core.Type>}) {
    }
    @defaultConstructor
    PolymerRegister(tagName : string,_namedArguments? : {template? : string,native? : boolean,uses? : core.DartList<core.Type>}) {
        let {template,native,uses} = Object.assign({
            "native" : false}, _namedArguments );
        this.tagName = tagName;
        this.template = template;
        this.native = native;
        this.uses = uses;
    }
}

export namespace BowerImport {
    export type Constructors = 'BowerImport';
    export type Interface = Omit<BowerImport, Constructors>;
}
@DartClass
export class BowerImport {
    ref : string;

    import : string;

    name : string;

    constructor(_namedArguments? : {ref? : string,import? : string,name? : string}) {
    }
    @defaultConstructor
    BowerImport(_namedArguments? : {ref? : string,import? : string,name? : string}) {
        let {ref,import,name} = Object.assign({
        }, _namedArguments );
        this.ref = ref;
        this.import = import;
        this.name = name;
    }
}

export namespace Property {
    export type Constructors = 'Property';
    export type Interface = Omit<Property, Constructors>;
}
@DartClass
export class Property {
    notify : boolean;

    computed : string;

    statePath : string;

    statePathSelector : Function;

    extra : core.DartMap<any,any>;

    constructor(_namedArguments? : {notify? : boolean,computed? : string,statePath? : string,extra? : core.DartMap<any,any>,statePathSelector? : Function}) {
    }
    @defaultConstructor
    Property(_namedArguments? : {notify? : boolean,computed? : string,statePath? : string,extra? : core.DartMap<any,any>,statePathSelector? : Function}) {
        let {notify,computed,statePath,extra,statePathSelector} = Object.assign({
            "notify" : false}, _namedArguments );
        this.notify = notify;
        this.computed = computed;
        this.statePath = statePath;
        this.extra = extra;
        this.statePathSelector = statePathSelector;
    }
}

export namespace PolymerBehavior {
    export type Constructors = 'PolymerBehavior';
    export type Interface = Omit<PolymerBehavior, Constructors>;
}
@DartClass
export class PolymerBehavior {
    name : string;

    constructor(name : string) {
    }
    @defaultConstructor
    PolymerBehavior(name : string) {
        this.name = name;
    }
}

export namespace Observe {
    export type Constructors = 'Observe';
    export type Interface = Omit<Observe, Constructors>;
}
@DartClass
export class Observe {
    observed : string;

    constructor(observed : string) {
    }
    @defaultConstructor
    Observe(observed : string) {
        this.observed = observed;
    }
}

export namespace Notify {
    export type Constructors = 'Notify';
    export type Interface = Omit<Notify, Constructors>;
}
@DartClass
export class Notify {
    constructor() {
    }
    @defaultConstructor
    Notify() {
    }
}

export class properties {
    private static __$notify : Notify;
    static get notify() : Notify { 
        if (this.__$notify===undefined) {
            this.__$notify = new Notify();
        }
        return this.__$notify;
    }
    static set notify(__$value : Notify)  { 
        this.__$notify = __$value;
    }

}
