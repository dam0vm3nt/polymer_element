import { Omit } from "@dart2ts/dart/utils";
export declare namespace Action {
    type Constructors = 'Action';
    type Interface<X> = Omit<Action<X>, Constructors>;
}
export declare class Action<X> {
    _obj: any;
    readonly type: string;
    readonly detail: X;
    constructor(_obj: any);
    Action(_obj: any): void;
}
export declare class properties {
    private static __$REDUX_INIT_ACTION_NAME;
    static REDUX_INIT_ACTION_NAME: string;
}
