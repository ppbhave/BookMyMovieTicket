import DatePicker from "react-datepicker";
import { useEffect, useRef, useState } from "react";
import "./styles/AdminShow.css";

function AdminShowManagement() {

    const screenParam = -1;
    const [shows, setShows] = useState([]);
    const [screens, setScreens] = useState([]);
    const [screen, setScreen] = useState(screenParam);
    const [startDate, setStartDate] = useState(new Date("10/09/2021"));
    const [endDate, setEndDate] = useState(new Date("10/10/2021"));
    const [action, setAction] = useState("");
    const [formElement, showFormElement] = useState(false);
    const showInForm = useRef({
        id: 0,
        dStartTiming: "",
        screen: {
            id: 0,
            jTotalSeats: 0,
            datetime: "",
            Theater: {
                id: 0,
                sName: "",
                sGpsLocation: "",
                jNoOfScreens: 0
            }
        }
    });
    const dateConsts = { start: new Date("10/09/2021"), end: new Date("10/10/2021") }
    const dateTimeConvert = (showDate) => {
        let date = showDate.getDate();
        let month = showDate.getMonth() + 1;
        let year = showDate.getFullYear();
        if (parseInt(date) < 10) {
            date = "0" + date;
        }
        if (parseInt(month) < 10) {
            month = "0" + month;
        }
        return year + "-" + month + "-" + date + "T" + "00:00:00"
    }
    const installedFetch = async () => {
        fetch("https://localhost:8443/screens")
            .then((response) => response.json())
            .then((data) => {
                setScreens(data);
                if (screen === -1 && data.length > 0) {
                    setScreen(0)
                }
            });
    };

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
        installedFetch();
    }, []);

    const pageRefresh = () => {
        if (screen > -1) {
            fetch("https://localhost:8443/admin/screen/shows/" + dateFormattedString(startDate) + "/" + dateFormattedString(endDate) + "/" + screens[screen].id)
                .then((response) => response.json())
                .then((data) => {
                    setShows(data);
                    console.log(data)
                });
        }
    }
    useEffect(() => {
        pageRefresh()
    }, [screen, startDate, endDate]);

    const formEnvoke = (envokeMethod) => {
        if (!formElement) {
            showFormElement(true);
            setAction(envokeMethod);
        }
    }

    return (
        <div className="admin-page-container">
            <form className="show-filter">
                <div className="row show-filter-table">
                    <div className="form-group col-md-2">
                        <label >screen</label>
                        <select className="form-control" value={screen} onChange={(e) => { setScreen(e.target.value) }}>
                            {screens.map((scr, i) => {
                                return <option key={i} value={i}>{scr.theater.sName + "-" + scr.id}</option>;
                            })}
                        </select>
                    </div>

                    <div className="form-group col-md-2">
                        <label >shows from:</label>
                        <DatePicker id="show_date" className="form-control"
                            dateFormat="dd MMM yyyy"
                            minDate={dateConsts.start}
                            selected={startDate}
                            onChange={date => { setStartDate(date) }} />
                    </div>

                    <div className="form-group col-md-2">
                        <label >shows to:</label>
                        <DatePicker className="form-control"
                            dateFormat="dd MMM yyyy"
                            minDate={dateConsts.end}
                            selected={endDate}
                            onChange={date => { setEndDate(date) }} />
                    </div>
                </div>
            </form>

            <div className="row container">
                <div className="movietable-section col-lg-7">
                    <div className="movietable">
                        <h5>Shows running on screen</h5>
                        <section className="show-container">
                            {
                                shows.length ? shows.map((show, i) => {
                                    return show.length ? <DateShowCard key={i} showlist={show} showInForm={showInForm} formEnvoke={formEnvoke} /> : <div key={i}></div>
                                }) : <div>No shows were found for selected screen on selected days.<p onClick={(e) => {
                                    e.preventDefault();
                                    showInForm.current.screen = screens[screen];
                                    showInForm.current.dStartTiming = dateTimeConvert(startDate);
                                    formEnvoke("Create")
                                }}
                                    style={{ color: "blue", cursor: "pointer" }}>Add new show</p></div>
                            }
                        </section>
                    </div>
                </div>
                <div className="form-section col-lg-5">
                    {formElement ? <ShowForm showInForm={showInForm} action={action} formVisible={showFormElement} refresh={pageRefresh} /> : <div></div>}
                </div>
            </div>
        </div>
    )
}
export default AdminShowManagement;

function DateShowCard({ showlist, showInForm, formEnvoke }) {
    const jsDate = (timeString) => {
        var hourEnd = timeString.indexOf(":");
        var H = +timeString.substr(0, hourEnd);
        var h = H % 12 || 12;
        var ampm = H < 12 ? "AM" : "PM";
        return h + timeString.substr(hourEnd, 3) + ampm;
    }

    const dateFormat = (datestring) => {
        let dateTime = datestring.split("T");
        return dateTime[0] + " " + dateTime[1];
    }

    const showDate = showlist[0].dStartTiming.split("T")[0];

    return (
        <div className="card shows-card">
            <div className="card-header">
                <div className="shows-date">
                    <strong>{showDate}</strong>
                </div>
                <div className="shows-rating">
                    <i className='bx bx-plus-medical' style={{ cursor: "pointer" }} onClick={e => {
                        e.preventDefault();
                        showInForm.current.id = 0;
                        showInForm.current.screen = showlist[0].screen;
                        showInForm.current.dStartTiming = showDate + "T00:00:00";
                        formEnvoke("Create");
                    }}></i>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    {showlist.map(show => {
                        return (
                            <div className="col-md-2 slot" key={show.id} onClick={e => {
                                e.preventDefault();
                                showInForm.current.screen = show.screen;
                                showInForm.current.dStartTiming = show.dStartTiming;
                                showInForm.current.id = show.id;
                                showInForm.current.datetime = dateFormat(show.dStartTiming)
                                formEnvoke("Edit");
                            }}>
                                <button className="btn btn-outline-info">
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

function ShowForm({ showInForm, action, formVisible, refresh }) {
    let dateTimeString = showInForm.current.dStartTiming.split("T");
    const [validationMsg, setValidationMsg] = useState("");
    const timeref = useRef({
        hh: dateTimeString[1].split(":")[0], mm: dateTimeString[1].split(":")[1],
        ddmmyyyy: dateTimeString[0].substr(8, 2) + "-" + dateTimeString[0].substr(5, 2) + "-" + dateTimeString[0].substr(0, 4)
    });

    const formValidation = (show) => {
        if (timeref.current.hh.length < 2) {
            timeref.current.hh = "0" + timeref.current.hh;
        }

        if (timeref.current.mm.length < 2) {
            timeref.current.mm = "0" + timeref.current.mm;
        }
        showInForm.current.datetime = timeref.current.ddmmyyyy + " " + timeref.current.hh + ":" + timeref.current.mm;
        if (show.datetime === "")
            return false;
        return true;
    }

    const saveSlot = () => {
        const method = action === "Create" ? 'POST' : 'PUT';
        const url = action === "Create" ? 'https://localhost:8443/admin/show/addition' : 'https://localhost:8443/admin/show/update';
        if (formValidation(showInForm.current)) {
            const requestOptions = {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(showInForm.current)
            };
            fetch(url, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data === "OK") {
                        formVisible(false)
                        refresh();
                    }
                });
        } else {
            setValidationMsg("One or more fields is not properly filled. \nPlease fill all the fields properly.")
        }
    }

    const deleteSlot = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: showInForm.current.id })
        };
        fetch("https://localhost:8443/admin/show/delete", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data === "OK") {
                    formVisible(false)
                    refresh();
                }
            });
    }

    return (
        <form className="movie-form needs-validation">
            <h5>{action} the show</h5>
            <div className="form-group">
                <strong>Screen: </strong> {showInForm.current.screen.theater.sName + "-" + showInForm.current.screen.id}
            </div>
            <div className="form-group">
                <strong>Date: </strong> {showInForm.current.dStartTiming.split("T")[0]}
            </div>

            <div className="form-group">
                <label>start timing</label>
                <div className="row" style={{ justifyContent: "center" }}>
                    <input type="number" className="form-control col-sm-2" min="0" max="23" step="1" defaultValue={timeref.current.hh} onChange={e => { timeref.current.hh = e.target.value }} placeholder="hh" required />&nbsp;:&nbsp;
                    <input type="number" className="form-control col-sm-2" min="0" max="59" step="1" defaultValue={timeref.current.mm} onChange={e => { timeref.current.mm = e.target.value }} placeholder="mm" required />:
                </div>
            </div>
            <div style={{ color: "red" }}>{validationMsg} </div>
            <div className="form-group row" style={{ justifyContent: "center" }}>
                <button type="button" className="btn btn-primary btn-sm" onClick={e => { e.preventDefault(); saveSlot() }}>save</button> &nbsp;
                <button type="button" className="btn btn-info btn-sm" onClick={e => {
                    e.preventDefault(); formVisible(false);
                    showInForm.current = {
                        id: 0,
                        dStartTiming: "",
                        screen: {
                            id: 0,
                            jTotalSeats: 0,
                            datetime: "",
                            Theater: {
                                id: 0,
                                sName: "",
                                sGpsLocation: "",
                                jNoOfScreens: 0
                            }
                        }
                    }
                }} >cancel</button> &nbsp;
                {action === "Edit" ? <button type="button" className="btn btn-danger btn-sm" onClick={e => { e.preventDefault(); deleteSlot() }} >delete</button> : <></>}
            </div>

        </form>
    )
}
