import React, { FormEvent } from "react"
import { MultiTextQuestion } from "@ope/common"


const Answer = ({ answer, setAnswer, focus }: { answer: string, setAnswer: (v: string) => void, focus: boolean }) => {
  return (
      <div>
        <input value={ answer ?? "" }
               onChange={ e => setAnswer(e.target.value) }
               autoFocus={ focus }/>
      </div>
  )
}


const initArray = (count: number): string[] => {
  const a: string[] = []
  for (let v = 0; v < count; v++) {
    a.push("")
  }
  return a
}


export const MultiText = ({ question, done }: { question: MultiTextQuestion, done: (answer: string[]) => void }) => {
  const count = question.count
  const [answers, setAnswers] = React.useState<string[]>(() => initArray(count))
  const valid = answers.every(answer => answer && answer.length > 0)

  const setAnswer = (index: number) => (answer: string) => {
    setAnswers(answers => [
      ...answers.slice(0, index),
      answer,
      ...answers.slice(index + 1),
    ])
  }

  const go = (e: FormEvent) => {
    e.preventDefault()
    if (valid) {
      done(answers)
    }
  }

  return (
      <div>
        <form onSubmit={ go }>
          {
            answers.map((a, i) => <Answer key={ i }
                                          answer={ a }
                                          setAnswer={ setAnswer(i) }
                                          focus={ i === 0 }/>)
          }
          <button onClick={ go } disabled={ !valid }>
            Valmis
          </button>
        </form>
      </div>
  )
}
