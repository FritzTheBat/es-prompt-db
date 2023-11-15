# RSM - Ebner Stolz - Prompt DB Frontend

## Developing

1. Installed dependencies with `npm install` (or `pnpm install` or `yarn`)
2. Start backend (separate project)
3. Link to backend by creating a `.env` file in the root directory, use .env.example as a template
4. Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
