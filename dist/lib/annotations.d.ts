import { Omit } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
export declare namespace PolymerRegister {
    type Constructors = 'PolymerRegister';
    type Interface = Omit<PolymerRegister, Constructors>;
}
export declare class PolymerRegister {
    tagName: string;
    template: string;
    native: boolean;
    uses: core.DartList<any>;
    constructor(tagName: string, _namedArguments?: {
        template?: string;
        native?: boolean;
        uses?: core.DartList<any>;
    });
    PolymerRegister(tagName: string, _namedArguments?: {
        template?: string;
        native?: boolean;
        uses?: core.DartList<any>;
    }): void;
}
export declare namespace BowerImport {
    type Constructors = 'BowerImport';
    type Interface = Omit<BowerImport, Constructors>;
}
export declare class BowerImport {
    ref: string;
    import: string;
    name: string;
    constructor(_namedArguments?: {
        ref?: string;
        import?: string;
        name?: string;
    });
    BowerImport(_namedArguments?: {
        ref?: string;
        _import?: string;
        name?: string;
    }): void;
}
export declare namespace Property {
    type Constructors = 'Property';
    type Interface = Omit<Property, Constructors>;
}
export declare class Property {
    notify: boolean;
    computed: string;
    statePath: string;
    statePathSelector: Function;
    extra: core.DartMap<any, any>;
    constructor(_namedArguments?: {
        notify?: boolean;
        computed?: string;
        statePath?: string;
        extra?: core.DartMap<any, any>;
        statePathSelector?: Function;
    });
    Property(_namedArguments?: {
        notify?: boolean;
        computed?: string;
        statePath?: string;
        extra?: core.DartMap<any, any>;
        statePathSelector?: Function;
    }): void;
}
export declare namespace PolymerBehavior {
    type Constructors = 'PolymerBehavior';
    type Interface = Omit<PolymerBehavior, Constructors>;
}
export declare class PolymerBehavior {
    name: string;
    constructor(name: string);
    PolymerBehavior(name: string): void;
}
export declare namespace Observe {
    type Constructors = 'Observe';
    type Interface = Omit<Observe, Constructors>;
}
export declare class Observe {
    observed: string;
    constructor(observed: string);
    Observe(observed: string): void;
}
export declare namespace Notify {
    type Constructors = 'Notify';
    type Interface = Omit<Notify, Constructors>;
}
export declare class Notify {
    constructor();
    Notify(): void;
}
export declare class properties {
    private static __$notify;
    static notify: Notify;
}
