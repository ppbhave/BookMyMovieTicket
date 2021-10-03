import { useEffect, useRef, useState } from "react";
// import MapModal from "./MapContainerElement";
import "./styles/theaterManagement.css"
function AdminTheaterManagement() {
    const [theaters, setTheaters] = useState([]);
    const [action, setAction] = useState("");
    const [theaterFormElement, showTheaterFormElement] = useState(false);
    // const [MapContainerElement, setMapContainerElement] = useState(false);
    const [theaterSelected, setTheaterSelected] = useState({ id: 0, sName: "", sGpsLocation: "", jTotalSeats: 0 });
    const theaterListFetch = async () => {
        fetch("http://localhost:8080/admin/theaters")
            .then((response) => response.json())
            .then((data) => {
                setTheaters(data);
            });
    };

    useEffect(() => {
        theaterListFetch();
    }, []);

    const formEnvoke = (envokeMethod) => {
        if (!theaterFormElement) {
            showTheaterFormElement(true);
            setAction(envokeMethod);
        }
    }

    return (
        <div className="admin-page-container">
            <div className="row">
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => { formEnvoke("Create") }}>Add new Theater</button>
            </div>

            <div className="row container">
                <div className="theater-table-section col-lg-7">
                    <div className="movietable">
                        <h5>Theaters affiliated</h5>
                        <table className="table table-sm table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col" >Name</th>
                                    <th scope="col" >screens</th>
                                    <th scope="col" ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    theaters.map((theater, i) => {
                                        return <TheaterTableRow key={theater.id} theater={theater} index={i} formEnvoke={formEnvoke} refresh={setTheaters} />
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="form-section col-lg-5">
                    {theaterFormElement ? <TheaterForm action={action} theaterSelected={theaterSelected} formVisible={showTheaterFormElement} refresh={theaterListFetch} /> : <div></div>}
                    {/* {MapContainerElement ? <MapContainerElement theater={theaterSelected} containerVisibility={showTheaterFormElement} /> : <div></div>} */}
                </div>
            </div>
        </div>
    )
}
export default AdminTheaterManagement;

function TheaterTableRow({ theater, index, formEnvoke, refresh }) {
    return (
        <tr>
            <th scope="row" style={{ width: "10%" }}>{index + 1}</th>
            <td style={{ width: "50%" }}>{theater.sName}</td>
            <td style={{ width: "10%" }}>{theater.jNoOfScreens}</td>
            <td style={{ width: "30%" }}>
                <i className="bx bx-edit-alt" style={{ cursor: "pointer" }} onClick={() => { formEnvoke("Edit") }}></i>
                {/* <i className='bx bx-tv' style={{ cursor: "pointer", color: "blue" }} data-toggle="tooltip" data-placement="bottom" title="check map location" onClick={e=>{setTheaterProp(theater); setMapOnOff(true)}}></i> */}
                <i className='bx bx-tv' data-target="#screenModal" data-toggle="modal" style={{ cursor: "pointer", color: "blue" }} ></i>
                <i className="bx bx-trash" style={{ cursor: "pointer", color: "orange" }}></i>
            </td>
            <ScreenForm theater={theater} refresh={refresh} />
        </tr>
    )
}

function TheaterForm({ action, theaterSelected, formVisible, refresh }) {
    const theaterInForm = useRef({
        id: 0,
        sName: "",
        sGpsLocation: "",
        jNoOfScreens: 0
    });

    useEffect(() => {
        if (action === "Edit") {
            theaterInForm.current = theaterSelected;
        }
    }, [])

    const [validationMsg, setValidationMsg] = useState("");

    const formValidation = (theater) => {
        if (theater.sName === "" || theater.sGpsLocation === "")
            return false;
        let arr = theater.sGpsLocation.split(", ");
        if (arr.length < 2) return false;
        if (arr[0].split(".").length < 2 || arr[1].split(".").length < 2)
            return false;
        return true;
    }

    const saveMovie = () => {
        if (action === "Create" && theaterInForm.current.id === 0) {
            if (formValidation(theaterInForm.current)) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(theaterInForm.current)
                };
                fetch("http://localhost:8080/admin/add/theater", requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data === "OK") {
                            formVisible(false);
                            refresh();
                        }
                    });
            } else {
                setValidationMsg("One or more fields is not properly filled. \nPlease fill all the fields properly.")
            }

        } else {

        }
    }
    return (
        <form className="movie-form needs-validation">
            <h5>{action} the theater</h5>
            <div className="form-group">
                <label >Name</label>
                <input type="text" className="form-control" placeholder="name of the theaer with short address" onChange={(e) => { theaterInForm.current.sName = e.target.value }} required />
            </div>
            <div className="form-group">
                <label >GPS location:</label>
                <input type="text" className="form-control" placeholder="in format - lat, long" onChange={(e) => { theaterInForm.current.sGpsLocation = e.target.value }} required />
            </div>
            <div style={{ color: "red" }}>{validationMsg} </div>
            <div className="form-group row" style={{ justifyContent: "center" }}>
                <button type="button" className="btn btn-primary btn-sm" onClick={e => { e.preventDefault(); saveMovie() }}>save</button> &nbsp;
                <button type="button" className="btn btn-danger btn-sm" onClick={e => { e.preventDefault(); formVisible(false) }} >cancel</button>
            </div>

        </form>
    )
}

function ScreenForm({ theater, refresh }) {
    const seatInForm = useRef({
        id: 0,
        jTotalSeats: 0,
        Theater: theater
    });

    const seating = useRef({
        rows: 0,
        cols: 0
    });

    const [validationMsg, setValidationMsg] = useState("");

    const formValidation = (screen) => {
        if (screen.jTotalSeats < 1)
            return false;
        if (seating.current.rows < 0 || seating.current.cols < 0 || seating.current.rows * seating.current.cols != seatInForm.current.jTotalSeats)
            return false;
        return true;
    }

    const saveSeating = (screen) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: screen
        };
        fetch("http://localhost:8080/admin/seat/install/" + seating.current.rows + "/" + seating.current.cols, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data > 0) {
                    refresh();
                }
            });
    }

    const saveScreen = () => {
        if (formValidation(seatInForm.current)) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(seatInForm.current)
            };
            fetch("http://localhost:8080/admin/add/screen", requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.id > 0) {
                        saveSeating(data);
                    }
                });
        } else {
            setValidationMsg("One or more fields is not properly filled. \nPlease fill all the fields properly.")
        }

    }
    return (
        <div className="modal fade" id="screenModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="screen-add-form needs-validation">
                            <h5>Add new screen</h5>
                            <label >Manage seating</label>
                            <div className="form-group row" style={{justifyContent:"center"}}>
                                <label >Total seats:</label>&nbsp;
                                <input type="number" className="form-control col-sm-2" min="1" max="200" step="1" onChange={e => { seatInForm.current.jTotalSeats = e.target.value }}/>                            
                            </div>
                            <div className="form-group row" style={{ justifyContent: "center" }}>
                                <input type="number" className="form-control col-sm-2" min="1" max="20" step="1" onChange={e => { seating.current.rows = e.target.value }} placeholder="rows" />:
                                <input type="number" className="form-control col-sm-2" min="1" max="20" step="1" onChange={e => { seating.current.cols = e.target.value }} placeholder="columns" />
                            </div>
                            <div style={{ color: "red" }}>{validationMsg} </div>
                            <div className="form-group row" style={{ justifyContent: "center" }}>
                                <button type="button" className="btn btn-primary btn-sm" onClick={e => { e.preventDefault(); saveScreen() }}>save</button> &nbsp;
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
