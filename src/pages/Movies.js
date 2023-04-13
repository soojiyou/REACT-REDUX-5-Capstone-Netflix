import React, { useEffect, useState } from 'react';
import { movieAction } from '../redux/actions/MovieAction';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import { Container, Row, Col } from 'react-bootstrap';
import MyPagination from '../components/MyPagination';
import MoviesCard from '../components/MoviesCard';
import MyFilter from '../components/MyFilter';


const Movies = () => {

    const dispatch = useDispatch();
    const [sortedMovies, setSortedMovies] = useState([]);
    const { popularMovies, loading, movieSearch, filteredData } = useSelector(state => state.movie);
    const [activePage, setActivePage] = useState(1);
    const [showSortedResults, setShowSortedResults] = useState(true);
    const [searchedData, setSearchedData] = useState([]);
    const [currentDataSource, setCurrentDataSource] = useState('popularMovies');
    const [moviesToDisplay, setMoviesToDisplay] = useState(popularMovies?.results || []);
    const [unfilteredSortedMovies, setUnfilteredSortedMovies] = useState([]);


    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        setActivePage(pageNumber);
    };


    const sortByAscending = ({ factor }) => {
        const sorted = [...popularMovies.results].sort((a, b) => {
            if (factor === 'release_date') {
                const dateA = new Date(a[factor]);
                const dateB = new Date(b[factor]);
                return dateA - dateB;
            }
            return a[factor] - b[factor];
        });
        setUnfilteredSortedMovies(sorted);
        setSortedMovies(sorted);
        setShowSortedResults(true);
        setCurrentDataSource('sortedMovies');

    };

    const sortByDescending = ({ factor }) => {
        const sorted = [...popularMovies.results].sort((a, b) => {
            if (factor === 'release_date') {
                const dateA = new Date(a[factor]);
                const dateB = new Date(b[factor]);
                return dateB - dateA;
            }
            return b[factor] - a[factor];
        });
        setUnfilteredSortedMovies(sorted);
        setSortedMovies(sorted);
        setShowSortedResults(true);
        setCurrentDataSource('sortedMovies');
    };


    const updateMoviesToDisplay = () => {
        let newMoviesToDisplay;
        if (movieSearch?.results?.length > 0) {
            newMoviesToDisplay = filteredData?.filteredData?.length > 0 ? filteredData.filteredData : movieSearch.results;
        } else if ((newMoviesToDisplay?.length === 0) && filteredData) {
            newMoviesToDisplay = [];
        } else {
            newMoviesToDisplay = showSortedResults ? sortedMovies : popularMovies?.results || [];
        }

        setMoviesToDisplay(newMoviesToDisplay);
    };

    useEffect(() => {
        dispatch(movieAction.getMovies({ activePage: activePage }));
    }, [dispatch, activePage]);


    useEffect(() => {
        if (showSortedResults === true) {
            setSortedMovies(popularMovies.results);
        }
    }, [popularMovies, showSortedResults]);

    useEffect(() => {
        updateMoviesToDisplay();
    }, [movieSearch?.results, filteredData, sortedMovies, popularMovies]);

    useEffect(() => {
        if (movieSearch?.results?.length > 0) {
            setCurrentDataSource('movieSearch');
        }
    }, [movieSearch]);


    const renderContent = () => {

        return (
            <Container>
                <Row className="moviecard-list-container">
                    <Col lg={4}>
                        <div className="moviecard-search-item">
                            <MyFilter
                                sortByVoteAverageAscending={() => sortByAscending({ factor: "vote_average" })}
                                sortByVoteAverageDescending={() => sortByDescending({ factor: "vote_average" })}
                                sortByReleaseDateAscending={() => sortByAscending({ factor: "release_date" })}
                                sortByReleaseDateDescending={() => sortByDescending({ factor: "release_date" })}
                                sortByPopularityAscending={() => sortByAscending({ factor: "popularity" })}
                                sortByPopularityDescending={() => sortByDescending({ factor: "popularity" })}
                                setSortedMovies={setSortedMovies}
                                setShowSortedResults={setShowSortedResults}
                                setSearchedData={setSearchedData}
                                searchedData={searchedData}
                                sortedMovies={sortedMovies}
                                currentDataSource={currentDataSource}
                                setCurrentDataSource={setCurrentDataSource}
                                unfilteredSortedMovies={unfilteredSortedMovies}
                            />
                        </div>
                    </Col>
                    <Col lg={8}>
                        <div className="moviecard-search-containter">
                            <div className="moviecard-search-wrapper">
                                {moviesToDisplay && moviesToDisplay.map((item) => (
                                    <div key={item.id} className="moviecard-card-item">
                                        <MoviesCard item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <MyPagination activePage={activePage} totalItemsCount={450} onChange={handlePageChange} />
                    </Col>
                </Row>
            </Container>
        );
    };


    if (loading) {
        return <ClipLoader
            color="#ffffff"
            loading={loading}
            size={150}
        />
    }

    return (
        <div>
            {renderContent()}
        </div>
    )

}

export default Movies



