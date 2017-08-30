export class TreeItem {
    public name: string;
    public type: TreeItemType;
    public value: object;
    public readonly child: Array<TreeItem>;

    constructor(name: string, value: object, type: TreeItemType = TreeItemType.Unknown) {
        this.name = name;
        this.value = value;
        this.type = type;
        this.child = new Array<TreeItem>();
    }

}

export const enum TreeItemType {
    Unknown,
    Scalar,
    Array,
    Object
}