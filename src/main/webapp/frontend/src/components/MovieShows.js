import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import "./styles/movieshows.css";
function MovieShows() {
    const movieId = 2;
    const [movie, setMovie] = useState({ id: 0, sMovieName: "", sGenre: "", sScreenType: "", dReleaseDate: "", sDuration: "", sDescription: "", imgPath: "", sCast: "", sLanguages: "" });
    const [showDate, setShowDate] = useState(new Date("10/09/2021"));
    const [languages, setLanguages] = useState([]);
    const [formats, setFormats] = useState([]);
    const [language, setLanguage] = useState("");
    const [format, setFormat] = useState("");
    const [shows, setShows] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/movie/" + movieId)
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
            fetch("http://localhost:8080/shows/" + movieId + "/" + dateFormattedString(showDate) + "/" + language + "/" + format)
                .then((response) => response.json())
                .then((data) => {
                    setShows(data);
                    console.log(data);
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
        <div className="container">
            <div className="section-heading section-title" id="alt">
                <h2>Shows</h2>
                <h4 id="movie-title"></h4>
            </div>

            <div id="show-page-container">
                <div >
                    <form className="show-filter">
                        <div className="row show-filter-components">
                            <div className="form-group col-md-2">
                                <label for="language">Language</label>
                                <select id="language" className="form-control" value={language} onChange={(e) => { setLanguage(e.target.value) }}>
                                    {languages.map((lang) => {
                                        return <option key={lang} value={lang}>{lang}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group col-md-2">
                                <label for="format">Format</label>
                                <select id="format" className="form-control" value={format} onChange={(e) => { setFormat(e.target.value) }}>
                                    {formats.map((f) => {
                                        return <option key={f} value={f}>{f}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="form-group col-md-2">
                                <label for="show_date">Day</label>
                                <DatePicker id="show_date" className="form-control"
                                    dateFormat="dd MMM yyyy"
                                    minDate={showDate}
                                    selected={showDate}
                                    onChange={date => { setShowDate(date) }} />
                            </div>

                        </div>
                    </form>

                    <div className="row" id="dates">

                    </div>

                </div>
                <section className="show-container">
                    {
                        shows.map(show => {
                            return (show.length ? <ScreenShowCard showlist={show} /> : <div>No shows available</div>)
                        })
                    }

                </section>
            </div>
        </div>
    );
}



function ScreenShowCard({ showlist }) {
    const jsDate = (sdate) => {
        var shdate=new Date(sdate);
     return shdate.getHours()>12 ?   shdate.getHours()-12+":"+shdate.getMinutes()+" pm": shdate.getHours()+":"+shdate.getMinutes()+" pm"
    }
    return (
        <div className="card shows-card">
            <div className="card-header">
                <div className="shows-user">
                        <strong>{showlist[0].screen.theater.sName}</strong>
                </div>
                    <div className="shows-rating">
                        {<i className="bx bx-map">GPS Location</i>}
                    
                    </div>
            </div>
            <div className="card-body">
                <div className="row">
                    {  showlist.map(show => {
                        return (
                            <div className="col-md-2" key={show.id}>
                            <button className="btn btn-outline-info">
                           { jsDate(show.dStartTiming)}
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