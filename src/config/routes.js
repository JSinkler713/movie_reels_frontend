import React, {useContext, Component} from 'react';
import {UserContext} from '../UserContext'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Home from '../components/Home/Home';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import ProfileContainer from '../containers/ProfileContainer';
import ReelsContainer from '../containers/ReelsContainer';
import Reel from '../components/Reels/Reel';

/* export default withRouter(({ fetchReels, arrayOfReels, setCurrentUser, userId, reelId, moviesOfReelSelected, fetchMovies, currentUser, username, email, history }) => {
  const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
      currentUser
        ? <Component {...rest} {...props} />
        : <Redirect to='/login' />
    )} />
  );  */ 
// {...rest} looks at the rest of the properties in the private route
export default withRouter(()=> {
  const [user, setUser] = useContext(UserContext)
  const PrivateRoute = ({component: Component, ...rest})=>(
    <Route {...rest} render={(props)=> (
      user.currentUser
      ? <Component {...rest} {...props} />
      : <Redirect to='/login' />
    )} />
  )
  return (
    <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/login' render={(props) => <Login />} />
    <Route path='/register' component={Register} />
    <PrivateRoute path='/profile' component={ProfileContainer} />
    <PrivateRoute exact path='/reels/:id' component={Reel} /> 
    <PrivateRoute exact path='/reels'  component={ReelsContainer}  />
  </Switch> 
  )
});
/* 
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' render={() => <Login history={history} setCurrentUser={setCurrentUser} />} />
      <Route path='/register' component={Register} />
      <PrivateRoute path='/profile' component={ProfileContainer} />
      <PrivateRoute exact path='/reels/:id' component={Reel} reelId={reelId} fetchMovies={fetchMovies} movies={moviesOfReelSelected} userId={userId}/>
      <PrivateRoute exact path='/reels' arrayOfReels={arrayOfReels} component={ReelsContainer}  userId={userId} fetchMovies={fetchMovies} fetchReels={fetchReels}/>
    </Switch>
  );  
}); */

// the rest
