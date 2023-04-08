import React, { useEffect, Component } from 'react';
import { movieAction } from '../redux/actions/MovieAction';
import { useDispatch, useSelector } from 'react-redux';
import MovieSlide from '../components/MovieSlide';
import ClipLoader from "react-spinners/ClipLoader";
import RecommandCard from '../components/RecommandCard';
import { Container, Row, Col, Badge, Modal, Button } from 'react-bootstrap';

import MoviesCard from '../components/MoviesCard';

const Movies = () => {

    const dispatch = useDispatch();
    const { popularMovies, topRatedMovies, upcomingMovies, loading } = useSelector(state => state.movie);


    useEffect(() => {
        dispatch(movieAction.getMovies());
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

            {/* <h1>Popular Movies</h1>
            <MovieSlide movies={popularMovies} />
            <h1>Top Rated Movies</h1>
            <MovieSlide movies={topRatedMovies} />
            <h1>Upcoming Movies</h1>
            <MovieSlide movies={upcomingMovies} /> */}
            <Col className='moviecard-list-container'>
                <Row lg={4}>
                    <div className='moviecard-list-item'>
                        {topRatedMovies && topRatedMovies.results && topRatedMovies.results.map(item => <MoviesCard key={item.id} item={item} />)}
                    </div>                </Row>
                <Row lg={4}>
                    <div className='moviecard-list-item'>
                        {topRatedMovies && topRatedMovies.results && topRatedMovies.results.map(item => <MoviesCard key={item.id} item={item} />)}
                    </div>
                </Row>
                <Row lg={4}>
                    <div className='moviecard-list-item'>
                        {popularMovies && popularMovies.results && popularMovies.results.map(item => <MoviesCard key={item.id} item={item} />)}
                    </div>
                </Row>
            </Col>





        </div>


    )
}

export default Movies



