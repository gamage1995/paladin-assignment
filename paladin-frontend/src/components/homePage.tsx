import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { AppContext } from '../context/appContext'
import { getUserMovies, getNewToken, logout } from '../services/api'
import { useHistory } from "react-router-dom"
import { MovieParams } from '../types/common'
import styled from 'styled-components'

import Movie from './movie'

const FullHeightContainer = styled(Container)`
  height : 100vh;
`
const FullHeightRow = styled(Row)`
  height : 100vh;
`
const MovieListCover = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  height : 100%;
`
function HomePage() {
  const history = useHistory()
  const context = useContext(AppContext)
  const [movies, setMovies] = useState<MovieParams[]>([])

  useEffect(() => {
    if (context?.token) {
      getMovies(context.token)
    } else {
      getAccessToken()
    }
  }, [])

  useEffect(() => {
    if (context?.token) {
      getMovies(context.token);
    }
  }, [context?.token])

  const getMovies = async (token: string) => {
    try {
      const response = await getUserMovies(token)
      setMovies(response.data.payload.movies)
    } catch (error) {
      if (error.response.status === 403) {
        getAccessToken();
      } else if (error.response.status === 401) {
        history.push('/login');
      }
    }
  }

  const getAccessToken = async () => {
    try {
      const response = await getNewToken()
      context?.setToken(response.data.payload.accessToken)
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/login');
      }
    }
  }

  const signout = async () => {
    try {
      await logout();
      history.replace('/login');
    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <FullHeightContainer fluid>
      <FullHeightRow>
        <Col lg={4} md={3} sm={2}></Col>
        <Col lg={4} md={6} sm={8} xs={12}>
          <MovieListCover>
            <h5>Movie List</h5>
            {
              movies.length === 0 ?
                <h6>No movies to show</h6>
                :
                movies.map((movie, key) => {
                  return <Movie key={key}  name={movie.name} rating={movie.rating} />
                })
            }
            <Button variant="primary" type="submit" onClick={() => signout()}>
              Logout
            </Button>
          </MovieListCover>
        </Col>
        <Col lg={4} md={3} sm={2}></Col>
      </FullHeightRow>
    </FullHeightContainer>
  )
}

export default HomePage
