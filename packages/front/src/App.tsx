import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom"
import { POST } from "./api/comm"
import { hello } from "@ope/common"


console.log("hello:", hello())


const Home = () => {
  return (
      <h1>Home</h1>
  )
}


const Exam = () => {

  const { examId } = useParams()
  const [exam, setExam] = React.useState()

  React.useEffect(() => {
    POST("/api/exam/" + examId)
        .then(setExam)
        .catch(err => console.error(err))
  }, [examId])

  return (
      <div>
        <h1>Exam</h1>
        <h2>{ JSON.stringify(exam) }</h2>
      </div>
  )
}


const App = () => (
    <Router>
      <Switch>
        <Route path="/e/:examId">
          <Exam/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
)


export default App
