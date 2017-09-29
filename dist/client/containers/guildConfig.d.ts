export interface GuildConfiguration {
    getItem(key: string, type?: any): Promise<any>;
    setItem(key: string, item: any): Promise<void>;
}
