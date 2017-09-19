export interface Logger {
    log(...contents: string[]): any;
    warn(...contents: string[]): any;
    error(...contents: string[]): any;
    debug(...contents: string[]): any;
}
