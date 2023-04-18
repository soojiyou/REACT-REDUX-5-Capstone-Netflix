import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faUsers } from '@fortawesome/free-solid-svg-icons'



const MovieCard = ({ item }) => {
    const navigate = useNavigate();
    const showMovieDetail = (id) => { navigate(`/movies/${id}`); };
    const { genreList } = useSelector(state => state.movie);
    const [isHovered, setIsHovered] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(`url(https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path})`);


    const handleMouseEnter = () => {
        setIsHovered(true);
        if (window.innerWidth >= 500) {
            setBackgroundImage(`url(https://www.themoviedb.org/t/p/original${item.poster_path})`);
        }
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
        setBackgroundImage(`url(https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path})`);
    };

    // const backgroundImage = window.innerWidth >= 500 && isHovered
    //     ? `url(https://www.themoviedb.org/t/p/original${item.poster_path})`
    //     : `url(https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${item.poster_path})`;

    return (
        <div
            className='moviecard'
            onClick={() => showMovieDetail(item.id)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ backgroundImage, cursor: 'pointer' }}
        >
            <div className='overlay'>
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





export default MovieCard