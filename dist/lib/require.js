/*
export var require : (module : any) => async.Future<any> = (module : any) : async.Future<any> =>  {
    let done : async.DartCompleter<any> = new async.DartCompleter<any>();
    require(new core.DartList.literal(module),(mod : any) =>  {
        return done.complete(mod);
    },(error : any) =>  {
        return done.completeError(error);
    });
    return done.future;
};*/
export class properties {
}
//# sourceMappingURL=require.js.map