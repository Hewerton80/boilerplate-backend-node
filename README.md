This is a Node js backend boilerplate.

## Getting Started

Run the development server:

```bash
yarn dev
```

## Create the database

Run the following command to create your database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```bash
npx prisma migrate dev --name init
```

Once you've updated your data model, you can execute the changes against your database with the following command:

```bash
npx prisma migrate
```
