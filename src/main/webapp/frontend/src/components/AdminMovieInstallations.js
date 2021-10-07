import { useEffect, useRef, useState } from "react";
import "./styles/adminInstallation.css"

function AdminMovieInstallations() {
    const defaultM2S = {
        id: 0,
        movie: { sLanguages: "", sScreenType: "" },
        screen: {},
        sLanguage: "",
        sScreenType: ""
    };
    const [installations, setInstallations] = useState([]);
    const [m2s, setm2s] = useState(defaultM2S);
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
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => { setm2s(defaultM2S); formEnvoke("Create") }}>Create Establishment</button>
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
                                        return <EstablishmentTableRow key={m2s.id} establishment={m2s} index={i} formEnvoke={formEnvoke} refresh={installedFetch} setm2s={setm2s} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="form-section col-lg-5">
                    {formElement ? <EstablishmentForm m2s={m2s} action={action} formVisible={showFormElement} refresh={installedFetch} /> : <div></div>}
                </div>
            </div>
        </div>
    )
}
export default AdminMovieInstallations;

function EstablishmentTableRow({ establishment, index, formEnvoke, refresh, setm2s }) {
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
                } else {
                    alert("The delete could not be performed. Make sure to remove following dependencies: shows.")
                }
            });
    }
    return (
        <tr>
            <th scope="row" style={{ width: "10%" }}>{index + 1}</th>
            <td style={{ width: "40%" }}>{establishment.movie.sMovieName + " (" + establishment.sLanguage + "-" + establishment.sScreenType + ")"}</td>
            <td style={{ width: "40%" }}>{establishment.screen.theater.sName + "-" + establishment.screen.id}</td>
            <td style={{ width: "10%" }}>
                <i className="bx bx-edit-alt" style={{ cursor: "pointer" }} onClick={() => { setm2s(establishment); formEnvoke("Edit") }}></i>
                <i className="bx bx-trash" style={{ cursor: "pointer", color: "orange" }} onClick={() => { deleteEstablishment(establishment) }}></i>
            </td>
        </tr>
    )
}

function EstablishmentForm({ m2s, action, formVisible, refresh }) {
    const m2sInForm = useRef(m2s);

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(m2sInForm.current.movie);
    const [screens, setSereens] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [screentypes, setScreenTypes] = useState([]);

    useEffect(() => {
        let languages = selectedMovie.sLanguages.split(", ");
        if (m2sInForm.current.sLanguage === "") { m2sInForm.current.sLanguage = languages[0]; }
        setLanguages(languages);
        let formats = selectedMovie.sScreenType.split(", ");
        if (m2sInForm.current.sScreenType === "") { m2sInForm.current.sScreenType = formats[0]; }
        setScreenTypes(formats);
    }, [selectedMovie])

    useEffect(() => {

        fetch("https://localhost:8443/movies")
            .then((response) => response.json())
            .then((data) => {
                if (action === "Create") {
                    setSelectedMovie(data[0]);
                    m2sInForm.current.movie = data[0];
                }
                setMovies(data);

            });
        fetch("https://localhost:8443/screens")
            .then((response) => response.json())
            .then((data) => {
                setSereens(data);
                if (m2sInForm.current.screen === {}) { m2sInForm.current.screen = data[0]; }
            });
    }, [])

    const [validationMsg, setValidationMsg] = useState("");

    const formValidation = (m2s) => {
        console.log(m2s);
        if (m2s.movie === {} || m2s.sLanguage === "" || m2s.sScreenType === "" || m2s.screen === {})
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
                        movies.map((movie, i) => {
                            return <option key={movie.id} value={i} selected={selectedMovie === movie}>{movie.sMovieName}</option>
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <label >Screen</label>
                <select className="form-control selector" onChange={(e) => { m2sInForm.current.screen = screens[e.target.value] }}>
                    {
                        screens.map((screen, i) => {
                            return <option key={screen.id} value={i} selected={m2sInForm.current.screen === screen}>{screen.theater.sName + "-" + screen.id}</option>
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <label >Language</label>
                <select className="form-control selector" defaultValue={m2sInForm.current.sLanguages} onChange={(e) => { m2sInForm.current.sLanguage = e.target.value }}>
                    {
                        languages.map(lang => {
                            return <option key={lang} value={lang} selected={m2sInForm.current.sLanguage === lang}>{lang}</option>
                        })
                    }
                </select>
            </div>

            <div className="form-group">
                <label >Screen Format</label>
                <select className="form-control selector" onChange={(e) => { m2sInForm.current.sScreenType = e.target.value }}>
                    {
                        screentypes.map(format => {
                            return <option key={format} value={format} selected={m2sInForm.current.sScreenType === format}>{format}</option>
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

