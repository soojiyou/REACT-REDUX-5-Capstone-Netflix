import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { movieAction } from '../redux/actions/MovieAction';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Badge, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faUsers } from '@fortawesome/free-solid-svg-icons'
import RecommandCard from '../components/RecommandCard';
import { Tab, Tabs } from 'react-bootstrap';

const MovieDetail = ({ item }) => {
    const dispatch = useDispatch();
    let { id } = useParams();
    const { movieDetail, movieReview, movieRecommand, movieVideo } = useSelector(state => state.movie);

    const [showModal, setShowModal] = useState(false);
    const [movieVideoYoutube, setMovieVideo] = useState(null);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = async () => {
        try {
            const key = movieVideo.results[0].key
            const videoUrl = `https://www.youtube.com/embed/${key}`; // Construct the URL of the video
            setMovieVideo(videoUrl); // Set the URL as the value of the movieVideo state
            setShowModal(true); // Set showModal to true to display the modal
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        dispatch(movieAction.getMovieDetail({ id }));
    }, []);


    return (
        <div>
            <div className='banner-item-detail' style={{ backgroundImage: "url('https://help.nflxext.com/0af6ce3e-b27a-4722-a5f0-e32af4df3045_what_is_netflix_5_en.png')" }}></div>
            <Container>

                <Row className='movie-detail-container-row'>
                    <Col lg={6} className='movie-detail-img'> <div className='moviecard-detail' style={{ backgroundImage: "url(" + `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetail.poster_path}` + ")" }} ></div></Col>
                    <Col lg={6} className='movie-detail-info'>

                        <Row className='movie-detail-row' lg={1}>
                            <Col className='movie-detail-badge'>{movieDetail && movieDetail.genres && movieDetail.genres.map(genre =>
                                <Badge className='badge' key={genre.id} bg="danger">{genre.name}</Badge>
                            )}</Col>
                        </Row>
                        <Row className='movie-detail-title movie-detail-row' lg={3}><h1>{movieDetail.title}</h1></Row>
                        <Row className='movie-detail-row' lg={1}>
                            <div className='col-arrange'>
                                <div> <FontAwesomeIcon icon={faFilm} /> {movieDetail.vote_average}</div>
                                <div> <FontAwesomeIcon icon={faUsers} /> {movieDetail.vote_count}</div>
                                <div className='adultfont'>{movieDetail.adult ? "Adult" : "Under 18"}</div>
                            </div>


                        </Row>

                        <Row className='movie-detail-row line' lg={3}><p>{movieDetail && movieDetail.overview}</p></Row>
                        <Row className='movie-detail-row line' lg={3}>
                            <div>
                                <Col className='bedge-info-container'><Badge className='badge-info' bg="danger">Budget</Badge> $ {movieDetail.budget}</Col>
                                <Col className='bedge-info-container'><Badge className='badge-info' bg="danger">Revenue</Badge> $ {movieDetail.revenue}</Col>
                                <Col className='bedge-info-container'><Badge className='badge-info' bg="danger">Release Day</Badge> {movieDetail.release_date}</Col>
                                <Col className='bedge-info-container'><Badge className='badge-info' bg="danger">Time</Badge> {movieDetail.runtime} min</Col>
                            </div>

                        </Row>
                        <Row className='movie-detail-row line' lg={1}>
                            <Button variant="primary" onClick={handleShowModal}>
                                Watch Trailer
                            </Button>

                            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                                <Modal.Body>
                                    {movieVideo && (
                                        <iframe
                                            width="100%"
                                            height="500px"
                                            src={movieVideoYoutube}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    )}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseModal}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </Row>

                    </Col>


                </Row>
                <Row className='movie-extra-container-row'>
                    <Tabs className='tabsstyle' defaultActiveKey="Review">
                        <Tab eventKey="Review" title="Review">
                            {/* <p>{movieReview && movieReview.results && movieReview.results[0].content}</p> */}
                            {movieReview && movieReview.results && movieReview.results.map(item => <div className='reviewdiv'><h3 style={{ fontSize: '18px' }}>{item.author}</h3><p>{item.content}</p></div>)}
                        </Tab>
                        <Tab eventKey="RecommandMovie" title="Recommand Movie">
                            <div className='moviecard-recommand-container'>
                                {movieRecommand && movieRecommand.results && movieRecommand.results.map(item => <RecommandCard key={item.id} item={item} />)}
                            </div>
                        </Tab>
                        <Tab eventKey="contact" title="Contact">
                            <p>Content for Contact tab</p>
                        </Tab>
                    </Tabs>

                </Row>


            </Container></div>

    )
}

export default MovieDetail