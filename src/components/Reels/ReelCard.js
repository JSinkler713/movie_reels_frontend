import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../UserContext'
import { Link } from 'react-router-dom'
import { API_URL } from '../../constants/constants';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

//when using a functional component we need to manually pass down the props to that component


const ReelCard = (props)=> {
  const [movies, setMovies] = useState([])
  const [image, setImage] = useState('')
  const [longTitle, setLongTitle] = useState(false)
  const [user, setUser] = useContext(UserContext)


  const setReelId =()=> {
    setUser({
      ...user,
      reel_id: props.reel_id,
      reel_title: props.reelTitle
    })
  }

  useEffect(()=> {
    fetch(`${API_URL}/reels/${props.reel_id}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res=> res.json())
      .then(data=> {
        console.log("Success we got the data", data);
        if (data.length > 0) {
          const length = data.length
          let random = Math.floor(Math.random() * length)
          setMovies(data[random])
          setImage(data[random].Poster)
        }else {
          setImage('https://placebear.com/g/300/445')
        }
      })
      .catch(err => {
        console.log(err)
      }); 
      console.log(props.reelTitle.length)
      if (props.reelTitle.length > 18) {
        setLongTitle(true)
      }
  }, [setUser])

  return ( 
    
      <Link onClick={setReelId} to={`/reels/${props.reel_id}`}>
        <Card className='reel-card'>
          <CardBody>
            {longTitle
            ? <CardTitle style={{justifyContent: 'center', display: 'flex', fontSize: '1rem'}}>{props.reelTitle}</CardTitle>
            : <CardTitle style={{justifyContent: 'center', display: 'flex', fontSize: '1.25rem'}}>{props.reelTitle}</CardTitle>
            }
            <CardImg top width="100%" src={image} alt='card image of poster' />
          </CardBody>
        </Card>
      </Link> 
  )
};

export default ReelCard;
