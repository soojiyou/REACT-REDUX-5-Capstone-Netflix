let initialState = {
    popularMovies: {},
    topRatedMovies: {},
    upcomingMovie: {},
    loading: true,
    genreList: [],
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
                genreList: payload.genreList
            };

        case "GET_MOVIES_FAILURE":
            return {
                ...state, loading: false,
            };
        default:
            return { ...state }
    }

}

export default movieReducer;