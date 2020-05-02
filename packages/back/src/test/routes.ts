import * as Router from "koa-router"
import "koa-body"
import { Question, AnswerResponse, toAnswer } from "@ope/common"
import { findTest, applyTestAnswer  } from "./documents"


const toAnswerResponse = (next: Question | null | undefined): AnswerResponse => {
  return next ? { type: "ok", next: next } : { type: "done" }
}


export const router = new Router()
    .prefix("/test")
    .get("/:testId", async ctx => {
      const { testId } = ctx.params
      const test = await findTest(testId)
      const nextAnswer = test.answers.find(answer => answer.answer === null)
      ctx.body = toAnswerResponse(nextAnswer?.question)
    })
    .post("/:testId", async ctx => {
      const { testId } = ctx.params
      const { token, answer } = await toAnswer(ctx.request.body)
      const nextQuestion = await applyTestAnswer(testId, token, answer)
      ctx.body = toAnswerResponse(nextQuestion)
    })
