export interface IStorage {

    Save(data: Map<string, object>): string;
    Load():Map<string, object>;

}