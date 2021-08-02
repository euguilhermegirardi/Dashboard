import React, { useCallback } from 'react'
import {toast} from 'react-toastify'
import { createContext } from 'use-context-selector'

import useStorage from '../hooks/useStorage'

const AuthenticationContext = createContext({})

const AuthenticationProvider = ({children}) => {
  const { getStorage, setStorage, removeKeyStorage } = useStorage()

  const [user, setUser] = React.useState(() => {
    const userStorage = getStorage('user')

    if(userStorage) {
      const userParse = JSON.parse(userStorage)
      return userParse
    }

    return null
  })

  const handleSignIn = React.useCallback((email, password) => {
    const userInfo = {
      email,
      name: 'Guilherme  Girardi'
    }
    const userStorageJSON = JSON.stringify(userInfo)
    
    setStorage('user', userStorageJSON)
    setUser(userInfo)
  }, [setStorage])

  const handleSignOut = useCallback(() => {
    removeKeyStorage('user')
    setUser(null)
    toast.success('Logged out of the system')
  }, [removeKeyStorage])

  return (
    <AuthenticationContext.Provider
      value={{user, handleSignIn, handleSignOut}}
    >
      {children} 
    </AuthenticationContext.Provider>
  )
}

export {AuthenticationContext, AuthenticationProvider}