import { Question } from "@ope/common"


export interface ExamData {
  examId: string
  name: string
  questions: Partial<Question>[]
}


export interface AnswerData {
  question: Question
  started: number | null
  finished: number | null
  answer: string | null
}


export interface Test {
  testId: string
  examId: string
  student: string | null
  started: number | null
  finished: number | null
  answers: AnswerData[]
}
