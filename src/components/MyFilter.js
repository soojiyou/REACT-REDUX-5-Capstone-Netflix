import React, { useEffect, useState } from 'react';
import InputRange from 'react-input-range';
import { Nav, NavDropdown, DropdownButton, Dropdown, Badge } from 'react-bootstrap';
import { movieAction } from '../redux/actions/MovieAction';
import { useDispatch, useSelector } from 'react-redux';

function MyFilter({ sortedMovies, currentDataSource,
    sortByVoteAverageAscending, sortByVoteAverageDescending,
    sortByReleaseDateAscending, sortByReleaseDateDescending,
    sortByPopularityAscending, sortByPopularityDescending,
    setSortedMovies, setShowSortedResults, unfilteredSortedMovies,
}) {

    const dispatch = useDispatch();
    const [yearRange, setYearRange] = useState({ min: 1900, max: new Date().getFullYear() });
    const { popularMovies, movieSearch, genreList, filteredData } = useSelector(state => state.movie);
    const [scoreRange, setScoreRange] = useState({ min: 0, max: 10 });
    const [selectedGenres, setSelectedGenres] = useState(new Set());
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 500);

    const handleWindowResize = () => {
        setIsSmallScreen(window.innerWidth < 500);
    };

    const handleYearRangeChange = (newYearRange) => {
        setYearRange(newYearRange);
        setShowSortedResults(true);

        let data;
        switch (currentDataSource) {
            case 'movieSearch':
                data = movieSearch?.results || [];
                break;
            case 'sortedMovies':
                data = unfilteredSortedMovies;

                break;
            default:
                data = popularMovies.results;
        }

        const newData = data.filter((item) => {
            const releaseYear = new Date(item.release_date).getFullYear();
            return releaseYear >= newYearRange.min && releaseYear <= newYearRange.max;
        });
        if (newData.length === 0) {
            setSortedMovies([]);
        } else {
            dispatch(movieAction.setFilteredData({ filteredData: newData }));
            setSortedMovies(newData);
        }

    };
    const handleScoreRangeChange = (newScoreRange) => {
        setScoreRange(newScoreRange);
        setShowSortedResults(true);

        let data;
        switch (currentDataSource) {
            case 'movieSearch':
                data = movieSearch?.results || [];
                break;
            case 'sortedMovies':
                // data = sortedMovies;
                data = unfilteredSortedMovies;

                break;
            default:
                data = popularMovies.results;
        }

        const newData = data.filter((item) => {
            return item.vote_average >= newScoreRange.min && item.vote_average <= newScoreRange.max;
        });

        if (newData.length === 0) {
            setSortedMovies([]);
        } else {
            dispatch(movieAction.setFilteredData({ filteredData: newData }));
            setSortedMovies(newData);
        }
    };

    const handleGenreBadgeClick = (genreId) => {
        setShowSortedResults(true);

        let data;
        switch (currentDataSource) {
            case 'movieSearch':
                data = movieSearch?.results || [];
                break;
            case 'sortedMovies':
                // data = sortedMovies;
                data = unfilteredSortedMovies;

                break;
            default:
                data = popularMovies.results;
        }

        const newData = data.filter((item) => {
            return item.genre_ids.includes(genreId);
        });

        if (newData.length === 0) {
            setSortedMovies([]);
        } else {
            dispatch(movieAction.setFilteredData({ filteredData: newData }));
            setSortedMovies(newData);
        }
    };

    // const isSmallScreen = window.innerWidth < 500;

    useEffect(() => {
        if (filteredData === true && movieSearch === {}) {
            dispatch(movieAction.getMovies({ activePage: 1 }));
        } else if (filteredData === true && movieSearch !== {}) {
            dispatch(movieAction.getMovieSearch({ activePage: 1 }));
        }
        console.log('filteredData', filteredData)
    }, [dispatch, filteredData, movieSearch]);

    useEffect(() => {
        // Add the event listener
        window.addEventListener('resize', handleWindowResize);

        // Remove the event listener when the component is unmounted
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    return (
        <Nav className='filter-container'>

            <div className="dropdown-style-container">
                <DropdownButton className="dropdown-style" id="dropdown-basic-button" title="Sort" variant="outline-danger" drop={isSmallScreen ? "down" : "end"}>
                    <div className='sortdiv'>
                        <div >
                            Sorted By
                        </div>
                        <Dropdown.Divider className='divider' />
                        <div className='sortoptiondiv'>

                            <NavDropdown className="nav-dropdown-style" title="Options" id="sort-dropdown" drop="down" >
                                <NavDropdown.Item className="dropdown-style-nav-item" onClick={sortByVoteAverageAscending}>
                                    Vote Average (Ascending)
                                </NavDropdown.Item>
                                <NavDropdown.Item className="dropdown-style-nav-item" onClick={sortByVoteAverageDescending}>
                                    Vote Average (Descending)
                                </NavDropdown.Item>
                                <NavDropdown.Item className="dropdown-style-nav-item" onClick={sortByReleaseDateAscending}>
                                    Release Date (Ascending)
                                </NavDropdown.Item>
                                <NavDropdown.Item className="dropdown-style-nav-item" onClick={sortByReleaseDateDescending}>
                                    Release Date (Descending)
                                </NavDropdown.Item>
                                <NavDropdown.Item className="dropdown-style-nav-item" onClick={sortByPopularityAscending}>
                                    Popularity (Ascending)
                                </NavDropdown.Item>
                                <NavDropdown.Item className="dropdown-style-nav-item" onClick={sortByPopularityDescending}>
                                    Popularity (Descending)
                                </NavDropdown.Item>
                            </NavDropdown>

                        </div>
                    </div>
                </DropdownButton>
            </div>


            <div className="dropdown-style-container">
                <Dropdown>
                    <Dropdown.Toggle variant="outline-danger" id="dropdown-basic">
                        Filter By
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="filter-dropdown-style">
                        <div className="input-range-container">
                            <label>Release Year</label>
                            <h3>
                                From : {yearRange.min} To : {yearRange.max}
                            </h3>
                            <form className="form">
                                <InputRange
                                    draggableTrack
                                    minValue={1900}
                                    maxValue={new Date().getFullYear()}
                                    value={yearRange}
                                    onChange={handleYearRangeChange}
                                    onChangeComplete={(value) => console.log(value)}
                                    style={{ width: '100%' }}
                                />
                            </form>
                        </div>

                        <div className="input-range-container">
                            <label>IBM Score</label>
                            <h3>
                                From : {scoreRange.min} To : {scoreRange.max}
                            </h3>
                            <form className="form">
                                <InputRange
                                    draggableTrack
                                    minValue={0}
                                    maxValue={10}
                                    value={scoreRange}
                                    onChange={handleScoreRangeChange}
                                    onChangeComplete={(value) => console.log(value)}
                                    style={{ width: '100%' }}
                                />
                            </form>
                        </div>
                        <div className="nav-dropdown-genre">
                            <label>Genres</label>
                            {genreList.map((item) => (
                                <Badge
                                    key={item.id}
                                    bg="danger"
                                    className={selectedGenres.has(item.id) ? 'filterbadge active' : 'filterbadge'}
                                    onClick={() => handleGenreBadgeClick(item.id)}
                                >
                                    {item.name}
                                </Badge>
                            ))}
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

        </Nav >


    );
}

export default MyFilter;