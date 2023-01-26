import fetch from 'node-fetch'

exports.handler = async function (event, context) {
  try {
    const matcher = /.*llower_prox(y\/|y)/
    const address = event.path.replace(matcher, '')
    const url = new URL(address)
    delete event.headers.host
    delete event.multiValueHeaders.host

    const response = await fetch(url, {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body
    })

    return {
      statusCode: response.status,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: await response.text()
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: error.message.toLowerCase()
    }
  }
}