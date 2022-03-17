export async function fetchAPI(url, header, query, { variables } = {}) {
  console.log(url, header, query, variables)
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