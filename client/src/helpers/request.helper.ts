export const getRequestOptions = <T>(method: RequestMethod, body?: T) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify(body),
})

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const fetchJson = async <Props, Result>(
  url: string,
  method: RequestMethod,
  body?: Props,
): Promise<Result> => {
  try {
    const response = await fetch(url, getRequestOptions(method, body ?? null))
    const result = await response.json()

    return result.payload
  } catch (error) {
    console.error(error)
    throw error
  }
}
