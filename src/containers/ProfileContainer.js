import React, { useContext} from 'react';
import {UserContext} from '../UserContext'
import Profile from '../components/Profile/Profile';
import { API_URL } from '../constants/constants';

function ProfileContainer() {
  const [user, setUser] = useContext(UserContext)
  return <Profile user={user} />
};

export default ProfileContainer;
