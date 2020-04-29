import * as createError from "http-errors"
import { AnswerResponse, Question } from "@ope/common"
import { ExamData, Test, AnswerData } from "./types"
import { generateKey } from "../id"


const exams: ExamData[] = [
  {
    examId: "1111-2222-3333",
    name: "Open eka harjoitus",
    questions: [
      {
        name: "Täytä puuttuva sana",
        type: "fillTemplate",
        template: "Omena on _",
      },
      {
        name: "Laske luvut yhteen",
        type: "simpleMath",
        a: 4,
        op: "+",
        b: 5,
      },
    ],
  },
]


const examDb = new Map<string, ExamData>(exams.map(e => [e.examId, e]))
const testDb = new Map<string, Test>()


export const getExam = async (examId: string): Promise<ExamData> => {
  const exam = examDb.get(examId)
  if (!exam) throw createError(404, `Unknown exam: "${ examId }"`)
  return exam
}


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

export const createTest = async (examId: string): Promise<string> => {
  const exam = await getExam(examId)
  const testId = await generateKey()
  const totalQuestions = exam.questions.length
  testDb.set(testId, {
    testId,
    examId: examId,
    student: null,
    started: Date.now(),
    finished: null,
    answers: await Promise.all(exam.questions.map(makeAnswer(totalQuestions))),
  })
  return testId
}


export const getTest = async (testId: string): Promise<Test> => {
  const test = testDb.get(testId)
  if (!test) throw createError(404, `Unknown test: "${ testId }"`)
  return test
}


export const setTestStudent = async (testId: string, student: string): Promise<Test> => {
  const test = await getTest(testId)
  if (test.student !== null) throw createError(400, "student already set")
  test.student = student
  return test
}


export const applyTestAnswer = async (testId: string, index: number, token: string, answer: string): Promise<Test> => {
  const test = await getTest(testId)
  return test
  // if (!test.student) throw createError(400, "student not set")
  // const activeAnswer = test.answers.find(answer => !answer.finished)
  // if (!activeAnswer) throw createError(400, "test already completed")
  // activeAnswer.attempts++
  // if (answer !== activeAnswer.expected) {
  //   return {
  //     type: "fail"
  //   }
  // }
  // activeAnswer.finished = Date.now()
  // if (activeAnswer.testNumber === test.answers.length) {
  //   return {
  //     type: "done"
  //   }
  // }
  // return {
  //   type: "ok",
  //   next: test.
  // }
}


