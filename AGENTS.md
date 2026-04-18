<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:antd rules -->

## Ant Design

Read https://ant.design/llms-full.txt and understand Ant Design components. Use this knowledge when writing code with Ant Design.

<!-- END:antd rules -->

<!-- BEGIN:Project rules -->

## Intention

The intention of this project is replicate the functionality and design of the website https://brincoxpress.com/

## API

The API for this project is documented in the `api.scalar.json` file. Use it to understand the API and how to use it.

For the moment the dev API url is `https://api.task.envialo.brinxpress.com`. Make calls to this API using the api.scalar.json endpoints to analyze the responses and understand the API when the situation is not clear.

## Project structure

The project is structured in the following way:

- `src/app`: Contains the Next.js pages (App Router).
- `src/common`: Contains the shared components.
- `src/constants`: Contains the constants.
- `src/context`: Contains the React context.
- `src/lib`: Contains the utility functions and API calls.
- `src/models`: Contains the data models.
- `src/types`: Contains the TypeScript types.

The components for each page are located in the component folder in every page folder except the commmon components.

## Cart

The cart is managed by the `CartContext`. In the car most be included product variants, not products.

<!-- END:Project rules -->

<!-- BEGIN:Config rules -->

## Package manager

Use `pnpm` instead of `npm`.

## WSL

To excecute linux commands use `wsl`. This is a windows environment, so you can't use linux commands directly.

## Git

Commits always in english.

Don't push to the remote repository if I don't ask you to do it. I will do it myself.

<!-- END:Config rules -->
