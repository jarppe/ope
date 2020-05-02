import React from "react"
import { AnswerResponse } from "@ope/common"
import { GET, POST } from "../comm"
import { useParams } from "react-router-dom"
import { QuestionView } from "./question"


const Loading = () => (
    <div className="page test loading">
      <h2>Odota, harjoitusta ladataan...</h2>
    </div>
)


const Done = () => (
    <div className="page test done">
      <h2>Kiitos, testi on valmis</h2>
    </div>
)


export const TestPage = () => {

  const { testId } = useParams()
  const [response, setResponse] = React.useState<AnswerResponse | "loading">("loading")


  React.useEffect(() => {
    GET<AnswerResponse>(`/api/test/${ testId }`).then(setResponse)
  }, [testId])


  const done = (token: string) => (answer: string[]) => {
    POST<AnswerResponse>(`/api/test/${ testId }`, { token, answer }).then(setResponse)
  }

  if (response === "loading") return <Loading/>
  if (response.type === "done") return <Done/>
  const question = response.next
  return <QuestionView question={ question } done={ done(question.token) }/>

}
