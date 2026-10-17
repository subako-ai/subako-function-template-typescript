# Subako function template (TypeScript)

A Subako function package written with [`@subako-ai/function-sdk`](https://github.com/subako-ai/subako-function-sdk-typescript). Each tool becomes a function an agent can call.

1. Rename `my-function` in `package.json` and `subako-package.json` (lowercase letters, digits and `-`, up to 32 characters), and describe the package there.
2. Write tools in `src/tools.ts` and list them in `src/index.ts`.
3. Check and build:

   ```sh
   npm install
   npm run typecheck
   npm test
   npm run build                  # writes dist/
   subako function create dist    # or: subako function push <function-id> dist
   ```

`tsconfig.json` declares only the globals the function runtime provides, so a DOM or Node API is a type error. `fetch` goes through Subako, which applies the function's network access and credentials.
