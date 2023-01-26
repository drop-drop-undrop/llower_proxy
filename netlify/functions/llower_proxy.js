import fetch from 'node-fetch'

const ENDPOINT = 'https://api.twitter.com/2/oauth2/token'

exports.handler = async function (event, context) {
  try {
    const method = event.httpMethod
    const contentType = event.headers['content-type']

    if (method !== 'POST') {
      throw Error('unsupported method')
    } else if (contentType !== 'application/x-www-form-urlencoded') {
      throw Error('unsupported content type')
    } else {
      const response = await fetch(ENDPOINT, {
        method: method,
        headers: { 'content-type': contentType },
        body: event.body
      })

      return {
        statusCode: response.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: await response.text()
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