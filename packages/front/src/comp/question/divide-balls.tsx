import React from "react"
import { DivideBallsQuestion } from "@ope/common"


export const DivideBalls = ({ question, done }: { question: DivideBallsQuestion, done: (answer: string[]) => void }) => {
  return (
      <div>
        <div>DivideBalls</div>
        { JSON.stringify(question) }
      </div>
  )
}
