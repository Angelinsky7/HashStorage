import { StorageBase } from "./StorageBase";
import { StorageParamsOptions } from "../Options/StorageModeOptions";
export declare class StorageParams extends StorageBase {
    private m_ParamOptions;
    constructor(options?: StorageParamsOptions);
    Save(data: Map<string, object>): string;
    Load(): Map<string, object>;
    private serialize(parentKey, key, value);
    private serializeObject(parentKey, key, value);
    private serializeArray(parentKey, key, value);
    private serializeScalar(parentKey, key, value);
    private joinKey(parentKey, key);
    private buildTree(parent, keys, value);
    private deserialize(parent);
    private deserializeScalar(item);
    private deserializeArray(array);
    private deserializeObject(obj);
}
