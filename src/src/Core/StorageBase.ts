import { IStorage } from "./IStorage";
import { StorageBaseOptions } from "../Options/StorageModeOptions";
import { ObjectExtensions } from "../Utils/ObjectExtensions";

export abstract class StorageBase implements IStorage {

    protected m_BaseOptions: StorageBaseOptions;

    constructor(options: StorageBaseOptions = null) {
        this.m_BaseOptions = ObjectExtensions.overrideDefaultValue<StorageBaseOptions>(options, {
            hashSeparator: "#!"
        }, false);
    }

    abstract Save(data: Map<string, object>): string;
    abstract Load(): Map<string, object>;

}