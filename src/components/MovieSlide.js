import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from './MovieCard';


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1200 },
        items: 5,
        slidesToSlide: 3,
    },
    desktop: {
        breakpoint: { max: 1200, min: 992 },
        items: 4,
        slidesToSlide: 3,
    },
    tablet: {
        breakpoint: { max: 992, min: 500 },
        items: 3,
        slidesToSlide: 2,
    },
    mobile: {
        breakpoint: { max: 500, min: 0 },
        items: 1,
        slidesToSlide: 1,
    }
};
const MovieSlide = ({ movies }) => {

    return (
        <div className='movie-slide'>
            <Carousel className="custom-carousel" responsive={responsive}>
                {movies?.results && movies.results.map(item => <MovieCard key={item.id} item={item} />)}
            </Carousel>
        </div>
    )
}

export default MovieSlide