import { MongoClient, Db, Collection } from "mongodb"
import { ExamDocument, TestDocument } from "./types"


const { MONGODB_URI, MONGODB_DB } = process.env


export const client = new MongoClient(MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  w: "majority",
})


export let db: Db = null as unknown as Db
export let examsCollection: Collection<ExamDocument> = null as unknown as Collection<ExamDocument>
export let testsCollection: Collection<TestDocument> = null as unknown as Collection<TestDocument>


export const connect = (): Promise<void> => {
  return client.connect()
      .then(client => {
        db = client.db(MONGODB_DB)
        examsCollection = db.collection<ExamDocument>("exams")
        testsCollection = db.collection<TestDocument>("tests")
      })
      .catch(err => {
        console.error(`can't connect to db`, err)
        throw err
      })
}
