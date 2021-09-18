import { useEffect, useState } from "react";
import "./styles/moviecards.css";
function MovieCards() {
    const [movies, setMovies] = useState([]);
    const [languageFiltered, setlanguage] = useState("none");
    const [GenreFiltered, setGenre] = useState("none");
    const [formatFiltered, setFormat] = useState("none")
    const movieCardFetch = async () => {
        fetch("http://localhost:8080/movies")
            .then((response) => response.json())
            .then((data) => {
                let arr = [];
                data.forEach(movie => {
                    arr.push({ ...movie, imgPath: "../../images/" + movie.sMovieName + ".jpg" })
                });
                console.log(arr);
                setMovies(arr);
            });
    };

    useEffect(() => {
        movieCardFetch();
    }, []);

    return (
        <div>
            <section className="area-title">Movies in Cinemas</section>
            <div className="container row">
                <div className="moviecard-section col-lg-9 col-md-9">
                    <div className="movie-cards-container">
                        {
                            movies.map(movie => {
                                if (languageFiltered == "none" || movie.sLanguages.indexOf(languageFiltered) >= 0) {
                                    if (GenreFiltered == "none" || movie.sGenre.indexOf(GenreFiltered) >= 0) {
                                        if (formatFiltered == "none" || movie.sScreenType.indexOf(formatFiltered) >= 0) {
                                            return <MovieCard key={movie.id} movie={movie} />
                                        }
                                    }
                                }
                            })
                        }
                    </div>
                </div>

                <div className="col-lg-3 col-md-3 movie-filter">
                    <section className="area-title">Filters</section>
                    <form>
                        <div className="form-group col-md-2">
                            <label for="language">Language</label>
                            <select id="language" className="form-control filter"
                                onChange={(e) => setlanguage(e.target.value)}>
                                <option value="none">Any</option>
                                <option value="Hindi">Hindi</option>
                                <option value="English">English</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label for="format">Format</label>
                            <select id="format" className="form-control filter"
                                onChange={(e) => setFormat(e.target.value)}>
                                <option value="none">Any</option>
                                <option value="2D">2D</option>
                                <option value="3D">3D</option>
                                <option value="iMax">iMax</option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label for="genre">Genre</label>
                            <select id="genre" className="form-control filter"
                                onChange={(e) => setGenre(e.target.value)}>
                                <option value="none">Any</option>
                                <option value="Action">Action</option>
                                <option value="Horror">Horror</option>
                                <option value="Fantacy">Fantacy</option>
                                <option value="Crime">Crime</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Biopic">Biopic</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

function MovieCard({ movie }) {
    return (
        <div className="d-flex align-items-stretch movie-card-col">
            <div className="movie-card">
                <div className="movie-poster">
                    <img className="img-fluid" src={movie.imgPath} alt={movie.sMovieName} />
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