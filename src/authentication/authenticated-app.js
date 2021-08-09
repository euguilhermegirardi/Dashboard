import * as React from 'react'
import {Switch, Route, Link} from 'react-router-dom'

import {useAuth} from '../context/auth-context'
import {Button, ErrorMessage, FullPageErrorFallback} from '../components/lib'
import {Home} from '../views/Home'
import {Dashboard} from '../views/Dashboard'
import {TodoPage} from '../views/TodoPage'
import {Discover} from '../views/Discover'
import {NotFoundScreen} from '../views/NotFoundScreen'
import * as mq from '../styles/media-queries'
import * as colors from '../styles/colors'

function AuthenticatedApp() {
  const {user, handleSignOut} = useAuth()
  const userName = user.email.username

  return (
    <>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      > 
        {userName}
          <Button 
            variant="secondary" 
            css={{marginLeft: '10px'}} 
            onClick={handleSignOut}
          >
            Logout
          </Button>
      </div>

      <div
          css={{
            margin: '0 auto',
            padding: '4em 2em',
            maxWidth: '840px',
            width: '100%',
            display: 'grid',
            gridGap: '1em',
            gridTemplateColumns: '1fr 3fr',
            [mq.small]: {
              gridTemplateColumns: '1fr',
              gridTemplateRows: 'auto',
              width: '100%',
            },
          }}
        >
          <div css={{position: 'relative'}}>
            <Nav />
          </div>
          <main css={{width: '100%'}}>
            <AppRoutes />
          </main>
        </div>
      </>
  )
}

function Nav(params) {
  return (
    <nav
      css={{
        position: 'sticky',
        top: '4px',
        padding: '1em 1.5em',
        border: `1px solid ${colors.gray10}`,
        borderRadius: '3px',
        [mq.small]: {
          position: 'static',
          top: 'auto',
        },
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
        }}
      >
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/todopage">Todo Page</Link>
        </li>
        <li>
          <Link to="/discover">Discover</Link>
        </li>
      </ul>
    </nav>
  )
}

function AppRoutes() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/todopage" component={TodoPage} />
      <Route path="/discover" component={Discover} />
      <Route path="/" component={Home} />
      <Route path="*" component={NotFoundScreen} />
    </Switch>
  )
}

export default AuthenticatedApp