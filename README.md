# Rain Code Challenge

Thanks for the challenge was very fun, hope you enjoy the results

## Requirements

- A login by email + password (the API validation for this can be mocked)
  - By the little guy at the very top right of the page
- List of Pokémons on the main page (it must request the data form the PokéAPI)
  - Access using the circular black list button
- A way to filter the Pokémons (The filters should use the PokéAPI)
  - Type a pokemon's name or number, if valid, will reflect the listing
- Selection for the favorites Pokémons
- Allow the user to save the favorites (mocked on the browser's local storage)
- The API that should be used to get the data is PokéAPI(https://pokeapi.co/)

## 🔦 About

This monorepo is a scaffold for an Expo + Next.js + Tamagui + Solito app, with NX managing the pipe and Yarn the workspaces.

## 🗂 Folder overview

The main apps are:

- `expo` (react native)
- `next` (web)
- `nest` (server api)

- `packages` shared packages across apps
  - `ui` includes your custom UI kit that will be optimized by Tamagui
  - `app` you'll be importing most files from `app/`
    - `features` (better than a `screens` folder)
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)
  - `shared` contain types for every app, and hooks for web and native

## 🏁 Start the repo

- Install dependencies: `yarn`

- Nest local APIs dev: `yarn server`

- Next.js local dev: `yarn web`

To run with optimizer on in dev mode (just for testing, it's faster to leave it off): `yarn web:extract`. To build for production `yarn web:prod`.

To see debug output to verify the compiler, add `// debug` as a comment to the top of any file.

- Expo local dev: `yarn native`

## UI Kit

Following the [design systems guide](https://tamagui.dev/docs/guides/design-systems) and creating our own package for components.

See `packages/ui` named `@my/ui` for how this works.
