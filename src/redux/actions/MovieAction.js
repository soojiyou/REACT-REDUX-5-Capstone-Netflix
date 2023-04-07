import api from "../api";

const API_KEY = process.env.REACT_APP_API_KEY;
function getMovies() {
    return async (dispatch) => {
        try {
            dispatch({ type: "GET_MOVIES_REQUEST" });

            // let urlPopular = "https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1";
            // let responsePopular = await fetch(urlPopular);
            // let dataPopular = await responsePopular.json();

            const movieApiPopular = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);

            const movieApiTopRated = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);

            const movieApiUpcoming = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);

            const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);

            let [popularMovies, topRatedMovies, upcomingMovies, genreList] = await Promise.all([movieApiPopular, movieApiTopRated, movieApiUpcoming, genreApi]);

            dispatch({
                type: "GET_MOVIES_SUCCESS",
                payload: { popularMovies: popularMovies.data, topRatedMovies: topRatedMovies.data, upcomingMovies: upcomingMovies.data, genreList: genreList.genres }
            })
        } catch {
            dispatch({ type: "GET_MOVIES_FAILURE" })
        }


    }
}

export const movieAction = {
    getMovies,
}