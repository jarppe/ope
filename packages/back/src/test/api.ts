import * as koa from "koa"
import * as Router from "koa-router"
import "koa-body"
import { Exam, Question, Answer, isAnswer, AnswerResponse } from "@ope/common"
import { ExamData } from "./types"
import * as db from "./db"


export const toExam = (exam: ExamData): Exam => ({
  examId: exam.examId,
  name: exam.name,
  questionCount: exam.questions.length,
})


const getExam = async (ctx: koa.Context) => {
  const { examId } = ctx.params
  const exam = await db.getExam(examId)
  ctx.body = toExam(exam)
}


const createTest = async (ctx: koa.Context) => {
  const { examId } = ctx.params
  const testId = await db.createTest(examId)
  ctx.body = { testId }
}


const toQuestion = (): Question => {
  // FIXME
  return null as unknown as Question
}


const toAnswerResponse = (next: Question | null): AnswerResponse => {
  return next ? { type: "ok", next: next } : { type: "done" }
}

const startTest = async (ctx: koa.Context) => {
  const { testId } = ctx.params
  const { student } = ctx.request.body
  const test = await db.setTestStudent(testId, student)
  ctx.body = toAnswerResponse(toQuestion(/* TODO */))
}


const applyAnswer = async (ctx: koa.Context) => {
  const { testId } = ctx.params
  const { index, token, answer } = await isAnswer(ctx.request.body)
  const test = await db.applyTestAnswer(testId, index, token, answer)
  ctx.body = toAnswerResponse(toQuestion(/* TODO */))
}


export const router = new Router()
    .use(new Router()
        .prefix("/exam")
        .get("/:examId", getExam)
        .post("/:examId", createTest)
        .routes())
    .use(new Router()
        .prefix("/test")
        .post("/:testId/start", startTest)
        .post("/:testId/answer", applyAnswer)
        .routes())
