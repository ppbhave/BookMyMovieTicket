import { useEffect } from "react";
import "./styles/seatbooking.css"
function Seatbooking() {
    const show_id = 1;
    // const requestOptions = {
    //     method: 'GET',
    //     headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImV4cCI6MTYzMjA3MDk5MSwiaWF0IjoxNjMyMDUyOTkxfQ.9_X3KAOLE7UpA0ZyJxMJWwNIy-kNqqSemuOdOKLJKQ8xlBV04Vd3S5g7xMCX0KisBAYsnE0iGWSVdiwSwtdgBw' }
    // };
    useEffect(() => {
        fetch("http://localhost:8080/session/show/seats/" + show_id, { headers:{'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbiIsImV4cCI6MTYzMjA4OTA3MiwiaWF0IjoxNjMyMDcxMDcyfQ.KeJ14ydWbbL56ZKgz-vegD8TzzS-X5isipqsb1gQUbd41A1GzsQ2PzlOjItfFkvAS88lBErxZyMpYRefmvxgtA'} })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            });
    }, []);
    return (
        <div className="show-page-container" >

            <div className="section-heading section-title">
                <h2 id="page-title">Book your seats</h2>
                <div id="alt"></div>
            </div>
            <div className="row">
                <div className="col-9">
                    <div className="screen-seating-status">
                        <div className="movie-container">
                            <h3 id="movie_name"></h3>
                            <h3 id="theater_name"></h3>
                        </div>

                        <ul className="showcase">
                            <li>
                                <div className="seat demo"></div>
                                <small>Available</small>
                            </li>
                            <li>
                                <div className="seat selected demo"></div>
                                <small>Selected</small>
                            </li>
                            <li>
                                <div className="seat occupied demo"></div>
                                <small>Occupied</small>
                            </li>
                        </ul>

                        <div className="screen"><p className="screentext">All eyes this side</p></div>
                        <div className="seating-arrangement" id="seating-arrangement">

                        </div>
                    </div>
                </div>

                <div className="col-3 booking-actions">
                    <form action="" method="" role="form" className="php-email-form">
                        <p>Total Seats:</p>
                        <input type="text" readOnly name="count" id="count" className="form-control" value="0" placeholder="Total seats" data-rule="minlen:1" data-msg="Please select at least 1 seat" />
                        <div className="validate"></div>

                        <p>Selected Seats:</p>
                        <input type="text" readOnly name="seatsselected" id="seatsselected" className="form-control" placeholder="selected seats" data-rule="minlen:2" data-msg="Please select at least 1 seat" />
                        <div className="validate"></div>

                        <p>Total price:</p>
                        <input type="text" readOnly name="price" id="price" className="form-control" placeholder="price" value="RS.0" />
                        <button className="startpayment btn btn-info" >start payment</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Seatbooking;