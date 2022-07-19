## Configuration

### Step 1. Set up environment variables

Create `.env.local` file in this directory (which will be ignored by Git),
then set each variable on `.env.local`:

- `MONGODB_URI` should be the MongoDB connection string.
- `JWT_KEY` should be the key to sign and verify authentication token.

### Step 2. Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Alternatively, you can build and run your project locally:

```bash
npm run build
npm run start

# or

yarn build
yarn start
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000).
