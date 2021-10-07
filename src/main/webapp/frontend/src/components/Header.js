import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import MovieCards from './Moviecards';
import Login from './Login'
import Reviews from './Reviews'
import MovieDetails from "./MovieDetails";
import MovieShows from "./MovieShows";
import Seatbooking from "./Seatbooking";
import AdminNavbar from "./AdminNavbar";
import "./styles/header.css"
import MyBookings from "./MyBookings";
import UserRegistration from "./UserRegistration";
import { useState } from "react";
import Profile from "./Profile";
import Payment from "./Payment";
function Header() {
  const [session, setSession] = useState(JSON.parse(localStorage.getItem("sessionUser")));
  const updateSession = (account) => {
    setSession(account);
    localStorage.setItem("sessionUser",account);
  }
  return (
    <div>
      <Router>
        <header id="header" className="fixed-top">
          <div className="container d-flex align-items-center">
            <h1 className="logo mr-auto"><Link to="/Movies">Book My Movie</Link></h1>
            {/* <a href="index.html" className="logo mr-auto"><img src="assets/img/logo.png" alt="" className="img-fluid"></a>--> */}
            <nav className="nav-menu d-none d-lg-block main-navbar">
              <ul>
                {
                  session === null ? <li><Link to="/Login">Login</Link></li> : (
                    <li className="drop-down" style={{ fontSize: "18px" }}><i className="bx bx-user-circle" style={{ color: "#fff" }}></i>
                      <ul style={{ listStyle: "none" }}>
                        <li><Link to="/user/profile"><i className="bx bx-user-circle">My profile</i></Link></li>
                        <li><Link to="/user/bookings">My bookings</Link></li>
                        {session.role === "ROLE_ADMIN" ? <li><Link to="/admin">admin</Link></li> : <></>}
                        <li style={{ color: "#fff", fontSize: "14px", cursor: "pointer" }} onClick={() => { setSession(null); localStorage.removeItem("sessionUser"); }}>Logout</li>
                      </ul>
                    </li>
                  )
                }
                <li><Link to="/Movies">Movies</Link></li>
                {/* {
                  session != null && session.Role === "ROLE_ADMIN" ? <li><Link to="/admin">admin</Link></li> : <></>
                } */}
              </ul>
            </nav>
          </div>
        </header>
        <Switch>
          <Route path={["/", "/Movies"]} exact component={MovieCards}></Route>
          <Route path="/movie/:id" exact component={MovieDetails}></Route>
          <Route path="/movie/:id/reviews" exact render={() => (<Reviews user={session.user}/>)}></Route>
          <Route path="/movie/:id/shows" exact component={MovieShows}></Route>
          <Route path="/movie/:movieid/show/:showid/booking" exact component={Seatbooking}></Route>
          <Route path="/payment/:payment" exact component={Payment}></Route>
          <Route path="/login" exact render={() => (<Login setSession={updateSession} />)}></Route>
          <Route path="/register" exact component={UserRegistration}></Route>
          <Route path="/user/profile" exact render={() => (<Profile session={session} setSession={updateSession} />)}></Route>
          <Route path="/user/bookings" exact render={() => (<MyBookings user={session.user}/>)}></Route>
          <Route path="/admin" exact component={AdminNavbar}></Route>
        </Switch>
      </Router>
    </div>
  )
}
export default Header;