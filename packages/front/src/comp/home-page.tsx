import React, { FormEvent } from "react"
import { useHistory } from "react-router-dom"


export const HomePage = () => {

  const history = useHistory()
  const [examId, setExamId] = React.useState<string>("")
  const valid = /\d{4}-\d{4}-\d{4}/.test(examId)


  const go = (e: FormEvent) => {
    e.preventDefault()
    if (valid) {
      history.push("/e/" + examId)
    }
  }


  return (
      <div>
        <h1>Tervetuloa</h1>
        <form onSubmit={ go }>
          <label>Harjoituksen numero:</label>
          <input value={ examId }
                 onChange={ e => setExamId(e.target.value) }/>
          <button disabled={ !valid }
                  onClick={ go }>
            Aloita
          </button>
        </form>
      </div>
  )
}
