import React, { useState, useEffect, useContext } from 'react';
import Reel from '../components/Reels/Reel' 
import ReelCard from '../components/Reels/ReelCard'
import {UserContext} from '../UserContext'
import { API_URL } from '../constants/constants';
import { Switch, Route } from 'react-router-dom';

function Reels() {
  const [user, setUser] = useContext(UserContext)
  const [reels, setReels] = useState()

  useEffect(()=> {
    let userId = user.userId
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
          setReels(data)
        })
        .catch(err => {
          console.log(err.message)
        });
    }
  }, [])
/*   state = { 
    userId: this.props.userId,
    newReelTitle: '',
    arrayOfReels: '',
    moviesOfReelSelected: '',
    deletedStatus: false,
    addedReel: false,
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  
  makeReel = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    let newReelId = this.state.arrayOfReels.length
    console.log(this.props.userId)
    console.log("Want to add new reel with title " + this.state.newReelTitle)
    let newReel = {
      title: this.state.newReelTitle,
      user_id: this.state.userId
    } 
    fetch(`${API_URL}/users/${this.state.userId}/reels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newReel)
    })
      .then(res=> res.json())
      .then(data=> {
        console.log("added data", data);
        //this will re-up the page to update with new reel
        // this doesn't seem to work
        // this.props.history.push('/reels');
        this.setState({ addedReel: true })
        
      })
      .catch(err => {
        this.setState({error: err.message })
      }); 
  }
  deleteReel = (reelid) => {
    console.log("trying to delete reel" + reelid)
    fetch(`${API_URL}/reels/${reelid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res=> {
        console.log(res)
        this.setState({ deletedStatus: true })
        this.props.fetchReels()
        //this.props.fetchReels()
        //don't think this is the best way
        //this.props.history.push('/reels');
      })
  }
  componentDidMount() {
      fetch(`${API_URL}/users/${this.state.userId}/reels`, {
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
    //if (this.state.arrayOfReels.length == 0 || this.state.deletedStatus == true) { 
     // this.props.fetchReels()
   //  this.setState({ deletedStatus: false })
  // }
  } */


    return (
      <div className='reel-container'>
        <h3> {user.username} 's MovieReels</h3>
        <div className='top-of-reels'>
        <section className="new-reel-form">
          <div className='inner-new-reel-form'>
          <h2>New Reel</h2>
          <form onSubmit={()=> console.log('hey')}>
            <div className="form-group">
              <label htmlFor="email">Reel Name</label>
              <input type="text" id="newReel" name="newReelTitle" value={'hey'}  onChange={()=> console.log('changed')} placeholder="Everything Hobbit"/>
            </div>
            <button type="Submit" onClick={()=> console.log('makerreel')}>Add Reel</button>
          </form>
          </div>
        </section>
          <div className='top-of-reels-info'>
            <p>Make a new reel on your left. If you want to browse one of your already created reels, just click the reel title, above it's poster. Make sure to contribute by making new Reels of Movies that you think should belongtogether. We count on your contributoin to make Movie_Reels great!
            </p>
          </div>
        </div>
        <div className="my-reels-container">
          
          {reels ? reels.map((reel, i) =><ReelCard key={i}
          reel_id={reel.Reel_id}
          deleteReel={()=>console.log('delete it')}
          reelTitle={reel.Reel}
          fetchMovies={()=>console.log('fetch stuff')}
           />) : <h1>no reels</h1>}
          
        </div>
      </div>
    );  
};

export default Reels;
