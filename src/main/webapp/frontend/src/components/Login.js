import { useRef } from "react";
import "./styles/userRegistration.css"
function Login() {
    const creds = useRef({
        sUsername: "",
        sPassword: ""
    });

    const login = () => {
        console.log((creds.current))
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(creds.current)
        };
        fetch('http://localhost:8080/userlogin', requestOptions)
            .then(resp => resp.json())
            .then((resp) => {
                console.log(resp)
            })
    }
    return (
        <div className="signup-forms" style={{margin:"20vh"}}>
            <div className="col-md-4 set-credentials form-card">
                <h4>Login</h4>
                <form className="signup-form">
                    <div className="form-group">
                        <label for="username">Username</label>
                        <input type="text" className="form-control creds" onChange={(e) => { creds.current.sUsername = e.target.value }} placeholder="username" />
                        {/* <div style={{ color: "#ac1414" }}>{warning}</div> */}
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input type="password" className="form-control creds" onChange={(e) => { creds.current.sPassword = e.target.value }} placeholder="Password" />
                        {/* <i className="bx bx-show">show/hide</i> */}
                    </div>
                    <button className="btn btn-primary" onClick={e => { e.preventDefault(); login() }}>submit</button>
                    <div className="dropdown-item">Start with the new Account.</div>
                </form>
            </div>
        </div>
    )
}
export default Login;