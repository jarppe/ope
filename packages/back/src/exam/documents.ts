import { examsCollection } from "../db"
import * as createError from "http-errors"
import { ExamDocument } from "../types"


export const findExam = async (examId: string): Promise<ExamDocument> => {
  const exam = await examsCollection.findOne({ _id: examId })
  if (!exam) throw createError(404, `can't find exam with id "${ examId }"`)
  return exam
}
