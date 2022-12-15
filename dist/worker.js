/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/handler.ts":
/*!************************!*\
  !*** ./src/handler.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


// import { createEdgeContext } from '@uniformdev/context-edge'
// import { createCloudflareProxyEdgeHandler } from '@uniformdev/context-edge-cloudflare'
// import { ManifestV2 } from '@uniformdev/context'
// import manifest from "./uniform/context-manifest.json";
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handleRequest = void 0;
// export async function handleRequest(request: Request): Promise<Response> {
//   //@ts-ignore
//   if (!ORIGIN_URL) {
//     console.error('ORIGIN_URL environment is not defined')
//     return new Response('Configuration Error', {
//       status: 500,
//     })
//   }
//   const handler = createCloudflareProxyEdgeHandler()
//   const context = createEdgeContext({
//     request,
//     manifest: manifest as ManifestV2,
//   })
//   const { response } = await handler({
//     context,
//     request,
//     //@ts-ignore
//     originUrl: new URL(`https://${ORIGIN_URL}`).origin,
//   })
//   return response
// }
async function handleRequest(request) {
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
exports.handleRequest = handleRequest;
/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
    // await sleep(5000);
    const { headers } = response;
    const contentType = headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        return JSON.stringify(await response.json());
    }
    else if (contentType.includes('application/text')) {
        return response.text();
    }
    else if (contentType.includes('text/html')) {
        return response.text();
    }
    else {
        return response.text();
    }
}
const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(milliseconds);
    });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const handler_1 = __webpack_require__(/*! ./handler */ "./src/handler.ts");
addEventListener('fetch', (event) => {
    event.respondWith((0, handler_1.handleRequest)(event.request));
});

})();

/******/ })()
;
//# sourceMappingURL=worker.js.map