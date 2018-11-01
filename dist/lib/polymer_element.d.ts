import { Omit } from "@dart2ts/dart/utils";
export declare var createCustomEvent: (type: string, detail?: any, opt?: EventOptions) => Event;
export declare namespace EventOptions {
    type Constructors = 'EventOptions';
    type Interface = Omit<EventOptions, Constructors>;
}
export declare class EventOptions {
    bubbles: boolean;
    cancelable: boolean;
    composed: boolean;
    node: HTMLElement;
    constructor(_namedArguments?: {
        bubbles?: boolean;
        cancelable?: boolean;
        node?: HTMLElement;
        composed?: boolean;
    });
    EventOptions(_namedArguments?: {
        bubbles?: boolean;
        cancelable?: boolean;
        node?: HTMLElement;
        composed?: boolean;
    }): void;
}
export declare class properties {
    private static __$POLYMER_VERSION;
    static POLYMER_VERSION: string;
    private static __$WEB_COMPONENTS;
    static WEB_COMPONENTS: string;
    private static __$_Undefined;
    static _Undefined: any;
}
