import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import ProfileContainer from '../containers/ProfileContainer';
import ReelsContainer from '../containers/ReelsContainer';

export default withRouter(({ setCurrentUser, userId, currentUser, history }) => {
  const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
      currentUser
        ? <Component {...rest} {...props} />
        : <Redirect to='/login' />
    )} />
  );  
// {...rest} looks at the rest of the properties in the provate route


  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' render={() => <Login history={history} setCurrentUser={setCurrentUser} />} />
      <Route path='/register' component={Register} />
      <PrivateRoute path='/profile' component={ProfileContainer} />
      <PrivateRoute path='/reels' component={ReelsContainer}  userId={userId}/>
    </Switch>
  );  
});

// the rest
