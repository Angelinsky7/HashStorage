import { IStorage } from "./IStorage";
import { StorageBaseOptions } from "../Options/StorageModeOptions";
export declare abstract class StorageBase implements IStorage {
    protected m_BaseOptions: StorageBaseOptions;
    constructor(options?: StorageBaseOptions);
    abstract Save(data: Map<string, object>): string;
    abstract Load(): Map<string, object>;
}
