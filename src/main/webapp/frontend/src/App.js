import Header from './components/Header';
import './App.css';
// import MovieDetails from './components/MovieDetails';
// import MovieShows from './components/MovieShows';
// import UserRegistration from './components/UserRegistration'
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container page-content">
      {/* <MovieCards/> 
      <MovieDetails/>
      <MovieShows />
      <UserRegistration/>*/}
      <Login/>
      </div>
    </div>
  );
}

export default App;