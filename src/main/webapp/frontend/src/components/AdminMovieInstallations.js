import { useEffect, useRef, useState } from "react";
import "./styles/adminInstallation.css"

function AdminMovieInstallations() {
    const [installations, setInstallations] = useState([]);
    const [action, setAction] = useState("");
    const [formElement, showFormElement] = useState(false);
    const installedFetch = async () => {
        fetch("https://localhost:8443/admin/movies/screens/installed")
            .then((response) => response.json())
            .then((data) => {
                setInstallations(data);
            });
    };

    useEffect(() => {
        installedFetch();
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
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => { formEnvoke("Create") }}>Create Establishment</button>
            </div>

            <div className="row container">
                <div className="movietable-section col-lg-7">
                    <div className="movietable">
                        <h5>Movies running in theaters</h5>
                        <table className="table table-sm table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col" >Movie</th>
                                    <th scope="col" >screen</th>
                                    <th scope="col" ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    installations.map((m2s, i) => {
                                        return <EstablishmentTableRow key={m2s.id} establishment={m2s} index={i} formEnvoke={formEnvoke} refresh ={installedFetch}/>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="form-section col-lg-5">
                    {formElement ? <EstablishmentForm action={action} formVisible={showFormElement} refresh ={installedFetch} /> : <div></div>}
                </div>
            </div>
        </div>
    )
}
export default AdminMovieInstallations;

function EstablishmentTableRow({ establishment, index, formEnvoke, refresh }) {
    const deleteEstablishment = (m2s) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(m2s)
        };
        fetch("https://localhost:8443/admin/delete/installation", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data === "OK") {
                    refresh();
                }
            });
    }
    return (
        <tr>
            <th scope="row" style={{ width: "10%" }}>{index + 1}</th>
            <td style={{ width: "40%" }}>{establishment.movie.sMovieName + " (" + establishment.sLAnguage + "-" + establishment.sScreenType + ")"}</td>
            <td style={{ width: "40%" }}>{establishment.screen.theater.sName +"-" + establishment.screen.id }</td>
            <td style={{ width: "10%" }}>
                <i className="bx bx-edit-alt" style={{ cursor: "pointer" }} onClick={() => { formEnvoke("Edit") }}></i>
                <i className="bx bx-trash" style={{ cursor: "pointer", color: "orange" }} onClick={() => { deleteEstablishment(establishment) }}></i>
            </td>
        </tr>
    )
}

function EstablishmentForm({ action, formVisible, refresh }) {
    const m2sInForm = useRef({
        id: 0,
        movie: {sLanguages:"", sScreenType:""},
        screen: {},
        sLAnguage: "",
        sScreenType: ""
    });

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState({sLanguages:"", sScreenType:""});
    const [screens, setSereens] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [screentypes, setScreenTypes] = useState([]);

    useEffect(() => {
        let languages = selectedMovie.sLanguages.split(", ");
        m2sInForm.current.sLAnguage =languages[0];
        setLanguages(languages);
        let formats = selectedMovie.sScreenType.split(", ");
        m2sInForm.current.sScreenType =formats[0];
        setScreenTypes(formats);
    }, [selectedMovie])

    useEffect(() => {
        fetch("https://localhost:8443/movies")
            .then((response) => response.json())
            .then((data) => {
                setSelectedMovie(data[0]);
                m2sInForm.current.movie = data[0];
                setMovies(data);

            });
        fetch("https://localhost:8443/screens")
            .then((response) => response.json())
            .then((data) => {
                setSereens(data);
                m2sInForm.current.screen = data[0];
            });
    }, [])

    const [validationMsg, setValidationMsg] = useState("");

    const formValidation = (m2s) => {
        console.log(m2s);
        if (m2s.movie === {} || m2s.sLAnguage === "" || m2s.sScreenType === "" || m2s.screen === {})
            return false;
        return true;
    }

    const saveEstablishment = () => {
        if (action === "Create" && m2sInForm.current.id === 0) {
            if (formValidation(m2sInForm.current)) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(m2sInForm.current)
                };
                fetch("https://localhost:8443/admin/add/installation", requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data === "OK") {
                            refresh();
                            formVisible(false);
                        }
                    }).catch(setValidationMsg("The association already exists, or screen is occupied."));
            } else {
                setValidationMsg("One or more fields is not properly filled. \nPlease fill all the fields properly.")
            }

        } else {

        }
    }
    return (
        <form className="movie-form needs-validation">
            <h5>{action} the movie-screen establishment</h5>
            <div className="form-group">
                <label >movie</label>
                <select className="form-control selector" onChange={(e) => { m2sInForm.current.movie = movies[e.target.value]; setSelectedMovie(movies[e.target.value]) }}>
                    {
                        movies.map((movie,i) => {
                            return <option key={movie.id} value={i}>{movie.sMovieName}</option>
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <label >Screen</label>
                <select className="form-control selector" onChange={(e) => { m2sInForm.current.screen = screens[e.target.value] }}>
                    {
                        screens.map((screen,i) => {
                            return <option key={screen.id} value={i}>{screen.theater.sName + "-" + screen.id}</option>
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <label >Language</label>
                <select className="form-control selector" onChange={(e) => { m2sInForm.current.sLAnguage = e.target.value }}>
                    {
                        languages.map(lang => {
                            return <option key={lang} value={lang}>{lang}</option>
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <label >Screen Format</label>
                <select className="form-control selector" onChange={(e) => { m2sInForm.current.sScreenType = e.target.value }}>
                    {
                        screentypes.map(format => {
                            return <option key={format} value={format}>{format}</option>
                        })
                    }
                </select>
            </div>
            <div style={{ color: "red" }}>{validationMsg} </div>
            <div className="form-group row" style={{ justifyContent: "center" }}>
                <button type="button" className="btn btn-primary btn-sm" onClick={e => { e.preventDefault(); saveEstablishment() }}>save</button> &nbsp;
                <button type="button" className="btn btn-danger btn-sm" onClick={e => { e.preventDefault(); formVisible(false) }} >cancel</button>
            </div>

        </form>
    )
}

