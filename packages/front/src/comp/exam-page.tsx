import React from "react"
import { useParams } from "react-router-dom"
import { Exam } from "@ope/common"
import { POST } from "../api/comm"
import { ExamView } from "./exam-view"


const Loading = () => (
    <div className="view exam loading">
      <h2>Odota, harjoitusta ladataan...</h2>
    </div>
)


const NotFound = () => (
    <div className="view exam fail">
      <h2>Hmmm, harjoitusta ei löydy</h2>
    </div>
)


export const ExamPage = () => {

  const { examId } = useParams()
  const [exam, setExam] = React.useState<Exam | "loading" | "fail">("loading")

  React.useEffect(() => {
    POST<Exam>("/api/exam/" + examId)
        .then(setExam)
        .catch(err => {
          console.error(err)
          setExam("fail")
        })
  }, [examId])

  if (exam === "loading") return <Loading/>
  if (exam === "fail") return <NotFound/>
  return <ExamView exam={ exam }/>

}
