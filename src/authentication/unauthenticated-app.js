import * as React from 'react'

import {Input, Button, Spinner, FormGroup, ErrorMessage} from '../components/lib'
import {Modal, ModalContents, ModalOpenButton} from '../components/modal'
import {useAuth} from '../context/auth-context'

function LoginForm({onSubmit, submitButton}) {
  const {user} = useAuth()

  const error = {
    message: 'username or password is incorrect'
  }

  function handleSubmit(event) {
    event.preventDefault()
    const {username, password} = event.target.elements

    onSubmit({
      username: username.value,
      password: password.value
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup> 
      <div>
        {React.cloneElement(
          submitButton,
          {type: 'submit'},
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
        )}
      </div>
      {user === false ? <ErrorMessage error={error} /> : null}
    </form>
  )
}

function UnauthenticatedApp() {
  const {handleLogin, handleRegister, userRegister} = useAuth()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <h1>Dashboard_Exercise</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
        }}
      >
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={handleLogin}
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </Modal>
          <Modal>
            <ModalOpenButton>
              <Button variant="secondary">Register</Button>
            </ModalOpenButton>
            <ModalContents aria-label="Registration form" title="Register">
              <LoginForm
                onSubmit={handleRegister}
                submitButton={<Button variant="secondary">Register</Button>}
              />
            </ModalContents>
          </Modal>
      </div>
    </div>
  ) 
}

export default UnauthenticatedApp