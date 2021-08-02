import {Switch} from 'react-router-dom'

import Route from './components/Route'
import Authentication from './modules/Authentication'
import Dashboard from './modules/Dashboard'

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Authentication} />
      <Route path="/dashboard" component={Dashboard}  />
    </Switch>
  )
}

export default Routes