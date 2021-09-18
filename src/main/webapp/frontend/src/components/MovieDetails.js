import { useEffect, useState } from "react";
import "./styles/moviedetails.css"
function MovieDetails() {
    const movieId = 2;
    const [movie, setMovie] = useState({ id: 0, sMovieName: "", sGenre: "", sScreenType: "", dReleaseDate: "", sDuration: "", sDescription: "", imgPath: "", sCast:"" });
    useEffect(() => {
        fetch("http://localhost:8080/movie/" + movieId)
            .then((response) => response.json())
            .then((data) => {
                setMovie({ ...data, imgPath: "../../images/" + data.sMovieName + ".jpg" });
            });
    }, []);
  const imageUrl =""+movie.imgPath;
{console.log(imageUrl,movie.imgPath)}
  const bgstyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  };
    return (
        <div className="movie-details-component">
            <div className="row" 
            style={bgstyle}
            >
                <div className="col-lg-3 col-md-6 d-flex align-items-stretch movie-card-col">
                    <div className="movie-card">
                        <div className="movie-poster">
                            <img className="img-fluid" src={movie.imgPath} alt={movie.sMovieName} />
                        </div>
                        <div className="movie-card-bottom">
                            <div className="movie-card-bottom-label">{movie.dReleaseDate}</div>
                            <div className="movie-card-bottom-label"></div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6 moviedetails">
                    <h2>{movie.sMovieName}</h2>
                    <section>{movie.sDuration}</section>
                    <section style={{ padding: "2px", border: "2px solid green", borderRadius: "15px" }}>
                        Review link text</section>
                    <section>{movie.sScreenType}</section>
                    <section>{movie.sLanguages}</section>
                    <section> {movie.sGenre}</section>
                    <section>{movie.sCast}</section>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-9 movie-description">
                    <h2>About the movie</h2>
                    <div>
                        {movie.sDescription}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MovieDetails;