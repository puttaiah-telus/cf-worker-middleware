

export async function handleRequest(request: Request): Promise<Response> {
   //@ts-ignore
  // if (!ORIGIN_URL) {
  //   console.error('ORIGIN_URL environment is not defined')
  //   return new Response('Configuration Error', {
  //     status: 500,
  //   })
  // }
  // const url1 = `https://${ORIGIN_URL}/todos/1`;
  // const url2 = `https://${ORIGIN_URL}/posts/1`;
  const url1 = `https://jsonplaceholder.typicode.com/todos/1`;
  const url2 = `https://jsonplaceholder.typicode.com/posts/1`;
  const init = {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  };
  const responses = await Promise.all([fetch(url1, init), fetch(url2, init)]);
  const results = await Promise.all([gatherResponse(responses[0]), gatherResponse(responses[1])]);
  return new Response(results.join(), init);
}

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response: any) {
  // await sleep(5000);
  const { headers } = response;
  const contentType = headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return JSON.stringify(await response.json());
  } else if (contentType.includes('application/text')) {
    return response.text();
  } else if (contentType.includes('text/html')) {
    return response.text();
  } else {
    return response.text();
  }
}

const sleep = async (milliseconds: any) => {
    await new Promise(resolve => {
        return setTimeout(milliseconds)
    });
};
