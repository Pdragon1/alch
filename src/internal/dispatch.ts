import { Alchemy } from '../api/alchemy';
import { sendAxiosRequest } from '../util/sendRest';
import { logger } from '../util/util';
import { ExponentialBackoff } from './backoff';
import axios, { AxiosError } from 'axios';

/**
 * A wrapper function to make http requests and retry if the request fails.
 *
 * @param alchemy
 * @param method
 * @param params
 * @internal
 */
// TODO: Wrap Axios error in AlchemyError.
export async function requestHttpWithBackoff<Req, Res>(
  alchemy: Alchemy,
  method: string,
  params: Req
): Promise<Res> {
  let lastError: Error | undefined = undefined;
  const backoff = new ExponentialBackoff(alchemy.maxAttempts);
  for (let attempt = 0; attempt < alchemy.maxAttempts + 1; attempt++) {
    try {
      if (lastError !== undefined) {
        logger('requestHttp', `Retrying after error: ${lastError.message}`);
      }

      try {
        await backoff.backoff();
      } catch (err) {
        // Backoff errors when the maximum number of attempts is reached. Break
        // out of the loop to preserve the last error.
        break;
      }
      const response = await sendAxiosRequest<Req, Res>(
        alchemy._getBaseUrl(),
        method,
        params
      );

      if (response.status === 200) {
        logger(method, `Successful request: ${method}`);
        return response.data;
      } else {
        logger(
          method,
          `Request failed: ${method}, ${response.status}, ${response.data}`
        );
        lastError = new Error(response.status + ': ' + response.data);
      }
    } catch (err) {
      if (!axios.isAxiosError(err) || err.response === undefined) {
        throw err;
      }
      // TODO: Standardize all errors into AlchemyError
      lastError = new Error(
        err.response.status + ': ' + err.response.data.message
      );
      if (!isRetryableHttpError(err)) {
        break;
      }
    }
  }
  return Promise.reject(lastError);
}

function isRetryableHttpError(err: AxiosError): boolean {
  const retryableCodes = [429];
  return (
    err.response !== undefined && retryableCodes.includes(err.response.status)
  );
}

/**
 * Fetches all pages in a paginated endpoint, given a `pageKey` field that
 * represents the property name containing the next page token.
 *
 * @internal
 */
export async function* paginateEndpoint<
  ReqPageKey extends string,
  ResPageKey extends string,
  Req extends Partial<Record<string, any> & Record<ReqPageKey, string>>,
  Res extends Partial<Record<string, any> & Record<ResPageKey, string>>
>(
  alchemy: Alchemy,
  methodName: string,
  reqPageKey: ReqPageKey,
  resPageKey: ResPageKey,
  params: Req
): AsyncIterable<Res> {
  let hasNext = true;
  const requestParams = { ...params };
  while (hasNext) {
    const response = await requestHttpWithBackoff<Req, Res>(
      alchemy,
      methodName,
      requestParams
    );
    yield response;
    if (response[resPageKey] !== undefined) {
      requestParams[reqPageKey] = response[resPageKey] as any;
    } else {
      hasNext = false;
    }
  }
}
