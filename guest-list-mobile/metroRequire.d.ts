// Based on https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/webpack-env/index.d.ts
// Adds support for the runtime `require.context` method.
// https://github.com/facebook/metro/pull/822/

declare namespace __MetroModuleApi {
  interface RequireContext {
    (id: string): any;
    /**
     * Instructs Metro to generate a virtual module in the dependency graph,
     * with dependencies on every file in the file map that matches the context params.
     * This can be used to perform dynamic imports from files on disk at build time.
     * @note Metro parses for `require.context()` calls in the code while building.
     * @see https://github.com/facebook/metro/pull/822
     * @see https://webpack.js.org/guides/dependency-management/#requirecontext
     */
    context?(
      directory: string,
      useSubdirectories?: boolean,
      regExp?: RegExp,
      mode?: 'sync' | 'lazy',
    ): MetroRequireContext;
  }

  /**
   * Returned from `require.context` provided by Metro.
   * @see https://github.com/facebook/metro/pull/822
   * @see https://webpack.js.org/guides/dependency-management/#requirecontext
   */
  interface MetroRequireContext {
    (id: string): any;
    /**
     * @return an array of all possible requests that the context module can handle.
     */
    keys(): string[];
  }
}

/**
 * Declare process variable
 */
declare namespace NodeJS {
  interface Require extends __MetroModuleApi.RequireFunction {}
}
declare const process: NodeJS.Process;
