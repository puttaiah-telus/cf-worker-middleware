import { handleRequest } from './handler'

// Just to validate telus private packages are retrived/used in worker
import createLocaleMiddleware from '@telus/next-locale-middleware'

//const middleware = createLocaleMiddleware()

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
