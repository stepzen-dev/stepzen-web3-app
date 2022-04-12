# StepZen Web3 Starter Application

## Introduction

Start your journey into web3 today by using this StepZen Web3 Starter Application, that uses GraphQL-ized web3 APIs from different web3 Data Providers. Learn more about the technology behind this example in [this blog post](https://stepzen.com/blog/building-web3-applications-with-graphql-and-stepzen), or visit [StepZen GraphQL Studio](https://graphql.stepzen.com/etherscan,infura,moralis) to explore the web3 APIs used in this repository.

## Getting Started

If you do not have a StepZen account, the endpoint, `https://graphqlcf.stepzen.net/api/cfa9352aab44fe6cbf8bfd17d99807f6/__graphql` will provide mock data. This endpoint is created [StepZen GraphQL Studio](https://graphql.stepzen.com/etherscan,infura,moralis) using the web3 APIs from Etherscan, Infura and Moralis. 

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
STEPZEN_API_URL=https://<YOUR_ACCOUNT>.stepzen.net/api/web3/__graphql
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

To learn more about StepZen, take a look at the following resources:

- [StepZen Documentation](https://stepzen/docs) - learn about StepZen features and APIs.
- [StepZen GraphQL Studio](https://graphql.stepzen.com/etherscan,infura,moralis)

You can check out [the StepZen Examples GitHub repository](https://github.com/stepzen-dev/examples) - your feedback and contributions are welcome!
