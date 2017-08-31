import { HashStorageOptions } from "../Options/HashStorageOptions";
import { IStorage } from "./IStorage";
import { IEvent } from "strongly-typed-events";
import { HashChangedEventArgs } from "../Events/HashChangedEventArgs";
export declare class HashStorage {
    private m_IsDisposed;
    private m_Storage;
    private m_IsUpdating;
    private m_PreviousHash;
    private m_Mode;
    private m_Options;
    private e_HashChangedEvent;
    readonly hashChanged: IEvent<HashStorage, HashChangedEventArgs>;
    constructor(mode: IStorage, options?: HashStorageOptions);
    private setOptions(options);
    private onHashChangeListener();
    protected onHashChanged(): void;
    save(): void;
    dispose(): void;
    setItem(key: string, value: object): void;
    removeItem(key: string): void;
    getItem(key: string): object;
    clear(): void;
    private ReadHash();
}
