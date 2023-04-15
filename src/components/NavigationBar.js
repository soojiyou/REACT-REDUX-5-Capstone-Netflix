import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { movieAction } from '../redux/actions/MovieAction';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';




function NavigationBar() {

    const dispatch = useDispatch();
    const { movieSearch } = useSelector(state => state.movie);
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [bgClassName, setBgClassName] = useState('transparent');

    const logoVariants = {
        start: { fillOpacity: 0 },
        end: { fillOpacity: 1, transition: { duration: 0.5 } },
        whileHover: { fillOpacity: [1, 0, 1, 0, 1], transition: { duration: 1, repeat: Infinity } },
    };
    const LogoMotionSvg = styled(motion.svg)`
        margin-right: 50px;
        width: 95px;
        height: 25px;
        fill: ${(props) => props.theme.red};
        cursor: pointer;
        `;
    const LogoMotionPath = styled(motion.path)`
        stroke-width: 6px;
        stroke: white;
        `;


    const search = (e) => {
        e.preventDefault();
        if (keyword) {
            dispatch(movieAction.getMovieSearch({ query: keyword }));
            navigate(`/movies?query=${keyword}`);
        } else {
            dispatch(movieAction.clearMovieSearch());
            navigate('/movies');
        }
    };

    const resetSearch = () => {
        setKeyword('');
        dispatch(movieAction.clearMovieSearch());
        navigate('/movies');
    };

    useEffect(() => {
        // Clear the search state when the location changes
        setKeyword('');
    }, [location]);

    useEffect(() => {
        // Reset filteredData when movieSearch changes
        dispatch(movieAction.setFilteredData({}));
    }, [movieSearch, dispatch]);

    useEffect(() => {
        const updateWindowSize = () => {
            setIsSmallScreen(window.innerWidth <= 600);
        };

        window.addEventListener('resize', updateWindowSize);
        updateWindowSize();

        return () => {
            window.removeEventListener('resize', updateWindowSize);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setBgClassName('opaque');
            } else {
                setBgClassName('transparent');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <Navbar className={`navbarstyle ${bgClassName}`}>
            <Container fluid>
                <Navbar.Brand href="/" className='navlogo'>
                    <LogoMotionSvg
                        variants={logoVariants}
                        initial="start"
                        animate="end"
                        whileHover="whileHover"
                        viewBox="0 0 1024 276.742"
                    >
                        <LogoMotionPath
                            fill="#d81f26"
                            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
                        />
                    </LogoMotionSvg>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link to="/" className='nav-item'>Home</Link>
                        <Link to="/movies" className='nav-item' onClick={resetSearch}>Movies</Link>


                    </Nav>
                    <Form className="d-flex navbar-form" onSubmit={search}>
                        <Form.Control
                            style={{ background: 'none' }}
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        {/* <Button className="navbar-form-button" variant="outline-danger" type='submit'>Search</Button>
                        <Button className="search-button" variant="danger" type='submit'></Button> */}
                        <Button className="navbar-form-button" variant="outline-danger" type='submit' style={{ display: isSmallScreen ? 'none' : 'block' }}>Search</Button>
                        <Button className="search-button" variant="danger" type='submit' style={{ fontSize: '13px', display: isSmallScreen ? 'block' : 'none' }}>Go</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default NavigationBar;