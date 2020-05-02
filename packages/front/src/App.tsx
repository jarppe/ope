import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { HomePage } from "./comp/home-page"
import { ExamPage } from "./comp/exam-page"
import { TestPage } from "./comp/test-page"
import { NotFound } from "./comp/not-found"
import { OpeHomePage } from "./comp/ope/ope-home-page"


const App = () => (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/e/:examId">
            <ExamPage/>
          </Route>
          <Route path="/t/:testId">
            <TestPage/>
          </Route>
          <Route path="/ope" exact={true}>
            <OpeHomePage/>
          </Route>
          <Route path="/" exact={true}>
            <HomePage/>
          </Route>
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </div>
)


export default App
