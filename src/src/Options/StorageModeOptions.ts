export interface StorageBaseOptions {
    hashSeparator: string;
}

export interface StorageParamsOptions extends StorageBaseOptions {
    keySeparator: string;
    itemSeparator: string;
    egalSeparator: string;
}