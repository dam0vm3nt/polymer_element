declare const _sub: unique symbol;
declare type RemoveHandlers<T> = {
    [K in keyof T]: RemoveHandler;
};
export interface CallbackFactory<T> {
    <K extends keyof T>(property: K, val: T[K]): CallbackFactoryResult<T[K]>;
    [_sub]?: RemoveHandlers<T>;
}
export interface CallbackFactoryResult<T> {
    callback?: Callback<T>;
    factory?: CallbackFactory<T>;
}
export declare type CallbackMode = "ADDED" | "DELETED" | undefined;
export interface Callback<T> {
    <K extends keyof T>(property?: K, oldVal?: T[K], value?: T[K], mode?: CallbackMode): any;
}
declare type RemoveHandler = () => void;
export declare class Callbacks<T extends Object> implements ProxyHandler<T> {
    cbs: Callback<T>[];
    callbackFactories: CallbackFactory<T>[];
    oldLen: number;
    constructor(obj: any);
    set<K extends keyof T>(tgt: T, property: K, value: T[K]): boolean;
    deleteProperty<K extends keyof T>(tgt: T, property: K): boolean;
    get<K extends keyof T>(tgt: T, property: K): T[K];
}
declare let PolymerizeObservableSupport: {
    makeObservable: <T>(dartObj: T, callback: Callback<T>, callbackFactory: CallbackFactory<T>) => T;
    cancelObserver: <T>(arg: T, callback: any, callbackFactory: any) => void;
    findProps: (obj: any) => string[];
};
export default PolymerizeObservableSupport;
