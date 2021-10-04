import { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router";
import "./styles/seatbooking.css"
function Seatbooking() {
    const history = useHistory();
    const historyPush = (url) => {
        history.push(url);
    }
    const bookingParams = useParams();
    const ticketCharge = 150;
    const user = JSON.parse(sessionStorage.getItem("sessionUser"));
    const [seats, setSeats] = useState([]);
    const [movie, setMovie] = useState({ sMovieName: "" });
    const [screen, setScreen] = useState({ theater: { sName: "" } });
    const [payable, setPayable] = useState(0);
    const alterAmount = (command) => {
        let amount = payable;
        setPayable(command ? amount += ticketCharge : amount -= ticketCharge);
    }
    const selectedSeats = useRef([]);

    useEffect(() => {
        fetch("https://localhost:8443/session/show/seats/" + bookingParams.showid)
            .then((response) => response.json())
            .then((data) => {
                setScreen(data[0].screen)
                let seatsarr = [];
                let seatRow = [];
                let seatRowid = 'A';
                for (let i = 0; i < data.length; i++) {
                    if (seatRowid === data[i].pos.charAt(0)) {
                        seatRow.push(data[i]);
                    } else {
                        seatsarr.push(seatRow);
                        seatRow = [];
                        seatRowid = data[i].pos.charAt(0);
                        seatRow.push(data[i]);
                    }
                }
                setSeats(seatsarr);
            }).catch(err => console.log(err));
        fetch("https://localhost:8443/movie/" + bookingParams.movieid)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data)
            }).catch(err => console.log(err));
    }, []);

    const startPayment = () => {
        if (payable === 0) {
            return;
        }
        let bookingReq = {
            user_id: user.id,
            show_id: parseInt(bookingParams.showid),
            seats_id: selectedSeats.current,
            movie: movie.sMovieName
        }
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingReq)
        };
        fetch("https://localhost:8443/session/seatbooking", requestOptions)
            .then((response) => 
            response.json())
            .then((data) => {
                if (data.httpstatus === "OK") {
                    alert(data.message);
                     historyPush("/Movies");
                }
            });
    }
    return (
        <div className="show-page-container page-content" >

            <header className="booking-page-header row">
                <div className="movie-show-ref">
                    <h3>{movie.sMovieName}</h3>
                    <stronng>{screen.theater.sName}</stronng>
                </div>

                <ul className="showcase">
                    <li key={"Available"}>
                        <div className="seat demo"></div>
                        <small>Available</small>
                    </li>
                    <li key={"Selected"}>
                        <div className="seat selected demo"></div>
                        <small>Selected</small>
                    </li>
                    <li key={"Sold"}>
                        <div className="seat occupied demo"></div>
                        <small>Sold</small>
                    </li>
                </ul>
            </header>
            <div className="cinemahall-container">
                <div>
                    <div className="screen"><p className="screentext">All eyes this side</p></div>
                    <div className="seating-arrangement">
                        {
                            seats.map((seatrow, i) => {
                                return <div className="row">
                                    {
                                        seatrow.map(seat => { return <Seat key={seat.id} seat={seat} alterAmount={alterAmount} selectedSeats={selectedSeats} /> })
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <footer className="booking-page-footer row">
                <button type="button" className="btn btn-danger btn-payment" onClick={() => { startPayment() }}>Pay Rs. {payable}</button>
            </footer>
        </div>
    )
}
export default Seatbooking;

function Seat({ seat, alterAmount, selectedSeats }) {
    const [selectedState, setSelectedState] = useState(false);
    const seatClass = (booked) => {
        return booked ? "seat occupied" : selectedState ? "seat selected" : "seat";
    }
    const seatid = seat.id;
    const seatSelectHandler = () => {
        if (!seat.bookedFlag) {
            alterAmount(!selectedState);
            if (!selectedState) {
                selectedSeats.current.push(seatid);
            } else {
                selectedSeats.current.splice(selectedSeats.current.indexOf(seatid), 1);
            }
            setSelectedState(!selectedState);
        }
    }
    return (
        <div className={seatClass(seat.bookedFlag)} onClick={() => { seatSelectHandler(seat) }}>{seat.pos}</div>
    )
}