import { IStorage } from "./IStorage";

export abstract class StorageBase implements IStorage {

    protected m_Separator: string = "#!";
    constructor(separator: string = null) {
        if (separator !== null) {
            this.m_Separator = separator;
        }
    }

    abstract Save(data: Map<string, object>): string;
    abstract Load(): Map<string, object>;

}