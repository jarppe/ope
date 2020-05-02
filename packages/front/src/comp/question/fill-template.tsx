import React, { FormEvent } from "react"
import { FillTemplateQuestion } from "@ope/common"


export const FillTemplate = ({ question, done }: { question: FillTemplateQuestion, done: (answer: string[]) => void }) => {
  const [pre, post] = question.template.split(/_+/)
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
          <span>{ pre }</span>
          <input value={ answer }
                 onChange={ e => setAnswer(e.target.value) }
                 autoFocus={ true }/>
          <span>{ post }</span>
        </form>
      </div>
  )
}
