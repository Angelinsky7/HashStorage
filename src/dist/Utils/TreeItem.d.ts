export declare class TreeItem {
    name: string;
    type: TreeItemType;
    value: object;
    readonly child: Array<TreeItem>;
    constructor(name: string, value: object, type?: TreeItemType);
}
export declare const enum TreeItemType {
    Unknown = 0,
    Scalar = 1,
    Array = 2,
    Object = 3,
}
