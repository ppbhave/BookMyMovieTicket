import { useEffect, useRef, useState } from "react";
import "./styles/adminMovieManagement.css"
function AdminMovieManagement() {
    const [movies, setMovies] = useState([]);
    const [action, setAction] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(-1);
    const movieObj = {
        id: 0,
        sMovieName: "",
        sGenre: "",
        sDescription: "",
        sTrailer: "",
        sCast: "",
        sScreenType: "",
        sLanguages: "",
        sDuration: "0h 00min",
        dReleaseDate: "",
        sPosterLink: ""
    }
    const [formElement, showFormElement] = useState(false);
    const moviesFetch = async () => {
        fetch("https://localhost:8443/movies")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
            });
    };

    useEffect(() => {
        moviesFetch();
    }, []);

    const formEnvoke = (envokeMethod) => {
        if (!formElement) {
            showFormElement(true);
            setAction(envokeMethod);
        }
    }

    return (
        <div className="admin-page-container">
            <div className="row">
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => { setSelectedMovie(-1); formEnvoke("Create") }}>Add new Movie</button>
            </div>

            <div className="row container">
                <div className="movietable-section col-lg-7">
                    <div className="movietable">
                        <h5>Movies running this week..</h5>
                        <table className="table table-sm table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col" >Movie</th>
                                    <th scope="col" >Released</th>
                                    <th scope="col" >Languagess</th>
                                    <th scope="col" >Format</th>
                                    <th scope="col" ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    movies.map((movie, i) => {
                                        return <MovieTableRow key={movie.id} movie={movie} index={i} formEnvoke={formEnvoke} refresh={moviesFetch} setSelectedMovie={setSelectedMovie} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="form-section col-lg-5">
                    {formElement ? <MovieForm action={action} formVisible={showFormElement} editMovie={selectedMovie === -1 ? movieObj : movies[selectedMovie]} refresh={moviesFetch} /> : <div></div>}
                </div>
            </div>
        </div>
    )
}
export default AdminMovieManagement;

function MovieTableRow({ movie, index, formEnvoke, refresh, setSelectedMovie }) {
    const deleteMovie = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movie)
        };
        fetch("https://localhost:8443/admin/delete/movie", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data === "OK") {
                    refresh();
                } else {
                    alert("The delete could not be performed. Make sure to remove following dependencies: screens, shows")
                }
            });
    }
    return (
        <tr>
            <th scope="row" style={{ width: "10%" }}>{index + 1}</th>
            <td style={{ width: "20%" }}>{movie.sMovieName}</td>
            <td style={{ width: "20%" }}>{movie.dReleaseDate}</td>
            <td style={{ width: "20%" }}>{movie.sLanguages}</td>
            <td style={{ width: "20%" }}>{movie.sScreenType}</td>
            <td style={{ width: "10%" }}>
                <i className="bx bx-edit-alt" style={{ cursor: "pointer" }} onClick={() => { setSelectedMovie(index); formEnvoke("Edit") }}></i>
                <i className="bx bx-trash" style={{ cursor: "pointer", color: "orange" }} onClick={deleteMovie}></i>
            </td>
        </tr>
    )
}

function MovieForm({ action, formVisible, editMovie, refresh }) {
    const movieInForm = useRef(editMovie);

    const [validationMsg, setValidationMsg] = useState("");

    const typeConverter = useRef({
        duration: { hh: editMovie.sDuration.split("h ")[0], mins: editMovie.sDuration.split("h ")[1].substring(0, 2) },
        format: editMovie.sScreenType === "" ? [] : editMovie.sScreenType.split(", ")
    });

    const handleFormat = (e) => {
        if (e.target.checked) { typeConverter.current.format.push(e.target.value) }
        else { typeConverter.current.format.splice(typeConverter.current.format.indexOf(e.target.value), 1) }
    }
    const formatCollector = (formatArr) => {
        let str = "";
        for (let i = 0; i < formatArr.length; i++) {
            if (i > 0) {
                str += ", ";
            }
            str += formatArr[i];
        }
        return str;
    };

    const formValidation = (movie) => {
        console.log(movie)
        if (movie.sDuration === "" || movie.sMovieName === "" || movie.sDescription === "" || movie.dReleaseDate === "" || movie.sTrailer === "" || movie.sGenre === "" || movie.sLanguages === "" || movie.sScreenType === "" || movie.sCast === "" || movie.sPosterLink === "" || movie.sTrailer == "")
            return false;
        return true;
    }

    const saveMovie = () => {
        movieInForm.current.sScreenType = formatCollector(typeConverter.current.format);
        movieInForm.current.sDuration = typeConverter.current.duration.hh + "h " + typeConverter.current.duration.mins + " min";
        let url, method
        if (action === "Create" && movieInForm.current.id === 0) {
            url = "https://localhost:8443/admin/add/movie";
            method = "POST";
        } else {
            url = "https://localhost:8443/admin/update/movie";
            method = "PUT";
        }
        if (formValidation(movieInForm.current)) {
            const requestOptions = {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movieInForm.current)
            };
            fetch(url, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data === "OK") {
                        refresh();
                        formVisible(false);
                    } else {
                        setValidationMsg("Something went wrong.")
                    }
                });
        } else {
            setValidationMsg("One or more fields is not properly filled. \nPlease fill all the fields properly.")
        }


    }
    return (
        <form className="movie-form needs-validation">
            <h5>{action} the movie</h5>
            <div className="form-group">
                <label >Name</label>
                <input type="text" className="form-control" placeholder="name of the movie" defaultValue={movieInForm.current.sMovieName} onChange={(e) => { movieInForm.current.sMovieName = e.target.value }} required />
            </div>
            <div className="form-group">
                <label >Released:</label>
                <div className="row" style={{ justifyContent: "center" }}>
                    <input type="date" className="form-control col-sm-5" defaultValue={movieInForm.current.dReleaseDate} onChange={e => { movieInForm.current.dReleaseDate = e.target.value }} />
                </div>
            </div>
            <div className="form-group">
                <label>duration</label>
                <div className="row" style={{ justifyContent: "center" }}>
                    <input type="number" className="form-control col-sm-2" min="0" max="3" step="1" defaultValue={parseInt(typeConverter.current.duration.hh)} onChange={e => { typeConverter.current.duration.hh = e.target.value }} required />:
                    <input type="number" className="form-control col-sm-2" min="0" max="59" step="1" defaultValue={parseInt(typeConverter.current.duration.mins)} onChange={e => { typeConverter.current.duration.mins = e.target.value }} required />
                </div>
            </div>
            <div className="form-group">
                <label >Cast</label>
                <input type="text" className="form-control" placeholder="cast separated by comma" defaultValue={movieInForm.current.sCast} onChange={(e) => { movieInForm.current.sCast = e.target.value }} required />
            </div>
            <div className="form-group">
                <label>Genre</label>
                <input type="text" className="form-control" placeholder="Genre separated by comma" defaultValue={movieInForm.current.sGenre} onChange={(e) => { movieInForm.current.sGenre = e.target.value }} required />
            </div>
            <div className="form-group">
                <label>Languages</label>
                <input type="text" className="form-control" placeholder="languages separated by comma" defaultValue={movieInForm.current.sLanguages} onChange={(e) => { movieInForm.current.sLanguages = e.target.value }} required />
            </div>
            <div>
                <label >Formats available </label> &nbsp;&nbsp;
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="2D" checked={typeConverter.current.format.indexOf("2D") >= 0 ? true : false} onChange={(e) => handleFormat(e)} />
                    <label className="form-check-label" >2D</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="3D" checked={typeConverter.current.format.indexOf("3D") >= 0 ? true : false} onChange={(e) => handleFormat(e)} />
                    <label className="form-check-label" >3D</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="iMax" checked={typeConverter.current.format.indexOf("iMax") >= 0 ? true : false} onChange={(e) => handleFormat(e)} />
                    <label className="form-check-label" >iMax</label>
                </div>
            </div>
            <div className="form-group">
                <label >Description</label>
                <textarea className="form-control" rows="3" maxLength="250" defaultValue={movieInForm.current.sDescription} onChange={(e) => movieInForm.current.sDescription = e.target.value}></textarea>
            </div>
            <div className="form-group">
                <label >Poster (link)</label>
                <input type="text" className="form-control" placeholder="link for the poster" defaultValue={movieInForm.current.sPosterLink} onChange={(e) => { movieInForm.current.sPosterLink = e.target.value }} />
            </div>
            <div className="form-group">
                <label >Video links separated by (;)</label>
                <input type="text" className="form-control" defaultValue={movieInForm.current.sTrailer} placeholder="link for the trailer" onChange={(e) => { movieInForm.current.sTrailer = e.target.value }} />
            </div>
            <div style={{ color: "red" }}>{validationMsg} </div>
            <div className="form-group row" style={{ justifyContent: "center" }}>
                <button type="button" className="btn btn-primary btn-sm" onClick={e => { e.preventDefault(); saveMovie() }}>save</button> &nbsp;
                <button type="button" className="btn btn-danger btn-sm" onClick={e => { e.preventDefault(); formVisible(false) }} >cancel</button>
            </div>

        </form>
    )
}
