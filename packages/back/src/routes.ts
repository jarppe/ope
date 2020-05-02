import * as Router from "koa-router"
import "koa-body"
import { router as examRouter } from "./exam/routes"
import { router as testRouter } from "./test/routes"
import { router as devRouter} from "./dev"


export const router = new Router()
    .prefix("/api")
    .post("/error", async ctx => {
      console.warn("UI error:", ctx.body)
    })
    .get("/ping", ctx => {
      ctx.body = { pong: 42 }
    })
    .use(examRouter.routes())
    .use(testRouter.routes())


if (process.env.NODE_ENV === "development") {
  router.use(devRouter.routes())
}
