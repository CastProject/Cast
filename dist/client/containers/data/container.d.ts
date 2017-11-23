export interface Container {
    getItem(key: string): Promise<any>;
    setItem(key: string, value: any): Promise<void>;
}
