import React, { useEffect, Component, useState } from 'react';
import { movieAction } from '../redux/actions/MovieAction';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import { Container, Row, Col } from 'react-bootstrap';
import MyPagination from '../components/MyPagination';
import MoviesCard from '../components/MoviesCard';
import MyFilter from '../components/MyFilter';
import { useNavigate } from 'react-router-dom'


const Movies = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [sortedMovies, setSortedMovies] = useState([]);
    const { popularMovies, topRatedMovies, upcomingMovies, loading, movieSearch } = useSelector(state => state.movie);
    const [activePage, setActivePage] = useState(1);
    const [showSortedResults, setShowSortedResults] = useState(false);
    const [filteredData, setFilteredData] = useState([]);


    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber);
    };



    useEffect(() => {
        dispatch(movieAction.getMovies({ activePage: activePage }));
    }, [dispatch, activePage]);


    useEffect(() => {
        if (showSortedResults === true) {
            setSortedMovies(popularMovies.results);
        }

    }, [showSortedResults]);


    const sortByAscending = ({ factor }) => {
        setShowSortedResults(true);
        const sorted = [...popularMovies.results].sort((a, b) => {
            if (factor === 'release_date') {
                const dateA = new Date(a[factor]);
                const dateB = new Date(b[factor]);
                return dateA - dateB;
            }
            return a[factor] - b[factor];
        });
        setSortedMovies(sorted);
    }

    const sortByDescending = ({ factor }) => {
        setShowSortedResults(true);
        const sorted = [...popularMovies.results].sort((a, b) => {
            if (factor === 'release_date') {
                const dateA = new Date(a[factor]);
                const dateB = new Date(b[factor]);
                return dateB - dateA;
            }
            return b[factor] - a[factor];
        });
        setSortedMovies(sorted);

    }
    // const handleFilteredData = (filteredMovies) => {
    //     setSortedMovies(filteredMovies);
    //     setShowSortedResults(true);
    // };
    const handleFilteredData = (filteredMovies) => {
        setFilteredData(filteredMovies);
    };

    const renderSearchResults = () => (
        <Container>
            <Row>
                <Col lg={4}>
                    <div className='moviecard-list-item'>
                        <MyFilter
                            sortByVoteAverageAscending={() => sortByAscending({ factor: 'vote_average' })}
                            sortByVoteAverageDescending={() => sortByDescending({ factor: 'vote_average' })}
                            sortByReleaseDateAscending={() => sortByAscending({ factor: 'release_date' })}
                            sortByReleaseDateDescending={() => sortByDescending({ factor: 'release_date' })}
                            sortByPopularityAscending={() => sortByAscending({ factor: 'popularity' })}
                            sortByPopularityDescending={() => sortByDescending({ factor: 'popularity' })}
                            setSortedMovies={setSortedMovies}
                            setShowSortedResults={setShowSortedResults}
                            handleFilteredData={handleFilteredData}


                        />
                    </div>
                </Col>
                <Col lg={8}>
                    <div className='moviecard-search-containter'>
                        <div className='moviecard-search-wrapper'>
                            {movieSearch.results.map(item => <div className='moviecard-search-item'><MoviesCard key={item.id} item={item} /> </div>)}
                        </div>
                    </div>
                    <MyPagination
                        activePage={activePage}
                        totalItemsCount={450}
                        onChange={handlePageChange}
                    />
                </Col>
            </Row>

        </Container>


    );
    const renderMovieCategories = () => (
        <Container>
            <Row className='moviecard-list-container'>
                <Col lg={4}>
                    <div className='moviecard-search-item'>
                        <MyFilter
                            sortByVoteAverageAscending={() => sortByAscending({ factor: 'vote_average' })}
                            sortByVoteAverageDescending={() => sortByDescending({ factor: 'vote_average' })}
                            sortByReleaseDateAscending={() => sortByAscending({ factor: 'release_date' })}
                            sortByReleaseDateDescending={() => sortByDescending({ factor: 'release_date' })}
                            sortByPopularityAscending={() => sortByAscending({ factor: 'popularity' })}
                            sortByPopularityDescending={() => sortByDescending({ factor: 'popularity' })}
                            setSortedMovies={setSortedMovies}
                            setShowSortedResults={setShowSortedResults}
                            handleFilteredData={handleFilteredData}
                        />
                    </div>
                </Col>

                <Col lg={8}>
                    <div className='moviecard-search-containter'>

                        <div className='moviecard-search-wrapper'>
                            {(showSortedResults ? sortedMovies : filteredData.length > 0 ? filteredData : popularMovies.results).map(
                                (item) => (
                                    <MoviesCard key={item.id} item={item} />
                                )
                            )}
                        </div>
                    </div>
                    <MyPagination
                        activePage={activePage}
                        totalItemsCount={450}
                        onChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    );

    if (loading) {
        return <ClipLoader
            color="#ffffff"
            loading={loading}
            size={150}
        />
    }

    return (
        <div>
            {movieSearch && movieSearch.results ? renderSearchResults() : renderMovieCategories()}
        </div>
    )

}

export default Movies



