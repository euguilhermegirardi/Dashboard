import * as React from 'react'
// import {toast} from 'react-toastify'

import {useStorage} from '../hooks/useStorage'

const AuthContext = React.createContext({})
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const { getStorage, setStorage, removeKeyStorage } = useStorage()

  const [user, setUser] = React.useState(() => {
    const userStorage = getStorage('user')

    if(userStorage) {
      const userParse = JSON.parse(userStorage)
      return userParse
    }

    return null
  })
  const [userCheck, setUserCheck] = React.useState(null)
  const [userRegister, setUserRegister] = React.useState(null)

  const handleLogin = React.useCallback((email) => {
    const user = {email}
    const registeredUser = JSON.parse(getStorage('user'))
    let verifyUser
   
    if(registeredUser) {
      if(
        registeredUser.email.username === user.email.username && 
        registeredUser.email.password === user.email.password
      ) {
        verifyUser = true
      }
    }

    if(registeredUser && verifyUser) {
      setUser(user)
      setUserCheck(true)
      // toast.success('Successfully logged in!')
    } else if(
      (!registeredUser && verifyUser) || 
      (registeredUser && !verifyUser) || 
      (!registeredUser && !verifyUser)
    ) {
      setUser(false)
      setUserCheck(false)
    }
  },[getStorage])

  const handleRegister = React.useCallback((email, password) => {
    const userInfo = {email, password}
    const userStorageJSON = JSON.stringify(userInfo)
    
    setStorage('user', userStorageJSON)
    setUserRegister(true)
  }, [setStorage])

  const handleSignOut = React.useCallback(() => {
    removeKeyStorage('user')
    setUser(null)
    setUserCheck(null)
    // toast.success('Logged out of the system')
  }, [removeKeyStorage])

  return (
    <AuthContext.Provider value={{
      user, 
      userCheck, 
      userRegister, 
      setUserRegister,
      handleLogin, 
      handleRegister, 
      handleSignOut
    }} {...props} />
  )
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if(context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export {AuthProvider, useAuth}