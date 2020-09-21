import React, { useState, useEffect, useContext } from 'react';
import Reel from '../components/Reels/Reel' 
import ReelCard from '../components/Reels/ReelCard'
import {UserContext} from '../UserContext'
import { API_URL } from '../constants/constants';
import { Switch, Route } from 'react-router-dom';
import Plus from '../Icons/Plus'

function Reels() {
  const [user, setUser] = useContext(UserContext)
  const [newReel, setNewReel] = useState('')
  const [reels, setReels] = useState()
  const [fetched, setFetched] = useState(false)
  const [hidden, setHidden] = useState(false)
  let userID = localStorage.getItem('userId')

  useEffect(()=> {
    console.log("running fetchReels")
    if(userID != '') {
      console.log('in the fetchreels the ' +userID +'is the userId')
      fetch(`${API_URL}/users/${userID}/reels`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res=> res.json())
        .then(data=> {
          console.log("Success we got the data", data);
          setReels(data)
          if (data.length > 0) {
            setHidden(!hidden)
          }
        })
        .catch(err => {
          console.log(err.message)
        });
    }
  }, [fetched])

  const toggleHidden = ()=> {
    setHidden(!hidden)
  }

  const handleChange = (event) => {
    setNewReel(event.target.value);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    console.log(user.userId)
    console.log("Want to add new reel with title " + newReel)
    let newReelToAdd = {
      title: newReel,
      user_id: user.userId
    } 
    fetch(`${API_URL}/users/${user.userId}/reels`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newReelToAdd)
    })
      .then(res=> res.json())
      .then(data=> {
        console.log("added data", data);
        //reset the input
        setNewReel('')
        //toggle the fetched state to update the useContext
        setFetched(!fetched)
        //this will re-up the page to update with new reel
      })
      .catch(err => {
        console.log(err)
      }); 
  }
  
  const deleteReel = (reelid) => {
    console.log("trying to delete reel" + reelid)
    fetch(`${API_URL}/reels/${reelid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res=> {
        console.log(res)
        setFetched(!fetched)
      })
  }

  return (
    <div className='reel-container'>
      <h3 style={{display: 'none'}}> {user.username} 's MovieReels</h3>
      <div className='top-of-reels'>
        <div className='icon-holder' onClick={toggleHidden}>
          <Plus  width={"36px"} height={"36px"} />
        </div>
        <section  className={
           hidden?'hidden':'new-reel-form'}>
        <div className='inner-new-reel-form'>
        <h2>New Reel</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Reel Name</label>
            <input type="text" id="newReel" name="newReelTitle" value={newReel}  onChange={handleChange} placeholder=""/>
          </div>
          <button type="Submit">Add Reel</button>
        </form>
        </div>
      </section>
      </div>
      <div className="my-reels-container">
        
        {reels ? reels.map((reel, i) =><ReelCard key={i}
        reel_id={reel.Reel_id}
        deleteReel={deleteReel}
        reelTitle={reel.Reel}
        fetchMovies={()=>console.log('fetch stuff')}
          />) : <h1>no reels</h1>}
        
      </div>
    </div>
  );  
};

export default Reels;
