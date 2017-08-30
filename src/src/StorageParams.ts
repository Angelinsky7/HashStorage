import { StorageBase } from "./StorageBase";
import { ObjectExtensions } from "./Utils/ObjectExtensions";
import { TreeItem, TreeItemType } from "./Utils/TreeItem";

export class StorageParams extends StorageBase {

    protected m_KeySeparator: string = "_";
    protected m_ItemSeparator: string = "&";
    protected m_EgalSeparator: string = "=";

    constructor(key_separator: string = null, item_separator: string = null, separator: string = null) {
        super(separator);

        if (key_separator != null) {
            this.m_KeySeparator = key_separator;
        }
        if (item_separator != null) {
            this.m_ItemSeparator = item_separator;
        }
    }

    Save(data: Map<string, object>): string {
        let result: string = this.m_Separator;

        if (data.size > 0) {
            let lstItem: Array<string> = new Array<string>();
            data.forEach((v, k) => {
                lstItem.push(this.serialize(null, k, v));
            });
            result += lstItem.join(this.m_ItemSeparator);
        }

        return result;
    }

    Load(): Map<string, object> {
        let result = new Map<string, object>();
        let treeRoot: TreeItem = new TreeItem("root", null);

        try {
            let hash = window.location.hash.slice(this.m_Separator.length);
            if (hash.length > 0) {
                hash = decodeURIComponent(hash);
                let items: string[] = hash.split(this.m_ItemSeparator);
                for (let item of items) {
                    let expr: string[] = item.split(this.m_EgalSeparator);
                    let itemKeys: string[] = expr[0].split(this.m_KeySeparator);
                    let itemValue = expr[1];

                    this.buildTree(treeRoot, itemKeys, itemValue);
                }5

                for (let item of treeRoot.child) {
                    let newMapItem = this.deserialize(item);
                    result.set(newMapItem[0], newMapItem[1]);
                }
            }
        } catch (error) {
            console.log(`error is ${error}`);
        }

        return result;
    }

    private serialize(parentKey: string, key: string, value: object): string | undefined {
        if (value instanceof Array) {
            return this.serializeArray(parentKey, key, value);
        } else if (value instanceof Object) {
            return this.serializeObject(parentKey, key, value);
        }
        return this.serializeScalar(parentKey, key, value);
    }

    private serializeObject(parentKey: string, key: string, value: any): string {
        let result: Array<String> = new Array<String>();
        for (let item in value) {
            result.push(this.serialize(this.joinKey(parentKey, key), item, value[item]));
        }
        return result.join(this.m_ItemSeparator);
    }

    private serializeArray(parentKey: string, key: string, value: Array<any>): string {
        let result: Array<String> = new Array<String>();
        for (let i: number = 0; i < value.length; ++i) {
            result.push(this.serialize(this.joinKey(parentKey, key), i.toString(), value[i]));
        };
        return result.join(this.m_ItemSeparator);
    }

    private serializeScalar(parentKey: string, key: string, value: object): string {
        let valueStr: string = `${value}`;
        if (typeof value === "string") {
            valueStr = `"${value}"`;
        }
        return `${this.joinKey(parentKey, key)}${this.m_EgalSeparator}${valueStr}`;
    }

    private joinKey(parentKey: string, key: string): string {
        let result: string = key;
        if (parentKey != null) {
            result = `${parentKey}${this.m_KeySeparator}${result}`;
        }
        return result;
    }

    private buildTree(parent: TreeItem, keys: Array<string>, value: string) {
        parent.type = isNaN(parseInt(keys[0])) ?
            TreeItemType.Object :
            TreeItemType.Array;

        if (keys.length > 1) {
            let itemTree = parent.child.find((p) => p.name == keys[0]);
            if (itemTree == null) {
                itemTree = new TreeItem(keys[0], null);
                parent.child.push(itemTree);
            }
            this.buildTree(itemTree, keys.slice(1), value);
        } else {
            let rvalue: Object = value;
            if (value.startsWith("\"")) {
                rvalue = value.substring(1, value.length - 1);
            } else {
                rvalue = parseFloat(value);
                if (isNaN(<number>rvalue)) {
                    rvalue = !!value;
                }
            }
            parent.child.push(new TreeItem(keys[0], rvalue, TreeItemType.Scalar));
        }
    }

    private deserialize(parent: TreeItem): [string, object] {
        switch (parent.type) {
            case TreeItemType.Scalar:
                return this.deserializeScalar(parent);
            case TreeItemType.Array:
                return this.deserializeArray(parent);
            case TreeItemType.Object:
                return this.deserializeObject(parent);
        }

        throw 'cannot deserialize this : ' + parent.name;
    }

    private deserializeScalar(item: TreeItem): [string, object] {
        return [item.name, item.value];
    }

    private deserializeArray(array: TreeItem): [string, object] {
        let result: Array<any> = new Array<any>();
        for (let item of array.child) {
            let r = this.deserialize(item);
            result.push(r[1]);
        }
        return [array.name, result];
    }

    private deserializeObject(obj: TreeItem): [string, object] {
        let result: any = {};
        for (let item of obj.child) {
            let r = this.deserialize(item);
            result[r[0]] = r[1];
        }
        return [obj.name, result];
    }

}