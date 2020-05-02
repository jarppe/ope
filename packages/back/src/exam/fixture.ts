import { examsCollection } from "../db"
import { ExamDocument } from "../types"
import { InsertWriteOpResult } from "mongodb"


export const fixture = (): Promise<InsertWriteOpResult<ExamDocument>> => {
  return examsCollection.insertMany([
    {
      _id: "1111-1111-1111",
      name: "Open eka harjoitus",
      questions: [
        {
          name: "Täytä puuttuva sana",
          type: "fillTemplate",
          template: "Kristiina on _ ope"
        },
        {
          name: "Laske luvut yhteen",
          type: "simpleMath",
          a: 14,
          op: "+",
          b: 25,
        },
        {
          name: "Anna kolme substantiivia",
          type: "multiText",
          count: 3
        },
      ]
    }
  ])
}
