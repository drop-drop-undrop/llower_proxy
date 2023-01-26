import fetch from 'node-fetch'

exports.handler = async function (event, context) {
  try {
    console.log(event)

    // const response = await fetch(ENDPOINT, {
    //   method: event.httpMethod,
    //   headers: event.headers,
    //   body: event.body
    // })

    // return {
    //   statusCode: response.status,
    //   headers: { "Access-Control-Allow-Origin": "*" },
    //   body: await response.text()
    // }
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(event)
    } 
  } catch (error) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: error.message
    }
  }
}