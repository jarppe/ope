const contentTypeApplicationJson = "application/json"


const headers = {
  "Content-Type": contentTypeApplicationJson,
  "Accept": contentTypeApplicationJson,
}


export const request = async <T>(method: string, url: string, data?: any): Promise<T> => {
  return fetch(url, {
    method,
    credentials: "include",
    body: data ? JSON.stringify(data) : undefined,
    headers,
  }).then(resp => {
    if (!resp.ok) {
      throw new Error(`unexpected response status from ${ method } ${ url }: ${ resp.statusText }`)
    }
    if (!resp.headers.get("content-type")?.startsWith("application/json")) {
      throw new Error(`unexpected Content-Type from ${ method } ${ url }: ${ resp.headers.get("content-type") }`)
    }
    return resp.json()
  }).catch(err => {
    console.error(`error on ${ method } ${ url }`, url, err)
    throw err
  })
}


export const GET = <T>(url: string): Promise<T> => request<T>("GET", url)
export const POST = <T>(url: string, data?: any): Promise<T> => request<T>("POST", url, data)
