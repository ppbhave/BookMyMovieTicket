import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./styles/reviews.css"
import WriteReviewModal from "./WriteReviewModal"
function Reviews() {
    const movieId = useParams();
    const user = {
        id: 2,
        sName: "Pranav Yadav",
        sGender: "Male",
        sEmail: "pranavpb.a97@gmail.com",
        sPhone: "9370867080"
    }
    const [reviewStat, setReviewStat] = useState({
        totalReviews: 0, ratingStat: [],
        movie: { id: 0, sMovieName: "", sGenre: "", sScreenType: "", dReleaseDate: "", sDuration: "", sDescription: "", imgPath: "", sCast: "", sPosterLink: "", sLanguages: "", sTrailer: "" }
    });
    const [reviewList, setReviewList] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/Reviews/stats/" + movieId.id)
            .then((response) => response.json())
            .then((data) => {
                setReviewStat(data)
            });
        fetch("http://localhost:8080/Reviews/" + movieId.id)
            .then((response) => response.json())
            .then((data) => {
                setReviewList(data);
                console.log(data)
            });
    }, []);
    const reviewRenderer = () => {
        if (reviewList.length > 0)
            return reviewList.map(rvw => { return <ReviewCard key={rvw.id} review={rvw} /> });
        else return <div style={{ alignSelf: "center" }}>Be the first one to write the review!</div>
    }

    const bgstyle = {
        backgroundImage: `linear-gradient(90deg, rgb(34, 34, 34) 24.97%, rgb(34, 34, 34) 38.3%, rgba(34, 34, 34, 0.04) 97.47%, rgb(34, 34, 34) 100%), url(${reviewStat.movie.sPosterLink})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    };

    return (
        <div className="reviews-component page-content">
            <div className="row" style={bgstyle}>
                <div className="col-lg-2 align-items-stretch movie-card-col review-movie-card-col">
                    <div className="review-movie-card">
                        <div className="review-movie-poster">
                            <img className="img-fluid" src={reviewStat.movie.sPosterLink} alt={reviewStat.movie.sMovieName} />
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 review-stats">
                    <section>{reviewStat.movie.sMovieName}</section>
                    <h4>Viewer Reviews</h4>
                    <section style={{ display: "flex", justifyContent: "center" }}>
                        <section><i className="bx bxs-star" style={{ color: "rgb(245, 197, 24)" }}></i>{reviewStat.totalReviews} avg rating</section>
                        &emsp;<section>{reviewStat.totalReviews} reviews&nbsp;</section>
                    </section>
                    <button className="write-review-button" data-toggle="modal" data-target="#writeReview"><i className="bx bx-plus-circle">Add your review</i></button>
                    <section>
                        <div style={{ display: "flex", justifyContent: "center" }} >
                            <section><i className="bx bxs-star" style={{ color: "rgb(245, 197, 24)" }}></i>{"1 - " + reviewStat.ratingStat[0]}</section>&emsp;
                            <section><i className="bx bxs-star" style={{ color: "rgb(245, 197, 24)" }}></i>{"2 - " + reviewStat.ratingStat[1]}</section>
                        </div>
                    </section>
                    <section style={{ display: "flex", justifyContent: "center" }} >
                        <section><i className="bx bxs-star" style={{ color: "rgb(245, 197, 24)" }}></i>{"3 - " + reviewStat.ratingStat[2]}</section>&emsp;
                        <section><i className="bx bxs-star" style={{ color: "rgb(245, 197, 24)" }}></i>{"4 - " + reviewStat.ratingStat[3]}</section>&emsp;
                        <section><i className="bx bxs-star" style={{ color: "rgb(245, 197, 24)" }}></i>{"5 - " + reviewStat.ratingStat[4]}</section>
                    </section>

                </div>
            </div>
            <WriteReviewModal film={movieId} user={user.id} />
            <div className="row review-container">
                {
                    reviewRenderer()
                }
            </div>
        </div>
    )
}
export default Reviews;

function ReviewCard({ review }) {

    return (
        <div className="card review-card">
            <div className="card-header">
                <div className="review-user">
                    {review.user.sName}
                </div>
                <div className="review-rating">
                    <i className="bx bxs-star" style={{ color: "rgb(245, 197, 24)" }}></i>{review.jRating}/5
                </div>
            </div>
            <div className="card-body">
                <p className="card-text">
                    <b>{review.sReviewSummery}</b>
                    <br />{review.sReview}
                </p>
            </div>
        </div>
    )
}

