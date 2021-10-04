import { useRef } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./styles/login.css"
function Login({setSession}) {
    const creds = useRef({
        sUsername: "",
        sPassword: ""
    });

    const history = useHistory();
    const historyPush = (url) => {
        history.push(url);
    }

    const login = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(creds.current)
        };
        fetch('https://localhost:8443/userlogin', requestOptions)
            .then(resp => resp.json())
            .then((resp) => {
                if(resp.id > 0) {
                    setSession(resp);
                    sessionStorage.setItem("sessionUser",JSON.stringify(resp))
                    if(resp.role ==="ROLE_USER" ) {
                        history.goBack();
                    } else if(resp.role ==="ROLE_ADMIN"){
                        historyPush("/admin/movies")
                    }
                }
            })
    }
    return (
        <div className="login-forms page-content" style={{margin:"20vh"}}>
            <div className="col-md-4 login-form-card">
                <h4>Login</h4>
                <form className="login-form">
                    <div className="login-form-group form-group">
                        <label for="username">Username</label>
                        <input type="text" className="form-control creds" onChange={(e) => { creds.current.sUsername = e.target.value }} placeholder="username" />
                        {/* <div style={{ color: "#ac1414" }}>{warning}</div> */}
                    </div>
                    <div className="form-group login-form-group">
                        <label for="password">Password</label>
                        <input type="password" className="form-control creds" onChange={(e) => { creds.current.sPassword = e.target.value }} placeholder="Password" />
                        {/* <i className="bx bx-show">show/hide</i> */}
                    </div>
                    <button className="btn btn-primary" onClick={e => { e.preventDefault(); login() }}>submit</button>
                    <Link to="/register"><div className="dropdown-item">Start with the new Account.</div></Link>
                </form>
            </div>
        </div>
    )
}
export default Login;