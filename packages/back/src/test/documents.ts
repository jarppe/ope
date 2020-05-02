import * as createError from "http-errors"
import { AnswerResponse, Question } from "@ope/common"
import { ExamDocument, TestDocument, AnswerData } from "../types"
import { generateKey } from "../id"
import { findExam } from "../exam/documents"
import { testsCollection } from "../db"


const makeAnswer = (total: number) => async (question: Partial<Question>, index: number): Promise<AnswerData> => {
  const token = await generateKey()
  return {
    question: {
      ...question,
      index,
      total,
      token,
    } as Question,
    started: null,
    finished: null,
    answer: null,
  }
}


export const createTest = async (examId: string, student: string): Promise<TestDocument> => {
  const exam = await findExam(examId)
  const testId = await generateKey()
  const totalQuestions = exam.questions.length
  const answers = await Promise.all(exam.questions.map(makeAnswer(totalQuestions)))
  const started = Date.now()
  answers[0].started = started
  const test = {
    _id: testId,
    examId: exam._id,
    student,
    started,
    finished: null,
    answers,
  }
  return testsCollection.insertOne(test).then(_ => test)
}


export const findTest = async (testId: string): Promise<TestDocument> => {
  const test = await testsCollection.findOne({ _id: testId })
  if (!test) throw createError(404, `Unknown test: "${ testId }"`)
  return test
}


export const applyTestAnswer = async (testId: string, token: string, studentAnswer: string[]): Promise<Question | null> => {
  const test = await findTest(testId)
  const answers = test.answers
  const index = answers.findIndex(answer => answer.finished === null)
  const currentAnswer = answers[index]

  if (currentAnswer.question.token !== token) throw createError(404, `token mismatch`)

  const now = Date.now()
  const nextIndex = index + 1
  const hasNext = nextIndex < answers.length

  const updates = {
    [`answers.${ index }.answer`]: studentAnswer,
    [`answers.${ index }.finished`]: now,
  }

  if (hasNext) {
    updates[`answers.${ nextIndex }.started`] = now
  } else {
    updates["finished"] = now
  }

  const { result } = await testsCollection.updateOne({ _id: testId }, { $set: updates })
  if (result.n !== 1) throw createError(500, "unexpected")

  return hasNext ? answers[nextIndex].question : null
}
