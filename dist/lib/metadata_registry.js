var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defaultConstructor, namedConstructor, DartClass, OperatorMethods } from "@dart2ts/dart/utils";
import * as core from "@dart2ts/dart/core";
let Metadata = class Metadata {
    constructor(_namedArguments) {
    }
    Metadata(_namedArguments) {
        let { observedPaths } = Object.assign({}, _namedArguments);
        this.observedPaths = observedPaths;
    }
};
__decorate([
    defaultConstructor
], Metadata.prototype, "Metadata", null);
Metadata = __decorate([
    DartClass
], Metadata);
export { Metadata };
let MetadataRegistry = class MetadataRegistry {
    _() {
        this._data = new core.DartMap.literal([]);
    }
    registerMetadata(tag, metadata) {
        this._data.set(new core.DartString(tag).toUpperCase(), metadata);
    }
    [OperatorMethods.INDEX](type) {
        return this._data.get(new core.DartString(type).toUpperCase());
    }
};
__decorate([
    namedConstructor
], MetadataRegistry.prototype, "_", null);
MetadataRegistry = __decorate([
    DartClass
], MetadataRegistry);
export { MetadataRegistry };
export class properties {
    static get metadataRegistry() {
        if (this.__$metadataRegistry === undefined) {
            this.__$metadataRegistry = new MetadataRegistry._();
        }
        return this.__$metadataRegistry;
    }
    static set metadataRegistry(__$value) {
        this.__$metadataRegistry = __$value;
    }
}
//# sourceMappingURL=metadata_registry.js.map