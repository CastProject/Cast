export interface Container {
    getItem(key: string): Promise<any>;
    deleteItem(key: string): Promise<void>;
    setItem(key: string, value: any): Promise<void>;
}