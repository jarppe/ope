import { MongoClient, Db, Collection } from "mongodb"
import { ExamDocument, TestDocument } from "./types"


const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, MONGODB_DB } = process.env
const uri = `mongodb://` +
    `${ encodeURIComponent(MONGODB_USER!) }:${ encodeURIComponent(MONGODB_PASSWORD!) }` +
    `@` +
    `${ MONGODB_HOST }:${ MONGODB_PORT }` +
    `/?authMechanism=DEFAULT`


export const client = new MongoClient(uri, {
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
        console.error(`can't connect to db at ${ MONGODB_HOST }:${ MONGODB_PORT }`, err)
        throw err
      })
}
