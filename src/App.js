import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'

import Home from './components/home'

import Login from './components/login'

import Profile from './components/userprofile'
class App extends Component {

  render(){
    return(
      <div>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    )
  }


}

export default App