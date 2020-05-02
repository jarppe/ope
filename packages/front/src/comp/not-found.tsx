import React from "react"
import { Link } from "react-router-dom"


export const NotFound = () => (
    <div className="page not-found">
      <h1>Sivua ei löydy</h1>
      <Link to="/">Etusivulle</Link>
    </div>
)
