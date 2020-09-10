import React, { useState, createContext } from 'react'
//first item is an object, second an item is a function
//looks to the closes parent provider, if it's not there then
//guess where it looks
//where we createContext
const UserContext = createContext([{user: 'default user no provider wrapping'}, () => {}])

const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    uid: '',
    userId: '',
    username: '',
    email: '',
    moviesOfReelSelected: [],
    reel_id:'',
    arrayOfReels: [],
  });
  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider };