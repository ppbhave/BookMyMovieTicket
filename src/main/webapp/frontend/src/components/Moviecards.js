import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles/moviecards.css";
function MovieCards() {
    const [movies, setMovies] = useState([]);
    const [languageArr, setlanguageArr] = useState([]);
    const [genreArr, setGenreArr] = useState([]);
    const [formatArr, setFormatArr] = useState([]);
    const [languageFiltered, setlanguage] = useState("none");
    const [GenreFiltered, setGenre] = useState("none");
    const [formatFiltered, setFormat] = useState("none");
    const history = useHistory();
    const movieCardFetch = async () => {
        fetch("http://localhost:8080/movies")
            .then((response) => response.json())
            .then((data) => {
                let langArr = [];
                let genreArr = [];
                let formatArr = [];
                data.forEach(movie => {
                    movie.sLanguages.split(", ").forEach(lang => { if (langArr.indexOf(lang) === -1) langArr.push(lang) }
                    );
                    movie.sGenre.split(", ").forEach(genre => { if (genreArr.indexOf(genre) === -1) genreArr.push(genre) }
                    );
                    movie.sScreenType.split(", ").forEach(screen => { if (formatArr.indexOf(screen) === -1) formatArr.push(screen) }
                    );
                });
                setMovies(data);
                setlanguageArr(langArr);
                setGenreArr(genreArr);
                setFormatArr(formatArr);
            });
    };

    useEffect(() => {
        movieCardFetch();
    }, []);

    return (
        <div className="page-content">
            <section className="area-title">Movies in Cinemas</section>
            <div className="container row">
                <div className="moviecard-section col-lg-9 col-md-9">
                    <div className="movie-cards-container">
                        {
                            movies.map(movie => {
                                if (languageFiltered === "none" || movie.sLanguages.indexOf(languageFiltered) >= 0) {
                                    if (GenreFiltered === "none" || movie.sGenre.indexOf(GenreFiltered) >= 0) {
                                        if (formatFiltered === "none" || movie.sScreenType.indexOf(formatFiltered) >= 0) {
                                            return <MovieCard key={movie.id} movie={movie} history={history} />
                                        }
                                    }
                                }
                            })
                        }
                    </div>
                </div>

                <div className="col-lg-3 col-md-3 moviecards-filter">
                    <section className="area-title">Filters</section>
                    <form>
                        <div className="form-group col-md-2">
                            <label htmlFor="language">Language</label>
                            <select id="language" className="form-control filter"
                                onChange={(e) => setlanguage(e.target.value)}>
                                <option value="none">Any</option>
                                {
                                    languageArr.map(lang => { return <option key={lang} value={lang}>{lang}</option> })
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="format">Format</label>
                            <select id="format" className="form-control filter"
                                onChange={(e) => setFormat(e.target.value)}>
                                <option value="none">Any</option>
                                {
                                    formatArr.map(screen => { return <option key={screen} value={screen}>{screen}</option> })
                                }
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="genre">Genre</label>
                            <select id="genre" className="form-control filter"
                                onChange={(e) => setGenre(e.target.value)}>
                                <option value="none">Any</option>
                                {
                                    genreArr.map(genre => { return <option key={genre} value={genre}>{genre}</option> })
                                }
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function MovieCard({ movie, history }) {
    const movieDetails = (id) => {
        history.push(`/movie/${id}`);
    }
    return (
        <div className="d-flex align-items-stretch movie-card-col movie-card-list-col" onClick={()=>{movieDetails(movie.id)}}>
            <div className="movie-card">
                <div className="movie-poster">
                    <img className="img-fluid" src={movie.sPosterLink} alt={movie.sMovieName} />
                </div>
                <div className="movie-info">
                    <h4>{movie.sMovieName}</h4>
                    <span>{movie.sGenre}</span>
                </div>
            </div>

        </div>
    )
}
export default MovieCards;