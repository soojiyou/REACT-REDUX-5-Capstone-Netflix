// import React from 'react'

// const Banner = ({ movie }) => {

//     return (
//         <div className='banner-item' style={{ backgroundImage: "url(" + `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie?.poster_path}` + ")" }}>

//             <div className='banner-info'>
//                 <h1>{movie?.title}</h1>
//                 <p>{movie?.overview}</p>
//             </div>
//         </div>
//     )
// }

// export default Banner

import React, { useState, useEffect } from 'react';

const Banner = ({ movie }) => {
    const [imageSize, setImageSize] = useState('w1920_and_h800_multi_faces');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 500) {
                setImageSize('original');
            } else if (window.innerWidth < 1200) {
                setImageSize('original');
            } else {
                // setImageSize('w1920_and_h800_multi_faces');
                setImageSize('original');
            }
        };

        handleResize(); // Call once on component mount to set initial size
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            className="banner-item"
            style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage:
                    "url(" + `https://www.themoviedb.org/t/p/${imageSize}${movie?.poster_path}` + ")",
            }}
        >
            <div className="banner-info">
                <h1>{movie?.title}</h1>
                <p>{movie?.overview}</p>
            </div>
        </div>
    );
};

export default Banner;