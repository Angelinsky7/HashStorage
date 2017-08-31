export class ObjectExtensions {

    public static extend<T>(a: T, b: T): T {
        let result: T = a;
        for (let id in b) {
            if (!result.hasOwnProperty(id)) {
                result[id] = b[id];
            }
        }
        return result;
    }

    public static override<T>(a: T, b: T, checkValueExists: boolean = true): T {
        let result: T = a;
        for (let id in b) {
            if (result.hasOwnProperty(id)) {
                result[id] = b[id];
            } else if (checkValueExists) {
                throw `property ${id} does not exist in class ${typeof a} : ${a} and ${typeof b} : ${b}`;
            }
        }
        return result;
    }

    public static overrideDefaultValue<T>(options: T, default_option: T, checkValueExists: boolean = true): T {
        if (options != null) {
            ObjectExtensions.override<T>(default_option, options, checkValueExists);
        }
        return default_option;
    }

    public static isNumeric(value: any): boolean {
        return !isNaN(value);
    }

    // public static extend<A, B>(a: A, b: B): A & B;
    // public static extend<A, B, C>(a: A, b: B, c: C): A & B & C;
    // public static extend<A, B, C, D>(a: A, b: B, c: C, d: D): A & B & C & D;
    // public static extend(...args: any[]): any {
    //     const newObj = {};
    //     for (const obj of args) {
    //         for (const key in obj) {
    //             //copy all the fields
    //             newObj[key] = obj[key];
    //         }
    //     }
    //     return newObj;
    // };

}