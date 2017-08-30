import { StorageBase } from "./StorageBase";
export declare class StorageHash extends StorageBase {
    constructor(separator?: string);
    Save(data: Map<string, object>): string;
    Load(): Map<string, object>;
}
