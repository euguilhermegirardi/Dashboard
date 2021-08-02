import {Switch, Route} from 'react-router-dom'

import SignIn from './SignIn'

const AuthenticationRoutes = () => {
  <Switch>
    <Route path="/" component={SignIn} />
  </Switch>
}

export default AuthenticationRoutes