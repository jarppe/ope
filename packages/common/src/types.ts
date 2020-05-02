/**
 * Interface types
 */


import * as yup from "yup"


export interface Exam {
  examId: string
  name: string
  questionCount: number
}


export interface QuestionBase {
  name: string | null
  index: number
  total: number
  token: string
  type: string
}


export interface FillTemplateQuestion extends QuestionBase {
  type: "fillTemplate",
  template: string,
}


export interface DivideBallsQuestion extends QuestionBase {
  type: "divideBalls",
  start: number,
  balls: number
}


export interface SimpleMathQuestion extends QuestionBase {
  type: "simpleMath",
  a: number,
  op: "+" | "-" | "/" | "*"
  b: number,
}


export interface MultiTextQuestion extends QuestionBase {
  type: "multiText",
  count: number,
}

export type Question =
    FillTemplateQuestion |
    DivideBallsQuestion |
    SimpleMathQuestion |
    MultiTextQuestion


export const AnswerSchema = yup.object().shape({
  token: yup.string().nullable(false).required(),
  answer: yup.array(yup.string().nullable(false)).required(),
})


export type Answer = yup.InferType<typeof AnswerSchema>


// Validation in two steps because https://github.com/jquense/yup/issues/670
export const toAnswer = (data: any) => Promise.resolve(data)
    .then(data => AnswerSchema.validate(data, { stripUnknown: true, strict: false }))
    .then(data => AnswerSchema.validate(data, { stripUnknown: false, strict: true }))


export type AnswerResponse = Proceed | TestDone


export interface Proceed {
  type: "ok"
  next: Question
}


export interface TestDone {
  type: "done"
}
