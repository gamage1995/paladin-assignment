import React from 'react'
import {MovieParams} from '../types/common'
import styled from 'styled-components'

const MovieListItem = styled.div`
  display : flex;
  flex-direction : column;
  width : 100%;
  background : #d4d4d4;
  margin-bottom : 20px;
  padding : 10px;
`
function Movie(props : MovieParams) {
  return (
    <MovieListItem>
      <h5>{`Movie Name : ${props.name}`}</h5>
      <h6>{`Rating : ${props.rating}`}</h6>
    </MovieListItem>
  )
}

export default Movie
