import { useRef, useState } from "react";
// import PersonalInfo from "./PersonalInfo";
// import SetCredentials from "./SetCredentials";
import "./styles/userRegistration.css"
function UserRegistration() {
    const newAccount = useRef({
        user: {
            sName: "",
            sGender: "",
            sEmail: "",
            sPhone: ""
        },
        sUsername: "",
        sPassword: "",
        Role: "ROLE_USER"
    });

    const [signupStep, setSignupStep] = useState(true);
    const step = (value) => {
        setSignupStep(value)
    }

    return (
        <div className="signup-container">
            <h2 className="section-heading">Register</h2>
            <div className="signup-forms">
                {signupStep ? <PersonalInfo newAccount={newAccount} nextStep={step} /> : <SetCredentials newAccount={newAccount} nextStep={step} />}
            </div>

        </div>
    )
}
export default UserRegistration;

function PersonalInfo({ newAccount, nextStep }) {

    const [message, setMessage] = useState("");

    const verifyUser = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAccount.current.user)
        };
        fetch('http://localhost:8080/register/user', requestOptions)
            .then(resp => resp.json())
            .then((statuscode) => {
                if (statuscode === "OK") {
                    nextStep(false)
                }
                else { setMessage("This email is already registered with another account. Try another email!") }
            })
    }

    return (
        <div className="col-md-4 personal-info form-card">
            <h4>Personal Information</h4>
            <form className="signup-form">
                <div className="form-group">
                    <label for="name">Name</label>
                    <input type="text" className="form-control" onChange={(e) => { newAccount.current.user.sName = e.target.value }} placeholder="Name" />
                </div>
                <div className="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="text" className="form-control" onChange={(e) => { newAccount.current.user.sPhone = e.target.value }} placeholder="+91" />
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" className="form-control" onChange={(e) => { newAccount.current.user.sEmail = e.target.value }} placeholder="example@example.com" />
                    <div style={{ color: "#ac1414" }}>{message}</div>
                </div>
                <div className="form-group">
                    <label for="gender">Gender</label>
                    <label className="radio-inline"><input type="radio" name="gender" value="Male" onClick={(e) => { newAccount.current.user.sGender = e.target.value }} />Male</label>
                    <label className="radio-inline"><input type="radio" name="gender" value="Female" onClick={(e) => { newAccount.current.user.sGender = e.target.value }} />Female</label>
                </div>

                <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); verifyUser() }}>Verify</button>
                <div className="dropdown-item">Already member? Sign in</div>
            </form>
        </div>
    )

}

function SetCredentials({ newAccount, nextStep }) {
    const [warning, setWarning] = useState("");
    const register = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAccount.current)
        };
        fetch('http://localhost:8080/register/', requestOptions)
            .then(resp => resp.json())
            .then((statuscode) => statuscode === "OK" ? alert("successful") : setWarning("Username not available. Try another Uusername!"))
    }
    return (
        <div className="col-md-4 set-credentials form-card">
            <div className="row"><div className="back-button"><i className="bx bx-arrow-back" onClick={()=>{nextStep(true)}}>Back</i></div> <br/><br/></div>
            <h4>set login details</h4>
            <form className="signup-form">
                <div className="form-group">
                    <label for="username">Username</label>
                    <input type="text" className="form-control creds" onChange={(e) => { newAccount.current.sUsername = e.target.value }} placeholder="username" />
                    <div style={{ color: "#ac1414" }}>{warning}</div>
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control creds" onChange={(e) => { newAccount.current.sPassword = e.target.value }} placeholder="Password" />
                    {/* <i className="bx bx-show">show/hide</i> */}
                </div>
                <button className="btn btn-primary" onClick={e => { e.preventDefault(); register() }}>submit</button>
                <div className="dropdown-item">Already member? Sign in</div>
            </form>
        </div>
    )
}