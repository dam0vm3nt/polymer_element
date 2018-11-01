/** Library asset:polymer_element/lib/metadata_registry.dart */
import {is,isNot,equals} from "@dart2ts/dart/_common";
import {defaultConstructor,namedConstructor,namedFactory,defaultFactory,DartClass,Implements,With,op,Op,OperatorMethods,DartClassAnnotation,DartMethodAnnotation,DartPropertyAnnotation,Abstract,AbstractProperty,int,bool,double,Omit} from "@dart2ts/dart/utils";
import * as _common from "@dart2ts/dart/_common";
import * as core from "@dart2ts/dart/core";
import * as async from "@dart2ts/dart/async";

export namespace Metadata {
    export type Constructors = 'Metadata';
    export type Interface = Omit<Metadata, Constructors>;
}
@DartClass
export class Metadata {
    observedPaths : core.DartList<string>;

    constructor(_namedArguments? : {observedPaths? : core.DartList<string>}) {
    }
    @defaultConstructor
    Metadata(_namedArguments? : {observedPaths? : core.DartList<string>}) {
        let {observedPaths} = Object.assign({
        }, _namedArguments );
        this.observedPaths = observedPaths;
    }
}

export namespace MetadataRegistry {
    export type Constructors = '_';
    export type Interface = Omit<MetadataRegistry, Constructors>;
}
@DartClass
export class MetadataRegistry {
    _data : core.DartMap<string,Metadata>;

    @namedConstructor
    _() {
        this._data = new core.DartMap.literal([
        ]);
    }
    static _ : new() => MetadataRegistry;

    registerMetadata(tag : string,metadata : Metadata) : void {
        this._data.set(new core.DartString(tag).toUpperCase(),metadata);
    }
    [OperatorMethods.INDEX](type : string) : Metadata {
        return this._data.get(new core.DartString(type).toUpperCase());
    }
}

export class properties {
    private static __$metadataRegistry : MetadataRegistry;
    static get metadataRegistry() : MetadataRegistry { 
        if (this.__$metadataRegistry===undefined) {
            this.__$metadataRegistry = new MetadataRegistry._();
        }
        return this.__$metadataRegistry;
    }
    static set metadataRegistry(__$value : MetadataRegistry)  { 
        this.__$metadataRegistry = __$value;
    }

}
