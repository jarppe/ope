import * as Router from "koa-router"
import { Exam } from "@ope/common"
import { findExam } from "./documents"
import { ExamDocument } from "../types"
import { createTest } from "../test/documents"


const toExam = (exam: ExamDocument): Exam => ({
  examId: exam._id,
  name: exam.name,
  questionCount: exam.questions.length,
})


export const router = new Router()
    .prefix("/exam")
    .get("/:examId", async ctx => {
      const { examId } = ctx.params
      ctx.body = toExam(await findExam(examId))
    })
    .post("/:examId", async ctx => {
      const { examId } = ctx.params
      const { student } = ctx.request.body
      const test = await createTest(examId, student)
      ctx.body = { testId: test._id }
    })
