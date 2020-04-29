import React from "react"
import { Exam } from "@ope/common"


interface ExamProps {
  exam: Exam,
}


/*
const StudentName = ({ setStudent }: { setStudent: (student: string) => void }) => {

  const [state, setState] = React.useState<string>("")

  return (
      <div className="student-name">
        <form onSubmit={ _ => setStudent(state) }>
          <label>Nimesi:</label>
          <input value={ state } onChange={ e => setState(e.target.value) }/>
        </form>
      </div>
  )
}
*/


export const ExamView = ({ exam }: ExamProps) => {
  return (
      <div className="exam">
        <h1>Exam</h1>
        <h2>{ exam.name }</h2>
      </div>
  )
}
