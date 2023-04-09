import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-input-range/lib/css/index.css';
import { Route, Routes } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail';
import Movies from './pages/Movies';
import Home from './pages/Home';
import NavigationBar from './components/NavigationBar';


/*
Plan (making Netflix)
1. 3 pages: main homepage, movie page, movie detail page
2. banner on homepage
3. Main page:
    3-1. 3 movie lists by category ( popular, top rated, upcoming )
    3-2. when the mouse pointer on each movie, user can see brief movie information ( title, genre, rate, popularity, whether it's rated R. )
    3-3. movie list can be slided to show next movies
    3-4. Users can view detailed information about the movie by clicking on the movie card (Movie Detail page).
    3-5. User can search movie. sort, filter

4. Movie detail page:
    4-1. the movie poster, title, rating, popularity, whether it's rated R, a summary of the plot, budget, date, time, reviews, trailers, related movies, and more.
    4-2. trailer, review, related movies

*/



function App() {
  return (
    <div className='appbody'>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />

      </Routes>

    </div>
  );
}

export default App;
