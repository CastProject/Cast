export interface Logger {
  prefixes?: string[];

  log (...contents: string[]): any;
  warn (...contents: string[]): any;
  error (...contents: string[]): any;
  debug (...contents: string[]): any;
  printError (...contents: string[]): any;
}