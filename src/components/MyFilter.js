import React, { useEffect, useState, useRef } from 'react';
import InputRange from 'react-input-range';
import { Nav, NavDropdown, DropdownButton, Dropdown, Badge, Overlay, Popover } from 'react-bootstrap';
import { movieAction } from '../redux/actions/MovieAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function MyFilter({ sortByVoteAverageAscending, sortByVoteAverageDescending, sortByReleaseDateAscending, sortByReleaseDateDescending, sortByPopularityAscending, sortByPopularityDescending, setSortedMovies, setShowSortedResults, handleFilteredData }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [yearRange, setYearRange] = useState({ min: 1900, max: new Date().getFullYear() });
    const [filteredData, setFilteredData] = useState({});
    const { popularMovies, topRatedMovies, upcomingMovies, loading, movieSearch, genreList } = useSelector(state => state.movie);
    const [scoreRange, setScoreRange] = useState({ min: 0, max: 10 });
    const [selectedGenres, setSelectedGenres] = useState(new Set());


    const handleYearRangeChange = (newYearRange) => {
        setYearRange(newYearRange);

        const newData = [...popularMovies.results].filter((item) => {
            const releaseYear = new Date(item.release_date).getFullYear();
            return releaseYear >= newYearRange.min && releaseYear <= newYearRange.max;
        });

        handleFilteredData(newData);
        setSortedMovies(newData);
        setShowSortedResults(true);
    };

    const handleScoreRangeChange = (newScoreRange) => {
        setScoreRange(newScoreRange);

        const newData = [...popularMovies.results].filter((item) => {
            const voteAverage = item.vote_average;
            return voteAverage >= newScoreRange.min && voteAverage <= newScoreRange.max;
        });

        handleFilteredData(newData);
        setSortedMovies(newData);
        setShowSortedResults(true);
    };

    const handleGenreBadgeClick = (genreId) => {
        const newSelectedGenres = new Set(selectedGenres);
        if (newSelectedGenres.has(genreId)) {
            newSelectedGenres.delete(genreId);
        } else {
            newSelectedGenres.add(genreId);
        }
        setSelectedGenres(newSelectedGenres);

        // Call applyGenreFilter and pass the popularMovies.results
        const newData = applyGenreFilter([...popularMovies.results]);

        handleFilteredData(newData);
        setSortedMovies(newData);
        setShowSortedResults(true);
    };

    const applyGenreFilter = (data) => {
        if (selectedGenres.size === 0) return data;

        return data.filter((item) =>
            item.genre_ids.some((genreId) => selectedGenres.has(genreId))
        );
    };

    // You can call this function when you want to apply the genre filter


    useEffect(() => {
        if (filteredData === true) {
            dispatch(movieAction.getMovies({ activePage: 1 }));
        }
        console.log(filteredData)
        console.log(popularMovies)

    }, [dispatch, filteredData]);

    return (
        <Nav className='filter-container'>

            <div className="dropdown-style-container">
                <DropdownButton className="dropdown-style" id="dropdown-basic-button" title="Sort" variant="outline-danger" drop="end">
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