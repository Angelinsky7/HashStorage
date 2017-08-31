import { StorageBase } from "./StorageBase";
import { StorageBaseOptions } from "../Options/StorageModeOptions";
export declare class Storage64 extends StorageBase {
    constructor(options?: StorageBaseOptions);
    Save(data: Map<string, object>): string;
    Load(): Map<string, object>;
    private b64EncodeUnicode(str);
    private b64DecodeUnicode(str);
}
