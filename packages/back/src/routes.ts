import * as Router from "koa-router"
import "koa-body"


export const router = new Router()
    .prefix("/api")
    .get("/hello", async (ctx) => {
      ctx.body = { message: "Hullo" }
    })
    .post("/exam/:exam", async (ctx) => {
      const exam = ctx.params.exam
      ctx.body = { exam }
    })
