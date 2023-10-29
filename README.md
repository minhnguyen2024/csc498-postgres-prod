# Remix Indie Stack


```sh
npx create-remix@latest --template remix-run/indie-stack
```


## Development

- Initial setup:

  ```sh
  npm run setup
  ```
- Build dev server:

```sh
  npm run build
  ```

- Start dev server:

```sh
  npm run dev
  ```

- Set up Prisma:
```sh
  npm install --save-dev prisma
  npm install @prisma/client
  ```

  
- Push Prisma Schema and run seed file:

```sh
  npx prisma db push
  npx prisma db seed
  ```

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates new users with some data you can use to get started:

- Email: `minhnguyen_2024`
- Password: `pass`


