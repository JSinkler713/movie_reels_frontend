import React, { useState, useEffecti, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './config/routes';
import NavBar from './components/Layout/NavBar';
import { API_URL } from './constants/constants';
import { useHistory} from 'react-router-dom'
import './App.css';
import { UserContextProvider, UserContext } from './UserContext';

function App() {
  const [user, setUser] = useContext(UserContext)
  const history = useHistory()



/*   state = {
    currentUser: localStorage.getItem('uid'),
    userId: '',
    username: '',
    email: '',
    moviesOfReelSelected: [],
    reel_id:'',
    arrayOfReels: [],
  }; */

/*   const setCurrentUser = (data) => {
 //   this.setState({ currentUser: data.signedJwt })
   // this.setState({ userId: data.id })
   console.log('this is data up in App', data)
    this.setState({ currentUser: data.signedJwt, userId: data.id, username: data.username, email: data.email })
    localStorage.setItem('uid', data.signedJwt);
  }; */
 
// Moved logic down into reelsContainer
/*   const fetchReels = () => {
    let userId = this.state.userId
    console.log("running fetchReels")
    if(userId != '') {
      console.log('in the fetchreels the ' +userId+ 'is the userId')
      fetch(`${API_URL}/users/${userId}/reels`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res=> res.json())
        .then(data=> {
          console.log("Success we got the data", data);
          this.setState({arrayOfReels: (data)})
        })
        .catch(err => {
          this.setState({error: err.message })
        });
    }
  } */
  
  // refactored for hooks 
  const logout = () => {
    // handle logout
    localStorage.removeItem('uid');
    setUser({
      uid: '',
      userId: '',
      username: '',
      email: '',
      moviesOfReelSelected: [],
      reel_id:'',
      arrayOfReels: [],
    })
    //use history hook
    history.push('/login')
  };
  
  //moving logic down into moviescontainer
  /*
  const fetchMovies = (reel_id) => {
    console.log(this.state.reel_id)
    console.log(`fetching all movies with reel id ${reel_id}`)
    this.setState({ reel_id: reel_id })  
    fetch(`${API_URL}/reels/${reel_id}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res=> res.json())
      .then(data=> {
        this.setState({moviesOfReelSelected: (data)})
      })
      .catch(err => {
        this.setState({error: err.message })
      }); 
  }
  */ 
    return (
      <UserContextProvider>
        <NavBar logout={logout}/>
        <div className="container">
          <Routes />
        </div>
      </UserContextProvider>
    );
};

export default withRouter(App);

