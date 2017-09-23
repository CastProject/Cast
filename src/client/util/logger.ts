export interface Logger {

  /**
   * The tags, if any, to output with each log message
   * 
   * @type {string[]}
   * @memberof Logger
   */
  prefixes?: string[];


  /**
   * Print the given contents as a logging message
   * 
   * @param {...string[]} contents The contents to print
   * @memberof Logger
   */
  log (...contents: string[]): any;

  /**
   * Print the given contents as a warning message
   * 
   * @param {...string[]} contents The contents to print
   * @memberof Logger
   */
  warn (...contents: string[]): any;

  /**
   * Print the given contents as an error message
   * 
   * @param {...string[]} contents The contents to print
   * @memberof Logger
   */
  error (...contents: string[]): any;

  /**
   * Print the given contents as a debug message
   * 
   * @param {...string[]} contents The contents to print
   * @memberof Logger
   */
  debug (...contents: string[]): any;


  /**
   * Parses and prints an error
   * 
   * @param {Error} error The error to print
   * @memberof Logger
   */
  printError (error: Error): any;
}