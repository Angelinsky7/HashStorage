import { StorageBase } from "./StorageBase";
export declare class Storage64 extends StorageBase {
    constructor(separator?: string);
    Save(data: Map<string, object>): string;
    Load(): Map<string, object>;
    private b64EncodeUnicode(str);
    private b64DecodeUnicode(str);
}
