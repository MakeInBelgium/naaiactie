import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'

/**
 * Mapping of hostnames and their subdirectory of /html. Those subdirectories contain
 * the html per language.
 */
const DOMAIN_MAPPING = {
  'makefacemasks.com': '/html/en/',
  'maakjemondmasker.be': '/html/BE_nl/',
  'faitesvotremasquebuccal.be': '/html/BE_fr/',
  'mundschutznaehen.be': '/html/BE_de/',
}

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

/**
 * Assets paths (/assets, /images, /pdf) are passed through as is. All other paths will
 * be served from a subdirectory of /html.
 */
async function handleEvent(event) {
  const url = new URL(event.request.url)
  let options = {}

  // Assets path are just passed as is
  const assetPaths= ['/assets', '/images', '/pdf']
  const startsWith = assetPaths.findIndex(i => url.pathname.startsWith(i))

  // If it's not an assets & the hostname is in the DOMAIN_MAPPING the request
  // will be served from a subdirectory of /html
  if (startsWith === -1 && url.hostname in DOMAIN_MAPPING) {
    options.mapRequestToAsset = handleWebsitePath(DOMAIN_MAPPING[url.hostname])
  }

  //var n = str.startsWith("Hello");

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      }
    }
    return await getAssetFromKV(event, options)
  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
        })

        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
      } catch (e) {}
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}

/**
 * Maps content request to a subdirectory.
 */
function handleWebsitePath(prefix) {
  return request => {
    // compute the default (e.g. / -> index.html)
    let defaultAssetKey = mapRequestToAsset(request)
    let url = new URL(defaultAssetKey.url)
    url.pathname = prefix + url.pathname.slice(1)
    // inherit all other props from the default request
    return new Request(url.toString(), defaultAssetKey)
  }
}
