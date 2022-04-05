export async function fetchAPI(url, key, query, variables) {
  const headers = { 'Content-Type': 'application/json' }

  if (key) {
    headers[
      'Authorization'
    ] = `Apikey ${key}`
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables: variables
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    return json
  }
  return json
}

export const query = (endpoint) => {
  let query = ""
  // If no stepzen endpoint,
  // run mock endpoint query without keys.
  if(endpoint) {
    query = 
    `query DefaultProvider($address: String!, $etherscan_apikey: Secret!, $infura_app_id: Secret!, $moralis_apikey: Secret!) {
      moralis_erc20(
        address: $address
        moralis_apikey: $moralis_apikey
      ) {
        name
        symbol
        thumbnail
        balance
        decimals
        logo
      }
      moralis_nft(
        address: "0xd07dc4262BCDbf85190C01c996b4C06a461d2430"
        moralis_apikey: $moralis_apikey
        tokenId: "140082"
      ) {
        tokenId
        tokenUri
        tokenAddress
        syncedAt
        symbol
        name
        metadata
        contractType
        amount
      }
      infura_gas_price(infura_app_id: $infura_app_id) {
        id
        jsonrpc
        result
      }  
      etherscan_logs(
        etherscan_apikey: $etherscan_apikey
        fromBlock: "379224"
        address: "0x33990122638b9132ca29c723bdf037f1a891a70c"
        topic: "0xf63780e752c6a54a94fc52715dbc5518a3b4c3c2833d301a204226548a2a8545"
      ) {
        message
        status
        result {
          address
          blockNumber
          data
          gasPrice
          gasUsed
          logIndex
          timeStamp
          transactionHash
          transaction(
            etherscan_apikey: $etherscan_apikey
            action: "eth_getTransactionByHash"
            module: "proxy"
          ) {
            value
            v
            type
            transactionIndex
            to
            s
            r
            nonce
            maxPriorityFeePerGas
            maxFeePerGas
            input
            hash
            gas
            from
            chainId
            gasPrice
            blockNumber
            blockHash
          }
        }
      }
    }
  `
  } else {
    query = 
    `query DefaultProvider($address: String!) {
      etherscan_logs(
        fromBlock: "379224"
        address: "0x33990122638b9132ca29c723bdf037f1a891a70c"
        topic: "0xf63780e752c6a54a94fc52715dbc5518a3b4c3c2833d301a204226548a2a8545"
      ) {
        message
        status
        result {
          address
          blockNumber
          data
          gasPrice
          gasUsed
          logIndex
          timeStamp
          transactionHash
        }
      }
      infura_gas_price {
        id
        jsonrpc
        result
      }
      moralis_erc20(
        address: $address
      ) {
        name
        symbol
        thumbnail
        balance
        decimals
        logo
      }
      moralis_nft(
        address: $address
        tokenId: "22608"
      ) {
        tokenId
        tokenUri
        tokenAddress
        syncedAt
        symbol
        name
        metadata
        amount
      }
    }
    `
  }

  return query
}