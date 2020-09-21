import React, { useState, useEffect, useContext } from "react";
import {UserContext} from '../UserContext'
import { useHistory} from 'react-router-dom'
import { API_URL } from '../constants/constants';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap'

const Movie = (props)=> {
  const [user, setUser]= useContext(UserContext)
  const history = useHistory()
  /*j=
  state = {
    movie:'',
    actors: '',
    plot:''
  }



  componentDidMount() {
    this.setState({actors: '', plot: ''})
  }
  */
  const onClickadd = ()=> {
    let url='http://www.omdbapi.com/?apikey=3a55a9e6&i='+props.imdbId
    console.log(url);
    console.log(props.imdbId)
    console.log(props.movie.Poster)
    console.log(props.title)
    let newMovie = {
      external_id : props.imdbId,
      title : props.title,
      poster : props.movie.Poster
    }
    fetch(`${API_URL}/reels/${user.reel_id}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMovie)
    })
      .then(res=> {
        console.log('added a moviee!!!!')
        console.log("added data", res);
        //this will re-up the page to update with new reel
        //this.props.history.push('/reels');
        history.push(`/reels/${user.reel_id}`)
      })
      .catch(err => {
        console.log('had a big error')
      });
    //this.props.searchOff()
  }
    
  return (
    <Card className='myMovies'>
      <CardBody>
      <CardTitle style={{fontSize: '1.5rem'}}>Title:{props.title} </CardTitle>
      <CardSubtitle style={{fontSize: '1rem'}}>{props.year}</CardSubtitle>
      <CardImg src={props.imgSrc} alt="poster" />
      <Button onClick={onClickadd}><strong>Add to Reel!</strong></Button>
      </CardBody>
    </Card>
  )
}

export default Movie;
