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
      <div className="page test simple-math">
        <form className="pure-form"
              onSubmit={ go }>
          <fieldset>
            <span>{ a }</span>
            <span>{ op }</span>
            <span>{ b }</span>
            <span>=</span>
            <input value={ answer }
                   onChange={ e => setAnswer(e.target.value) }
                   autoFocus={ true }/>
          </fieldset>
        </form>
        <button className="pure-button pure-button-primary"
                disabled={ !valid }
                onClick={ go }>
          Jatka
        </button>
      </div>
  )
}
