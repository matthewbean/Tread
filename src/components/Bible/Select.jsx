import React from 'react'
import Books from './Books'
import Chapters from './Chapters'
import Container from '@material-ui/core/Container'
export default function Select(props) {
    

    return (
      <Container>
        <div className = 'select'>
          <Books></Books>
          <Chapters></Chapters>  
        </div>
        </Container>
    )
}
