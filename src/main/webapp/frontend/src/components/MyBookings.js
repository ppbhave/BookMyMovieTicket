import { useEffect, useState } from "react";

function MyBookings({ user }) {
    const [booking, setBooking] = useState([]);
    const bookingFetch = async () => {
        fetch("https://localhost:8443/session/MyBookings/" + 2)
            .then((response) => response.json())
            .then((data) => {
                setBooking(data);
            });
    };

    useEffect(() => {
        bookingFetch();
    }, []);
    return (
        <div className="page-content my-bookings">

            <div className="row container">
                <div className="bookingtable-section col-lg-10">
                    <div className="bookingtable">
                        <h5>{user.sName}'s Bookings</h5>
                        <table className="table table-sm table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col" >Movie</th>
                                    <th scope="col" >Theater</th>
                                    <th scope="col" >show timinng</th>
                                    <th scope="col" >Seats</th>
                                    <th scope="col" ></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    booking.map((show, index) => {
                                        const timearr =  show[0].show.dStartTiming.split("T");
                                        return (<tr key={index}>
                                            <th scope="row" style={{ width: "10%" }}>{index + 1}</th>
                                            <td style={{ width: "20%" }}>{show[0].sMovieName}</td>
                                            <td style={{ width: "20%" }}>{show[0].seat.screen.theater.sName}</td>
                                            <td style={{ width: "20%" }}>{timearr[0] +" "+ timearr[1]}</td>
                                            <td style={{ width: "20%" }}>
                                                {show.map(seatbooked => { return seatbooked.seat.pos+", " })}
                                            </td>
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MyBookings;