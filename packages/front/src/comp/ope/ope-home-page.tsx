import React from "react"
import { Link } from "react-router-dom"


export const OpeHomePage = () => {
  return (
      <div className="page ope-home">
        <h1>Ope home</h1>
        <ul>
          <li><Link to="/ope/e">Luo uusi harjoitus</Link></li>
        </ul>
      </div>
  )
}
