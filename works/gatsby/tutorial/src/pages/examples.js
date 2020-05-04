import React from "react"
import HeaderJson from "../examples/Header"
import { graphql } from "gatsby"

const examples = (props) => {
  const { data } = props
  return (
    <div>
      <HeaderJson />
    </div>
  )
}

export const data = graphql`
  {
    site {
      info: siteMetadata {
        title
        description
        author
        data
        person {
          name
          age
        }
      }
    }
  }
`

export default examples
