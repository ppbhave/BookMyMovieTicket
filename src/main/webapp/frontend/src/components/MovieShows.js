import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useHistory, useParams } from "react-router";
import "./styles/movieshows.css";
function MovieShows() {
    const movieId = useParams();
    const [movie, setMovie] = useState({ id: 0, sMovieName: "", sGenre: "", sScreenType: "", dReleaseDate: "", sDuration: "", sDescription: "", imgPath: "", sCast: "", sLanguages: "" });
    const [showDate, setShowDate] = useState(new Date("10/09/2021"));
    const [languages, setLanguages] = useState([]);
    const [formats, setFormats] = useState([]);
    const [language, setLanguage] = useState("");
    const [format, setFormat] = useState("");
    const [shows, setShows] = useState([]);
    const defaultDate = new Date("10/09/2021");
    const user = JSON.parse(sessionStorage.getItem("sessionUser"));

    useEffect(() => {
        fetch("http://localhost:8080/movie/" + movieId.id)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data);
            });
    }, []);
    const dateFormattedString = (showDate) => {
        var optvalue;
        if (showDate.getDate() < 10) {
            optvalue = showDate.getFullYear() + "0" + showDate.getDate();
        } else {
            optvalue = showDate.getFullYear() + "" + showDate.getDate();
        }
        if (showDate.getMonth() < 9) {
            optvalue += "0" + (showDate.getMonth() + 1);
        } else {
            optvalue += (showDate.getMonth() + 1);
        }
        return optvalue;
    }

    useEffect(() => {
        if (language.length > 0 && format.length > 0)
            fetch("http://localhost:8080/shows/" + movieId.id + "/" + dateFormattedString(showDate) + "/" + language + "/" + format)
                .then((response) => response.json())
                .then((data) => {
                    setShows(data);
                });
    }, [language, format, showDate]);

    useEffect(() => {
        var moviearr = movie.sLanguages.split(", ");
        var formatarr = movie.sScreenType.split(", ");
        setLanguages(moviearr);
        setFormats(formatarr);
        setLanguage(moviearr[0]);
        setFormat(formatarr[0]);
    }, [movie]);

    return (
        <div className="container page-content">
            <div className="section-heading section-title" id="alt">
                <h2>Shows</h2>
                <h4 id="movie-title">{movie.sMovieName}</h4>
            </div>

            <div id="show-page-container">

                <form className="show-filter-form">
                    <div className="row show-filter-components">
                        <div className="form-group col-md-2 showFilter">
                            <label for="language">Language</label>
                            <select id="language" className="form-control" value={language} onChange={(e) => { setLanguage(e.target.value) }}>
                                {languages.map((lang) => {
                                    return <option key={lang} value={lang}>{lang}</option>;
                                })}
                            </select>
                        </div>

                        <div className="form-group col-md-2 showFilter">
                            <label for="format">Format</label>
                            <select id="format" className="form-control" value={format} onChange={(e) => { setFormat(e.target.value) }}>
                                {formats.map((f) => {
                                    return <option key={f} value={f}>{f}</option>;
                                })}
                            </select>
                        </div>

                        <div className="form-group col-md-2 showFilter">
                            <label for="show_date">Day</label>
                            <DatePicker id="show_date" className="form-control"
                                dateFormat="dd MMM yyyy"
                                minDate={defaultDate}
                                selected={showDate}
                                onChange={date => { setShowDate(date) }} />
                        </div>

                    </div>
                </form>


                <section className="show-container">
                    {
                        shows.length ? shows.map(show => {
                            return show.length ? <ScreenShowCard showlist={show} movieid={movie.id} user={user}/> : <div></div>
                        }) : <div>No shows available</div>
                    }

                </section>
            </div>
        </div>
    );
}



function ScreenShowCard({ showlist,movieid, user }) {
    const jsDate = (timeString) => {
        var hourEnd = timeString.indexOf(":");
        var H = +timeString.substr(0, hourEnd);
        var h = H % 12 || 12;
        var ampm = H < 12 ? "AM" : "PM";
        return h + timeString.substr(hourEnd, 3) + ampm;
    }
    const history = useHistory();
    const historyPush = (url) => {
        history.push(url);
    }
    return (
        <div className="card shows-card">
            <div className="shows-card-header">
                <div className="shows-user">
                    <strong>{showlist[0].screen.theater.sName}</strong>
                </div>
                <div className="shows-rating">
                    {<i className="bx bx-map">GPS Location</i>}

                </div>
            </div>
            <div className="shows-card-body">
                <div className="row">
                    {showlist.map(show => {
                        const showId = show.id;
                        return (
                            <div className="col-md-2" key={show.id} >
                                <button className="btn btn-outline-info" onClick={() => {
                                    if (user === null) {
                                        historyPush("/login");
                                    } else {
                                        historyPush(`/movie/${movieid}/show/${showId}/booking`);
                                    }
                                }}>
                                    {jsDate(show.dStartTiming.split("T")[1])}
                                </button>
                            </div>
                        )
                    })

                    }
                </div>
            </div>
        </div>
    )
}
export default MovieShows;