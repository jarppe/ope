import { Question } from "@ope/common"


export interface ExamDocument {
  _id: string
  name: string
  questions: Partial<Question>[]
}


export interface AnswerData {
  question: Question
  started: number | null
  finished: number | null
  answer: string | null
}


export interface TestDocument {
  _id: string
  examId: string
  student: string | null
  started: number | null
  finished: number | null
  answers: AnswerData[]
}
