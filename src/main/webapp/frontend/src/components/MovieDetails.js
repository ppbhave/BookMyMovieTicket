import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import "./styles/moviedetails.css"
function MovieDetails() {
    const movieId = useParams();
    const history = useHistory();
    const [reviewStat, setReviewStat] = useState({
        totalReviews: 0, ratingStat: [],
        movie: { id: 0, sMovieName: "", sGenre: "", sScreenType: "", dReleaseDate: "", sDuration: "", sDescription: "", imgPath: "", sCast: "", sPosterLink: "", sLanguages: "", sTrailer: "" }
    });
    const avgRating=(reviewStat)=>{
        let avgR=0;
        reviewStat.ratingStat.forEach(stars => {
            avgR+=stars;
        });
        return avgR/reviewStat.totalReviews;
}
    useEffect(() => {
        fetch("https://localhost:8443/Reviews/stats/" + movieId.id)
            .then((response) => response.json())
            .then((data) => {
                setReviewStat(data)
            });
    }, []);
    const bgstyle = {
        backgroundImage: `linear-gradient(90deg, rgb(34, 34, 34) 24.97%, rgb(34, 34, 34) 38.3%, rgba(34, 34, 34, 0.04) 97.47%, rgb(34, 34, 34) 100%), url(${reviewStat.movie.sPosterLink})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };
    const historyPush = (url) => {
        history.push(url);
    }
    return (
        <div className="movie-details-component page-content">
            <div className="row movie-details-poster-area"
                style={bgstyle}
            >
                <div className="col-lg-3  d-flex align-items-stretch movie-card-col">
                    <div className="movie-details-card" data-toggle="modal" data-target="#trailerModal">
                        <div className="movie-poster">
                            <img className="img-fluid" src={reviewStat.movie.sPosterLink} alt={reviewStat.movie.sMovieName} />
                            <div className="trailer-link"><i className="bx bx-play">Trailer</i></div>
                        </div>
                        <div className="movie-card-bottom">
                            <div className="movie-card-bottom-label">{reviewStat.movie.dReleaseDate}</div>
                            <div className="movie-card-bottom-label"></div>
                        </div>
                    </div>
                </div>
                <TrailerModal movie={reviewStat.movie} />

                <div className="col-lg-6 moviedetails">
                    <h2>{reviewStat.movie.sMovieName}</h2>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ padding: "10px", border: "2px solid green", borderRadius: "15px", display: "flex", justifyContent: "center", width: "fit-content", cursor: "pointer" }}
                            onClick={() => { historyPush(`/movie/${reviewStat.movie.id}/reviews`) }}>
                            <section><strong> <i className="bx bxs-star" style={{ color: "yellow" }}></i>{avgRating(reviewStat)}</strong></section>&emsp;
                            <section>{reviewStat.totalReviews} reviews {" >"}</section>
                        </div>
                    </div>
                    <section style={{ display: "flex", justifyContent: "center" }}>
                        <section className="detail-strip">{reviewStat.movie.sScreenType}</section>&emsp;
                        <section className="detail-strip">{reviewStat.movie.sLanguages}</section>
                    </section>
                    <section style={{ display: "flex", justifyContent: "center" }}>
                        <div>&bull;&nbsp;{reviewStat.movie.sDuration}</div>&emsp;
                        <div>&bull;&nbsp;{reviewStat.movie.sGenre}</div>
                    </section>
                    <section>{reviewStat.movie.sCast}</section>
                    <button type="button" className="btn btn-primary book-show-button" onClick={() => { historyPush(`/movie/${reviewStat.movie.id}/shows`) }}
                    > Book tickets</button>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-10 movie-description">
                    <h2>About the movie</h2>
                    <div>
                        {reviewStat.movie.sDescription}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MovieDetails;

function TrailerModal({ movie }) {
    return (
        <div className="modal fade trailerModal" id="trailerModal" tabIndex="-1" role="dialog" aria-labelledby="trailerModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg trailerModal-dialog" role="document">
                <div className="modal-content trailerModal-content">
                    <div className="modal-header trailerModal-header">
                        <h5 className="modal-title trailerModal-title"> {movie.sMovieName}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body trailerModal-body">
                        {
                            movie.sTrailer.split(";").map((trailer, i) => <div className="iframe-container" key={i}>
                                <h5 >Video {i + 1}</h5>
                                <iframe className="iframe" src={trailer}
                                    title={i} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>)
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}