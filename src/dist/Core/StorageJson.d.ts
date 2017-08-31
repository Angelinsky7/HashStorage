import { StorageBase } from "./StorageBase";
import { StorageBaseOptions } from "../Options/StorageModeOptions";
export declare class StorageJson extends StorageBase {
    constructor(options?: StorageBaseOptions);
    Save(data: Map<string, object>): string;
    Load(): Map<string, object>;
}
