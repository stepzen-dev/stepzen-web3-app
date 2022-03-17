async function fetchAPI(url, header, query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' }

    headers[
      'Authorization'
    ] = `Apikey ${header}`

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    return json
  }
  return json
}

export async function getProviders(url, header, query, variables) {

  const data = await fetchAPI(
    url,
    header,
    query,
    variables
  )

  return data
}