import React, { FormEvent } from "react"
import { SimpleMathQuestion } from "@ope/common"


export const SimpleMath = ({ question, done }: { question: SimpleMathQuestion, done: (answer: string[]) => void }) => {
  const { a, op, b } = question
  const [answer, setAnswer] = React.useState<string>("")
  const valid = answer.length > 0

  const go = (e: FormEvent) => {
    e.preventDefault()
    if (valid) {
      done([answer])
    }
  }

  return (
      <div>
        <form onSubmit={ go }>
          <span>{ a }</span>
          <span>{ op }</span>
          <span>{ b }</span>
          <span>=</span>
          <input value={ answer }
                 onChange={ e => setAnswer(e.target.value) }
                 autoFocus={ true }/>
        </form>
      </div>
  )
}
