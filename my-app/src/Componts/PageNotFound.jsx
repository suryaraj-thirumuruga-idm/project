import React from 'react'
import { PageNotImage } from './OtherLinks'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div>
       <center>
      <Link to={'/'}> <img src={PageNotImage} alt="" /></Link>
       </center>
    </div>
  )
}
