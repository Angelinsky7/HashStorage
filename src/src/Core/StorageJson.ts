import { StorageBase } from "./StorageBase";
import { StorageBaseOptions } from "../Options/StorageModeOptions";

export class StorageJson extends StorageBase {

    constructor(options: StorageBaseOptions = null) {
        super(options);
    }

    Save(data: Map<string, object>): string {
        let result: string = this.m_BaseOptions.hashSeparator;

        if (data.size > 0) {
            let hash: any = {};
            data.forEach((v, k) => {
                hash[k] = v;
            });
            let strJson = JSON.stringify(hash);
            // window.location.replace(`#${strJson}`);
            result = `${this.m_BaseOptions.hashSeparator}${strJson}`;
        } 
        // else {
        //     window.location.replace("#");
        // }

        return result;
    }
    Load(): Map<string, object> {

        let result = new Map<string, object>();

        try {
            let hash = window.location.hash.slice(this.m_BaseOptions.hashSeparator.length);
            if (hash.length > 0) {
                hash = decodeURIComponent(hash);
                let json = JSON.parse(hash);

                for (let item in json) {
                    result.set(item, json[item]);
                }
            }
        } catch (error) {
            console.log(`error is ${error}`);
        }

        return result;

    }

}