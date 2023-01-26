import fetch from 'node-fetch'

const endpoint = 'https://api.twitter.com/2/oauth2/token'

exports.handler = async function (event, context) {
  try {
    const method = event.httpMethod
    const contentType = event.headers['Content-Type']

    if (method !== 'POST') {
      throw Error('unsupported method')
    } else if (contentType !== 'application/x-www-form-urlencoded') {
      throw Error('unsupported content type')
    } else {
      const data = JSON.parse(event.body).payload.data
      const clientId = data.client_id
      const redirectUri = data.redirect_uri
      const grantType = data.grant_type
      const code = data.code
      const codeVerifier = data.code_verifier

      if (!clientId) {
        throw Error('invalid client id')
      } else if (!redirectUri) {
        throw Error('invalid redirect uri')
      } else if (!grantType) {
        throw Error('invalid grant type')
      } else if (!code) {
        throw Error('invalid code')
      } else if (!codeVerifier) {
        throw Error('invalid code verifier')
      } else {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: Object.entries({
            client_id: clientId,
            redirect_uri: redirectUri,
            grant_type: grantType,
            code: code,
            code_verifier: codeVerifier,
          }).map(([key, value]) => {
            const encodedKey = encodeURIComponent(key)
            const encodedValue = encodeURIComponent(value)
            return `${encodedKey}=${encodedValue}`
          }).join('&')
        })

        return {
          statusCode: response.status,
          headers: { "Access-Control-Allow-Origin": "*" },
          body: await response.text()
        }
      }
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: error.message
    }
  }
}