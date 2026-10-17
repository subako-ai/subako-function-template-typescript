# Subako function template (TypeScript)

A Subako function package written with [`@subako-ai/function-sdk`](https://github.com/subako-ai/subako-function-sdk-typescript). Each tool becomes a function an agent can call.

1. Rename `my-function` in `package.json` and `subako-package.json` (lowercase letters, digits and `-`, up to 32 characters), and describe the package there.
2. Write tools in `src/index.ts` and list them in `serve()`.
3. Check and build:

   ```sh
   npm install
   npm run typecheck
   npm run build                               # writes dist/
   npm run pack                                # packs dist/ into my-function.tar.gz
   subako function create my-function.tar.gz   # or: subako function push <function-id> my-function.tar.gz
   ```

`tsconfig.json` declares only the globals the function runtime provides, so a DOM or Node API is a type error. `fetch` goes through Subako, which applies the function's network access and credentials.
