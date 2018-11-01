import { OperatorMethods, Omit } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
export declare namespace Metadata {
    type Constructors = 'Metadata';
    type Interface = Omit<Metadata, Constructors>;
}
export declare class Metadata {
    observedPaths: core.DartList<string>;
    constructor(_namedArguments?: {
        observedPaths?: core.DartList<string>;
    });
    Metadata(_namedArguments?: {
        observedPaths?: core.DartList<string>;
    }): void;
}
export declare namespace MetadataRegistry {
    type Constructors = '_';
    type Interface = Omit<MetadataRegistry, Constructors>;
}
export declare class MetadataRegistry {
    _data: core.DartMap<string, Metadata>;
    _(): void;
    static _: new () => MetadataRegistry;
    registerMetadata(tag: string, metadata: Metadata): void;
    [OperatorMethods.INDEX](type: string): Metadata;
}
export declare class properties {
    private static __$metadataRegistry;
    static metadataRegistry: MetadataRegistry;
}
