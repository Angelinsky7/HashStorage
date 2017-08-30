// import { IStorage } from "./IStorage";
import { StorageBase } from "./StorageBase";

export class Storage64 extends StorageBase {

    constructor(separator: string = null) {
        super(separator);
    }

    Save(data: Map<string, object>): string {
        let result: string = this.m_Separator;

        if (data.size > 0) {
            let hash: any = {};
            data.forEach((v, k) => {
                hash[k] = v;
            });
            let strJson = this.b64EncodeUnicode(JSON.stringify(hash));
            // window.location.replace(`#${strJson}`);
            result = `${this.m_Separator}${strJson}`;
        }
        //  else {
        //     window.location.replace("#");
        // }

        return result;
    }

    Load(): Map<string, object> {

        let result = new Map<string, object>();

        try {
            let hash = window.location.hash.slice(this.m_Separator.length);
            if (hash.length > 0) {
                hash = decodeURIComponent(this.b64DecodeUnicode(hash));
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

    private b64EncodeUnicode(str: string): string {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode(parseInt('0x' + p1));
            }));
    }

    private b64DecodeUnicode(str: string): string {
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

}