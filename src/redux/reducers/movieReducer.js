let initialState = {
    popularMovies: {},
    topRatedMovies: {},
    upcomingMovie: {},
    loading: true,
    genreList: [],
    movieDetail: {},
    movieReview: {},
    movieRecommand: {},
    movieVideo: {},
}

function movieReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case "GET_MOVIES_REQUEST":
            return {
                ...state, loading: true,
            };
        case "GET_MOVIES_SUCCESS":
            return {
                ...state,
                popularMovies: payload.popularMovies,
                topRatedMovies: payload.topRatedMovies,
                upcomingMovies: payload.upcomingMovies,
                loading: false,
                genreList: payload.genreList,

            };
        case "GET_MOIVE_DETAIL_REQUEST":
            return {
                ...state,
                movieDetail: payload.movieDetail,
                movieReview: payload.movieReview,
                movieRecommand: payload.movieRecommand,
                movieVideo: payload.movieVideo,
                loading: false,

            }

        case "GET_MOVIES_FAILURE":
            return {
                ...state, loading: false,
            };
        default:
            return { ...state }
    }

}

export default movieReducer;