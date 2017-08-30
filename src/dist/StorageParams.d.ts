import { StorageBase } from "./StorageBase";
export declare class StorageParams extends StorageBase {
    protected m_KeySeparator: string;
    protected m_ItemSeparator: string;
    protected m_EgalSeparator: string;
    constructor(key_separator?: string, item_separator?: string, separator?: string);
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
