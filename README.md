This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

If you do not have a StepZen account, the endpoint, `https://graphqlcf.stepzen.net/api/cfa9352aab44fe6cbf8bfd17d99807f6/__graphql` will provide mock data. 

### Generate StepZen Endpoint (optional)

First, run `stepzen start` in the stepzen folder. Copy the endpoint generated.

Sign Up for StepZen here, https://stepzen.com/signup.

Second, copy the `.env.sample` folder:

```
cp .env.sample .env
```

Add the generated stepzen endpoint and api key to the `.env` folder. 

Your key can be found at `https://stepzen.com/account`

```
STEPZEN_API_URL=https://youraccount.stepzen.net/api/web3/__graphql
STEPZEN_API_KEY=
```

And add the API keys to the Web3 default providers:

```bash
# https://etherscan.io/register
ETHERSCAN_API_KEY=
# https://admin.moralis.io/register
MORALIS_API_KEY=
# https://infura.io/register
INFURA_APP_ID=
```

### Run the NextJS App

Run the development server:

```bash
npm install
# or
yarn install
```

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
