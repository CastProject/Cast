export interface GuildConfiguration {
    getItem(key: string, type?: any): any;
    setItem(key: string, item: any): Promise<void>;
}
