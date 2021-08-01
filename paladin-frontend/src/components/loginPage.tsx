import React, { useState, useContext } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";

import { AppContext } from '../context/appContext';

import { login, register } from '../services/api'

import { FormStates } from '../types/common'

const FullHeightContainer = styled(Container)`
  height : 100vh;
`
const FullHeightRow = styled(Row)`
  height : 100vh;
`
const LoginWindowCover = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  height : 100%;
`
const LoginWindow = styled.div`
  disply : flex;
  flex-direction : row;
  padding : 20px;
  background : #e8e8e8;
  width : 100%;
  border-radius : 5px;
`
const SwitchFormText = styled.p`
  margin-top : 20px;
  text-decoration : underline;
  color : #f04a3e;
  cursor : pointer;
`

const validateEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function LoginPage() {
  const history = useHistory();

  const context = useContext(AppContext)
  const [formState, setFormState] = useState('Login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const signIn = async () => {
    if (signInInputsValid()) {
      try {
        const response = await login({ email, password })
        context?.setToken(response.data.payload.accessToken)
        history.push('/')
      } catch (error) {
        console.log(error.response)
      }
    }
  }

  const signUp = async () => {
    if (registerInputsValid()) {
      try {
        const response = await register({ email, password })
        context?.setToken(response.data.payload.accessToken)
        history.push('/')
      } catch (error) {
        console.log(error.response)
      }
    }
  }

  const signInInputsValid = () => {
    return (validateEmailRegex.test(email)
      && password.toString().trim() !== '')
  }

  const registerInputsValid = () => {
    return (validateEmailRegex.test(email)
      && password.toString().trim() !== ''
      && password.toString().trim() === confirmPassword.toString().trim())
  }

  return (
    <FullHeightContainer fluid>
      <FullHeightRow>
        <Col lg={4} md={3} sm={2}></Col>
        <Col lg={4} md={6} sm={8} xs={12}>
          <LoginWindowCover>
            <LoginWindow>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" />
                </Form.Group>

                {
                  formState === FormStates.Register &&
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Re-enter Password</Form.Label>
                    <Form.Control value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" placeholder="Re-enter Password" />
                  </Form.Group>
                }
              </Form>
              {
                formState === FormStates.Login ?
                  <React.Fragment>
                    <Button variant="primary" type="submit" onClick={() => signIn()}>
                      Login
                    </Button>
                    <SwitchFormText onClick={() => setFormState('Register')}>
                      Don't have an account ? Register
                    </SwitchFormText>
                  </React.Fragment> :
                  <React.Fragment>
                    <Button variant="primary" type="submit" onClick={() => signUp()}>
                      Register
                    </Button>
                    <SwitchFormText onClick={() => setFormState('Register')}>
                      Already have an account ? Login
                    </SwitchFormText>
                  </React.Fragment>
              }
            </LoginWindow>
          </LoginWindowCover>
        </Col>
        <Col lg={4} md={3} sm={2}></Col>
      </FullHeightRow>
    </FullHeightContainer>
  )
}

export default LoginPage
