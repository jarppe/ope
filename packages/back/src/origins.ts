import { URL } from "url"
import * as Koa from "koa"
import * as assert from "http-assert"


const validOrigins = new Set((process.env.ALLOWED_ORIGINS ?? "localhost").split(/\s*,\s*/))


export const validateRequest = async (ctx: Koa.Context, next: Koa.Next) => {
  const origin = ctx.request.get("origin")
  if (origin) {
    const hostname = new URL(origin).hostname
    assert(validOrigins.has(hostname), 400, "Illegal origin")
  }
  await next()
}
