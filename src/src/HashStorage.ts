import { HashStorageOptions } from "./HashStorageOptions";
import { IStorage } from "./IStorage";
import { PropertyCounter } from "./Utils/PropertyCounter";
import { ObjectExtensions } from "./Utils/ObjectExtensions";
import { EventDispatcher, IEvent } from "strongly-typed-events";
import { HashChangedEventArgs } from "./HashChangedEventArgs";

export class HashStorage {

    private m_IsDisposed: boolean = false;
    private m_Storage: Map<string, object>;
    private m_IsUpdating: PropertyCounter;
    private m_PreviousHash: string;

    private m_Mode: IStorage;
    private m_Options: HashStorageOptions;

    private e_HashChangedEvent: EventDispatcher<HashStorage, HashChangedEventArgs>;

    public get hashChanged() : IEvent<HashStorage, HashChangedEventArgs> {
        return this.e_HashChangedEvent.asEvent();
    }

    constructor(mode: IStorage, options: HashStorageOptions = null) {
        if (mode === null) { throw 'Mode cannot be null'; }
        this.m_Mode = mode;
        this.setOptions(options);
        this.m_IsUpdating = new PropertyCounter();
        this.m_Storage = new Map<string, object>();

        this.e_HashChangedEvent = new EventDispatcher<HashStorage, HashChangedEventArgs>();

        if (this.m_Options.Debug) { console.log(`Mode is ${mode.constructor.name}`); }

        window.addEventListener("hashchange", () => { this.onHashChangeListener(); });
        this.ReadHash();
    }

    private setOptions(options: HashStorageOptions): void {
        let result: HashStorageOptions = {
            AutoSave: true,
            Debug: false
        };
        if (options != null) {
            ObjectExtensions.override<HashStorageOptions>(result, options);
        }
        this.m_Options = result;
    }

    private onHashChangeListener(): void {
        this.m_IsUpdating.end();
        if (!this.m_IsUpdating.isEnabled) {
            this.ReadHash();
        }
    }

    protected onHashChanged(): void {
        this.e_HashChangedEvent.dispatch(this, {});
    }

    public save(): void {
        let nextHash: string = this.m_Mode.Save(this.m_Storage);
        if (nextHash !== this.m_PreviousHash) {
            this.m_IsUpdating.begin();
            this.m_PreviousHash = nextHash;
            window.location.replace(nextHash);
        }
    }

    public dispose(): void {
        if (this.m_IsDisposed) { throw 'HashStorage is already disposed'; }
        this.clear();
        this.m_Storage = null;
        this.m_Mode = null;
        window.removeEventListener("hashchange", this.onHashChangeListener);
        this.m_IsDisposed = true;
    }

    public setItem(key: string, value: object): void {
        if (this.m_IsDisposed) { throw 'HashStorage is already disposed'; }
        if (!this.m_Storage.has(key)) {
            this.m_Storage.delete(key);
        }
        this.m_Storage.set(key, value);
        if (this.m_Options.AutoSave) { this.save(); }
    }

    public removeItem(key: string): void {
        if (this.m_IsDisposed) { throw 'HashStorage is already disposed'; }
        if (this.m_Storage.has(key)) {
            this.m_Storage.delete(key);
        }
        if (this.m_Options.AutoSave) { this.save(); }
    }

    public getItem(key: string): object {
        if (this.m_IsDisposed) { throw 'HashStorage is already disposed'; }
        if (!this.m_Storage.has(key)) { return null; }
        return this.m_Storage.get(key);
    }

    public clear(): void {
        if (this.m_IsDisposed) { throw 'HashStorage is already disposed'; }
        this.m_Storage.clear();
        if (this.m_Options.AutoSave) { this.save(); }
    }

    private ReadHash(): void {
        this.m_Storage.clear();
        let items = this.m_Mode.Load();
        items.forEach((v, k) => {
            this.m_Storage.set(k, v);
        });
        this.m_PreviousHash = window.location.hash;
        if (this.m_Options.Debug) { console.log(this.m_Storage); }
        this.onHashChanged();
    }


}