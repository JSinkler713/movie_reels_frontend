import React, { useContext} from 'react';
import {UserContext} from '../UserContext'
import Profile from '../components/Profile/Profile';
import { API_URL } from '../constants/constants';

function ProfileContainer() {
  const [user, setUser] = useContext(UserContext)

  /*
  componentDidMount() {
    console.log(this.props)
    console.log('props in profile container')
    // Fetch call to get user information
    fetch(`${API_URL}/users`, {
      headers: {
        authorization: `Bearer ${localStorage.uid}`
      }   
    })  
    .then(res => res.json())
//    .then(data => this.setState({ user: data.data })) 
    .then(data=> console.log(data))
    .catch(err => console.log(err))
  };  
  */
  return <Profile user={user} />
};

export default ProfileContainer;
