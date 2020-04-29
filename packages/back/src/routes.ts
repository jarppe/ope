import * as Router from "koa-router"
import "koa-body"
import { router as testRouter } from "./test/api"


export const router = new Router()
    .prefix("/api")
    .post("/error", async ctx => {
      console.warn("UI error:", ctx.body)
    })
    .get("/ping", ctx => {
      ctx.body = { pong: 42 }
    })
    .use(testRouter.routes())
