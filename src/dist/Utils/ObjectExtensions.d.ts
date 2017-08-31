export declare class ObjectExtensions {
    static extend<T>(a: T, b: T): T;
    static override<T>(a: T, b: T, checkValueExists?: boolean): T;
    static overrideDefaultValue<T>(options: T, default_option: T, checkValueExists?: boolean): T;
    static isNumeric(value: any): boolean;
}
