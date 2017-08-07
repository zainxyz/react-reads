/**
 * This file was taken from a gist written by me (Zain)
 * @module HTTP
 * @author Zain Abidi <https://github.com/zainxyz>
 * @see {@link https://gist.github.com/zainxyz/c2cf0ae5920db5a84a5d6e46b0632c79}
 */

/**
 * Generic Application Headers required for each API call.
 *
 * NOTE: The Accept and or Content-Type might be different for each HTTP call,
 * so please edit them out as per needs. We're currently assuming that everything
 * (the response and request payload) to the API will be in a JSON format.
 *
 * @type {Object}
 */
const APP_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
};

/**
 * Generic FETCH() method implementation.
 * It returns a promise which has the final
 * JSON after going through the .json() method.
 *
 * @param  {Object}  options         The options for the fetch call
 * @param  {string}  options.url    The URL to fetch from
 * @param  {Object}  options.config The defined config object with method, body, etc.
 * @return {Promise}
 */
const FETCH = ({ url, config, }) =>
  new Promise((resolve, reject) =>
    fetch(url, config)
    .then(resp =>
      resp.json()
      .then(json =>
        resolve(json)
      )
    )
    .catch(err =>
      reject(err)
    )
  );

/**
 * Build the config for all of the HTTP calls.
 * @param  {Object} options         The config options
 * @param  {Object} [options.body]  The body of the request
 * @param  {string} options.cache   The cache type
 * @param  {Object} options.headers The headers
 * @param  {string} options.method  The method GET, POST, PUT, etc.
 * @param  {string} options.mode    The fetch mode
 * @return {Object}                 The final config
 */
const buildConfig = ({ body = null, cache = 'default', headers, method, mode = 'cors', }) => ({
  body,
  cache,
  headers: {
    ...APP_HEADERS,
    ...headers,
  },
  method,
  mode,
});

/**
 * Simple GET() method.
 * Returns a FETCH() call which returns a promise
 *
 * @param  {Object}  options         The options for the GET fetch call
 * @param  {string}  options.url     The URL to GET
 * @param  {Object}  options.headers Any additional headers
 * @return {Promise}
 */
export const GET = ({ url, headers, }) =>
  FETCH({
    url,
    config: buildConfig({
      headers,
      method: 'GET',
    }),
  });

/**
 * Simple POST() method.
 * Returns a FETCH() call which returns a promise
 *
 * @param  {Object}  options         The options for the POST fetch call
 * @param  {string}  options.url     The URL to POST to
 * @param  {Object}  options.headers Any additional headers
 * @param  {Object}  options.body    The Body of the POST request
 * @return {Promise}
 */
export const POST = ({ url, headers, body, }) =>
  FETCH({
    url,
    config: buildConfig({
      body: JSON.stringify(body),
      headers,
      method: 'POST',
    }),
  });

/**
 * Simple PUT() method.
 * Returns a FETCH() call which returns a promise
 *
 * @param  {Object}  options         The options for the PUT fetch call
 * @param  {string}  options.url     The URL to PUT to
 * @param  {Object}  options.headers Any additional headers
 * @param  {Object}  options.body    The Body of the PUT request
 * @return {Promise}
 */
export const PUT = ({ url, headers, body, }) =>
  FETCH({
    url,
    config: buildConfig({
      body: JSON.stringify(body),
      headers,
      method: 'PUT',
    }),
  });

/**
 * Simple PATCH() method.
 * Returns a FETCH() call which returns a promise
 *
 * @param  {Object}  options         The options for the PATCH fetch call
 * @param  {string}  options.url     The URL to PATCH to
 * @param  {Object}  options.headers Any additional headers
 * @param  {Object}  options.body    The Body of the PATCH request
 * @return {Promise}
 */
export const PATCH = ({ url, headers, body, }) =>
  FETCH({
    url,
    config: buildConfig({
      body: JSON.stringify(body),
      headers,
      method: 'PATCH',
    }),
  });

/**
 * Simple DELETE() method.
 * Returns a FETCH() call which returns a promise
 *
 * @param  {Object}  options         The options for the DELETE fetch call
 * @param  {string}  options.url     The URL to DELETE to
 * @param  {Object}  options.headers Any additional headers
 * @return {Promise}
 */
export const DELETE = ({ url, headers, }) =>
  FETCH({
    url,
    config: buildConfig({
      headers,
      method: 'DELETE',
    }),
  });
