import React, { FormEvent } from "react"
import { useParams, useHistory } from "react-router-dom"
import { Exam } from "@ope/common"
import { GET, POST } from "../comm"


const Loading = () => (
    <div className="page exam loading">
      <h2>Odota, harjoitusta ladataan...</h2>
    </div>
)


const NotFound = () => (
    <div className="page exam fail">
      <h2>Hmmm, harjoitusta ei löydy</h2>
    </div>
)


export const ExamPage = () => {

  const history = useHistory()
  const { examId } = useParams()
  const [exam, setExam] = React.useState<Exam | "loading" | "fail">("loading")
  const [student, setStudent] = React.useState<string>("")
  const valid = student.length > 1


  React.useEffect(() => {
    GET<Exam>("/api/exam/" + examId)
        .then(setExam)
        .catch(err => {
          console.error(err)
          setExam("fail")
        })
  }, [examId])


  const go = (e: FormEvent) => {
    e.preventDefault()
    if (valid) {
      POST<{ testId: string }>(`/api/exam/${ examId }`, { student })
          .then(resp => {
            history.push(`/t/${ resp.testId }`)
          })
    }
  }

  if (exam === "loading") return <Loading/>
  if (exam === "fail") return <NotFound/>

  return (
      <div className="page exam">
        <h1>Tervetuloa</h1>
        <form onSubmit={ go }>
          <label>Anna nimesi:</label>
          <input value={ student }
                 onChange={ e => setStudent(e.target.value) }
                 placeholder="Oma nimesi"
                 autoFocus={ true }/>
          <button disabled={ !valid }
                  onClick={ go }>
            Aloita
          </button>
        </form>
      </div>
  )

}
