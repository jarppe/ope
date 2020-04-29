import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { HomePage } from "./comp/home-page"
import { ExamPage } from "./comp/exam-page"


const App = () => (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/e/:examId">
            <ExamPage/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    </div>
)


export default App
