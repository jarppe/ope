import * as Router from "koa-router"
import { examsCollection, testsCollection } from "./db"
import { fixture as examFixture } from "./exam/fixture"


export const router = new Router()
    .prefix("/dev")
    .post("/truncate", async ctx => {
      console.warn("DB truncate...")
      await examsCollection.deleteMany({})
      await testsCollection.deleteMany({})
      console.warn("DB truncated")
      ctx.status = 201
    })
    .post("/fixture", async ctx => {
      console.warn("DB Exam fixture...")

      await examsCollection.deleteMany({})
      await testsCollection.deleteMany({})

      await examFixture()

      console.warn("DB fixture done")
      ctx.status = 201
    })
    .get("/exam", async ctx => {
      ctx.body = await examsCollection.find({}).toArray()
    })
    .get("/exam/:examId", async ctx => {
      const exam = await examsCollection.findOne({ _id: ctx.params.examId})
      ctx.assert(exam, 404)
      ctx.body = exam
    })
    .get("/test", async ctx => {
      ctx.body = await testsCollection.find({}).toArray()
    })
    .get("/test/:testId", async ctx => {
      const test = await testsCollection.findOne({ _id: ctx.params.testId})
      ctx.assert(test, 404)
      ctx.body = test
    })
