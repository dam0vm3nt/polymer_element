import { PolymerElement } from "@polymer/polymer";
interface HTMLElementCallbacks {
    ready(): any;
    connectedCallback(): any;
    disconnectedCallback(): any;
    attributeChangedCallback(name: any, oldval: any, newval: any): any;
}
export declare type IPolymerElement = typeof PolymerElement & HTMLElementCallbacks;
export declare type IPolymerElementConstructor = new (...args: any[]) => IPolymerElement;
export declare const DartCallbacksBehavior: <T extends IPolymerElementConstructor>(base: T) => {
    new (...args: any[]): {
        new (): PolymerElement;
        readyPreHook?: () => any;
        readyPostHook?: () => any;
        connectedCallbackPreHook?: () => any;
        connectedCallbackPostHook?: () => any;
        disconnectedCallbackPreHook?: () => any;
        disconnectedCallbackPostHook?: () => any;
        attributeChangedCallbackPreHook?: (name: string, old: any, value: any) => any;
        attributeChangedCallbackPostHook?: (name: string, old: any, value: any) => any;
        ready(): void;
        connectedCallback(): void;
        disconnectedCallback(): void;
        attributeChangedCallback(name: string, old: any, value: any): void;
        _parseTemplateContent: ((template: any, templateInfo: any, nodeInfo: any) => any) & ((template: any, templateInfo: any, nodeInfo: any) => any);
        createProperties: ((props: any) => void) & ((props: object) => void);
        _finalizeClass: (() => void) & (() => void);
        createObservers(observers: object, dynamicFns: object): void;
        _processStyleText(cssText: string, baseURI: string): string;
        _finalizeTemplate(is: string): void;
        _parseTemplateNode: ((node: Node, templateInfo: import("@polymer/polymer/interfaces").TemplateInfo, nodeInfo: import("@polymer/polymer/interfaces").NodeInfo) => boolean) & ((node: Node, templateInfo: import("@polymer/polymer/interfaces").TemplateInfo, nodeInfo: import("@polymer/polymer/interfaces").NodeInfo) => boolean);
        _parseTemplateNestedTemplate: ((node: Node, templateInfo: import("@polymer/polymer/interfaces").TemplateInfo, nodeInfo: import("@polymer/polymer/interfaces").NodeInfo) => boolean) & ((node: HTMLTemplateElement, outerTemplateInfo: import("@polymer/polymer/interfaces").TemplateInfo, nodeInfo: import("@polymer/polymer/interfaces").NodeInfo) => boolean);
        _parseTemplateNodeAttribute: ((node: Element, templateInfo: import("@polymer/polymer/interfaces").TemplateInfo, nodeInfo: import("@polymer/polymer/interfaces").NodeInfo, name: string, value: string) => boolean) & ((node: Element, templateInfo: import("@polymer/polymer/interfaces").TemplateInfo, nodeInfo: import("@polymer/polymer/interfaces").NodeInfo, name: string, value: string) => boolean);
        addPropertyEffect(property: string, type: string, effect?: object): void;
        createPropertyObserver(property: string, method: string | ((p0: any, p1: any) => any), dynamicFn?: boolean): void;
        createMethodObserver(expression: string, dynamicFn?: boolean | object): void;
        createNotifyingProperty(property: string): void;
        createReadOnlyProperty(property: string, protectedSetter?: boolean): void;
        createReflectedProperty(property: string): void;
        createComputedProperty(property: string, expression: string, dynamicFn?: boolean | object): void;
        bindTemplate(template: HTMLTemplateElement): import("@polymer/polymer/interfaces").TemplateInfo;
        _addTemplatePropertyEffect(templateInfo: object, prop: string, effect?: object): void;
        _parseBindings(text: string, templateInfo: object): import("@polymer/polymer/interfaces").BindingPart[];
        _evaluateBinding(inst: {
            new (): HTMLElement;
            prototype: HTMLElement;
        } & import("@polymer/polymer/lib/mixins/element-mixin").ElementMixinConstructor & import("@polymer/polymer/lib/mixins/property-effects").PropertyEffectsConstructor & import("@polymer/polymer/lib/mixins/template-stamp").TemplateStampConstructor & import("@polymer/polymer/lib/mixins/property-accessors").PropertyAccessorsConstructor & import("@polymer/polymer/lib/mixins/properties-changed").PropertiesChangedConstructor & import("@polymer/polymer/lib/mixins/properties-mixin").PropertiesMixinConstructor, part: import("@polymer/polymer/interfaces").BindingPart, path: string, props: object, oldProps: object, hasPaths: boolean): any;
        _parseTemplate(template: HTMLTemplateElement, outerTemplateInfo?: import("@polymer/polymer/interfaces").TemplateInfo): import("@polymer/polymer/interfaces").TemplateInfo;
        _parseTemplateChildNodes(root: Node, templateInfo: import("@polymer/polymer/interfaces").TemplateInfo, nodeInfo: import("@polymer/polymer/interfaces").NodeInfo): void;
        _parseTemplateNodeAttributes(node: Element, templateInfo: import("@polymer/polymer/interfaces").TemplateInfo, nodeInfo: import("@polymer/polymer/interfaces").NodeInfo): boolean;
        _contentForTemplate(template: HTMLTemplateElement): DocumentFragment;
        attributeNameForProperty: ((property: string) => string) & ((property: string) => string);
        createPropertiesForAttributes(): void;
        typeForProperty: ((name: string) => void) & ((name: string) => any);
        finalize(): void;
    };
} & T;
export {};
