import { useRef, useState } from "react";
import {useForm } from "react-hook-form";
import "./styles/profile.css";
function Profile({session, setSession}) {
    // const newAccount = useRef(session);
    // const [newaccount, setNewAccount] = useState(session)
    
    const [changePassword, setchangePassword] = useState(true);

    const step = (value) => {
        setchangePassword(value)
    }

    return (
        <div className="signup-container page-content">
            <h2 className="section-heading">Profile</h2>
            <div className="signup-forms">
                {changePassword ? <PersonalInfo newUser={session.user} nextStep={step} /> : <ChangePassword newAccount={session} nextStep={step} />}
            </div>

        </div>
    )
}
export default Profile;

function PersonalInfo({ newUser, nextStep }) {
    const { updatedUser, handleSubmit } = useForm();
    const [message, setMessage] = useState("");

    const updateProfile = (value) => {
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(newAccount.current.user)
        // };
        // fetch('https://localhost:8443/register/user', requestOptions)
        //     .then(resp => resp.json())
        //     .then((statuscode) => {
        //         if (statuscode === "OK") {
        //             nextStep(false)
        //         }
        //         else { setMessage("This email is already registered with another account. Try another email!") }
        //     })
        console.log(value);

    }

    return (
        <div className="col-md-4 personal-info registration form-card">
            <h4>Personal Information</h4>
            <form className="signup-form" onSubmit={handleSubmit(updateProfile)}>
                <div className="registration-form-group form-group">
                    <label for="name">Name</label>
                    <input type="text" defaultValue={newUser.sName} {...updatedUser("sName")} className="form-control" placeholder="Name" />
                </div>
                <div className="registration-form-group form-group">
                    <label for="phone">Phone Number</label>
                    <input type="text" {...updatedUser("sPhone")} defaultValue={newUser.sPhone} ref={updatedUser} className="form-control"  placeholder="+91" />
                </div>
                <div className="registration-form-group form-group">
                    <label for="email">Email</label>
                    <input type="email" {...updatedUser("sEmail")} defaultValue={newUser.sEmail} ref={updatedUser} className="form-control"  placeholder="example@example.com" />
                    <div style={{ color: "#ac1414" }}>{message}</div>
                </div>
                {/* <div className="registration-form-group form-group">
                    <label for="gender">Gender</label>
                    <label className="radio-inline"><input type="radio" name="sGender" value="Male" ref={updatedUser}/>Male</label>
                    <label className="radio-inline"><input type="radio" name="sGender" value="Female" ref={updatedUser}/>Female</label>
                </div> */}
                <button type="submit" className="btn btn-primary">submit</button>
                {/* onClick={(e) => { e.preventDefault(); updateProfile() }} */}
                <div className="dropdown-item">Already member? Sign in</div>
            </form>
        </div>
    )

}

function ChangePassword({ newAccount, nextStep }) {
    const [warning, setWarning] = useState("");
    const register = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAccount.current)
        };
        fetch('https://localhost:8443/register/', requestOptions)
            .then(resp => resp.json())
            .then((statuscode) => statuscode === "OK" ? alert("successful") : setWarning("Username not available. Try another Uusername!"))
    }
    return (
        <div className="col-md-4 set-credentials registration  form-card">
            <div className="row"><div className="back-button"><i className="bx bx-arrow-back" onClick={() => { nextStep(true) }}>Back</i></div> <br /><br /></div>
            <h4>set login details</h4>
            <form className="signup-form">
                <div className="registration-form-group form-group">
                    <label for="username">Username</label>
                    <input type="text" className="form-control creds" onChange={(e) => { newAccount.current.sUsername = e.target.value }} placeholder="username" />
                    <div style={{ color: "#ac1414" }}>{warning}</div>
                </div>
                <div className="registration-form-group form-group">
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