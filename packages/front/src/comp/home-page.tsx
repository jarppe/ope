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
      <div className="page home">
        <h1>Tervetuloa</h1>
        <form className="pure-form"
              onSubmit={ go }
              style={ { marginBottom: "1rem" } }>
          <fieldset>
            <legend>Anna harjoituksen numero jonka sait opettajaltasi</legend>
            <label htmlFor="exam-id"
                   style={ { paddingRight: "0.5rem" } }>
              Harjoituksen numero:
            </label>
            <input id="exam-id"
                   value={ examId }
                   onChange={ e => setExamId(e.target.value) }
                   placeholder="1234-5678-9012"/>
          </fieldset>
        </form>
        <button className="pure-button pure-button-primary"
                disabled={ !valid }
                onClick={ go }>
          Aloita
        </button>
      </div>
  )
}
