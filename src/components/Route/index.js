import React from 'react'
import {
  Route as ReactRoute,
  Redirect,
} from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

const Route = ({component: Component, isPrivate = false, ...rest}) => {
  const { userInfo } = useAuth()

  return (
    <ReactRoute
      {...rest}
      render={({location}) => {
        return isPrivate === !!userInfo ? (
          <Component />
        ) : (
          <Redirect 
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: {from: location}
            }}
          />
        )
      }}
    />
  )
}

export default Route