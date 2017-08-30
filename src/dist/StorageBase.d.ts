import { IStorage } from "./IStorage";
export declare abstract class StorageBase implements IStorage {
    protected m_Separator: string;
    constructor(separator?: string);
    abstract Save(data: Map<string, object>): string;
    abstract Load(): Map<string, object>;
}
