import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import AdminMovieManagement from "./AdminMovieManagement";
import AdminMovieInstallations from "./AdminMovieInstallations";
import AdminShowManagement from "./AdminShowManagement";
import AdminTheaterManagement from "./AdminTheaterManagement";

import "./styles/adminnav.css"
function AdminNavbar() {
    return (
        <div className="page-content">
            <Router>
                <div className="admin-navbar" id="adminNavbar">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <h5>Welcome Admin</h5>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">

                            <ul className="navbar-nav admin-services">
                                <li className="nav-item active">
                                    <Link to="/admin/movies">Movies</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/theaters">Theaters</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/screens">Screens</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/shows">Shows</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <Switch>
                    <Route path={["/admin", "/admin/movies"]} exact component={AdminMovieManagement}></Route>
                    <Route path="/admin/theaters" exact component={AdminTheaterManagement}></Route>
                    <Route path="/admin/shows" exact component={AdminShowManagement}></Route>
                    <Route path="/admin/screens" exact component={AdminMovieInstallations}></Route>
                </Switch>
            </Router>
        </div>
    )
}
export default AdminNavbar;