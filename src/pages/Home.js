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
        return <ClipLoader
            color="#ffffff"
            loading={loading}
            size={150}
        />
    }
    return (
        <div>

            <Banner movie={popularMovies.results && popularMovies.results.length > 0 ? popularMovies.results[0] : {}} />
            <h1>Popular Movies</h1>
            <MovieSlide movies={popularMovies} />
            <h1>Top Rated Movies</h1>
            <MovieSlide movies={topRatedMovies} />
            <h1>Upcoming Movies</h1>
            <MovieSlide movies={upcomingMovies} />

        </div>
    )

}

export default Home