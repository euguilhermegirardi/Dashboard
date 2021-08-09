import * as React from 'react'
import {useAuth} from './context/auth-context'
import {FullPageSpinner} from './components/lib'

const UnauthenticatedApp = React.lazy(() => import('./authentication/unauthenticated-app'))
const AuthenticatedApp = React.lazy(() => import('./authentication/authenticated-app'))

function App() {
  const {user, userCheck} = useAuth()
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user || (!user && userCheck) ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export {App}
