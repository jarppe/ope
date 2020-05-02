import React from "react"
import { Question } from "@ope/common"
import { FillTemplate } from "./question/fill-template"
import { SimpleMath } from "./question/simple-math"
import { DivideBalls } from "./question/divide-balls"
import { MultiText } from "./question/multi-text"


interface QuestionProps {
  question: Question
  done: (answer: string[]) => void
}


export const QuestionView = ({ question, done }: QuestionProps) => {
  const { name, index, total } = question

  let c

  switch (question.type) {
    case "fillTemplate":
      c = <FillTemplate question={question}  done={done}/>
      break
    case "divideBalls":
      c = <DivideBalls question={question} done={done}/>
      break
    case "simpleMath":
      c = <SimpleMath question={question} done={done}/>
      break
    case "multiText":
      c = <MultiText question={question} done={done}/>
      break
  }

  return (
      <div className="page test question">
        <div>
          { name } ({ index + 1 } / { total })
        </div>
        { c }
      </div>
  )
}
