import React, { useEffect } from 'react';
import { movieAction } from '../redux/actions/MovieAction';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/Banner';
import MovieSlide from '../components/MovieSlide';
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
    const dispatch = useDispatch();
    const { popularMovies, topRatedMovies, upcomingMovies, loading } = useSelector(state => state.movie);

    useEffect(() => {
        dispatch(movieAction.getMovies({ activePage: 1 }));
    }, []);


    if (loading) {
        return <div className="loading"><ClipLoader
            color="#ffffff"
            loading={loading}
            size={150}
        /></div>
    }
    return (
        <div className='home-div'>

            <Banner movie={popularMovies.results && popularMovies.results.length > 0 ? popularMovies.results[0] : {}} />
            <div className='home-content'>
                <h1 class='home-h1'>Popular Movies</h1>
                <MovieSlide movies={popularMovies} />
                <h1 class='home-h1'>Top Rated Movies</h1>
                <MovieSlide movies={topRatedMovies} />
                <h1 class='home-h1'>Upcoming Movies</h1>
                <MovieSlide movies={upcomingMovies} />
            </div>
        </div >
    )

}


export default Home