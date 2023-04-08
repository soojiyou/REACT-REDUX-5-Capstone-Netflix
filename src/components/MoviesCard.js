import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faUsers } from '@fortawesome/free-solid-svg-icons'



const MoviesCard = ({ item }) => {
    const navigate = useNavigate();
    const showMovieDetail = (id) => { navigate(`/movies/${id}`); };
    const { genreList } = useSelector(state => state.movie);

    return (
        <div className='movielistcard' onClick={() => showMovieDetail(item.id)} style={{ backgroundImage: "url(" + `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}` + ")" }}>

            <div className='overlay-moviecard '>
                <h1>{item.title}</h1>
                <div>
                    {item.genre_ids.map(id =>
                        <Badge key={id} bg="danger">{genreList.find(item => item.id === id).name}</Badge>
                    )}
                </div>

                <div>
                    <span><FontAwesomeIcon icon={faFilm} /> {item.vote_average} </span>
                    <span> <FontAwesomeIcon icon={faUsers} /> {item.vote_count} </span>
                    <span className='adultfont'> {item.adult ? "Adult" : "Under 18"} </span>
                </div>
            </div></div>
    )
}





export default MoviesCard