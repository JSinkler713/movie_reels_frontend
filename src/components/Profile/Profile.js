import React from 'react';

const Profile = ({user}) => {
  // console.log('Props ', props)
  return (
    <div>
      <p><strong>Username:{user.username}</strong> </p>
      <p><strong>Email:{user.email}</strong></p>
    </div>
  );  
};

export default Profile;
