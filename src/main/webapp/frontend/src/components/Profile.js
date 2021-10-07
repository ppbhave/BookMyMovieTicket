import { useRef, useState } from "react";
import "./styles/profile.css";
function Profile({ session, setSession }) {
    const newAccount = useRef(session);
    const [changePassword, setchangePassword] = useState(true);

    const step = (value) => {
        setchangePassword(value)
    }

    return (
        <div className="signup-container page-content">
            <h2 className="section-heading">Profile</h2>
            <div className="signup-forms">
                {changePassword ? <PersonalInfo newAccount={newAccount.current.user} nextStep={step} setSession={setSession}/> : <ChangePassword newAccount={newAccount} nextStep={step} setSession={setSession}/>}
            </div>

        </div>
    )
}
export default Profile;

function PersonalInfo({ newAccount, nextStep, setSession }) {
    const newUser = newAccount.current.user;
    const [message, setMessage] = useState("");
    const [gender, setGender] = useState(newUser.sGender);
    const newuser = useRef(newUser);
    const updateProfile = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newuser.current)
        };
        fetch('https://localhost:8443/session/Profile/changes', requestOptions)
            .then(resp => resp.json())
            .then((statuscode) => {
                if (statuscode === "OK") {
                    alert("Profile is updated successfully!");
                    newAccount.current.user= newuser.current;
                    setSession(newAccount.current);
                }
                else { setMessage("This changed email is already registered with another account. Try another email!") }
            })
    }

    return (
        <div className="col-md-4 personal-info registration form-card">
            <h4>Personal Information</h4>
            <form className="signup-form">
                <div className="registration-form-group form-group">
                    <label for="name">Name</label>
                    <input type="text" defaultValue={newuser.current.sName} className="form-control" placeholder="Name" onChange={(e) => { newuser.current.sName = e.target.value }} />
                </div>
                <div className="registration-form-group form-group">
                    <label for="phone">Phone Number</label>
                    <input type="text" defaultValue={newuser.current.sPhone} className="form-control" placeholder="+91" onChange={(e) => { newuser.current.sPhone = e.target.value }} />
                </div>
                <div className="registration-form-group form-group">
                    <label for="email">Email</label>
                    <input type="email" defaultValue={newuser.current.sEmail} className="form-control" placeholder="example@example.com" onChange={(e) => { newuser.current.sEmail = e.target.value }} />
                    <div style={{ color: "#ac1414" }}>{message}</div>
                </div>
                <div className="registration-form-group form-group">
                    <label for="gender">Gender</label>
                    <label className="radio-inline"><input type="radio" name="sGender" value="Male" checked={gender === "Male"} onClick={(e) => { newuser.current.sGender = e.target.value; setGender(e.target.value); }} />Male</label>
                    <label className="radio-inline"><input type="radio" name="sGender" value="Female" checked={gender === "Female"} onClick={(e) => { newuser.current.sGender = e.target.value; setGender(e.target.value); }} />Female</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e) => { e.preventDefault(); updateProfile() }}>submit</button>

                <div className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => { nextStep(false) }}>change password</div>
            </form>
        </div>
    )

}

function ChangePassword({ newAccount, nextStep, setSession }) {
    const [warning, setWarning] = useState("");
    console.log(newAccount.current);
    const register = () => {
        if (newAccount.current.sOldPassword === "" || newAccount.current.sPassword === "" || newAccount.current.sPassword1 === "") {
            setWarning("Old password, and new password was not entered.")
        }
        if (newAccount.current.sOldPassword === newAccount.current.sPassword) {
            setWarning("Old password and new password cannot be same.")
        }
        if (newAccount.current.sPassword !== newAccount.current.sPassword1) {
            setWarning("new password and confirmed password are not same.")
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newAccount.current)
        };
        fetch('https://localhost:8443/update/credentials', requestOptions)
            .then(resp => resp.json())
            .then((statuscode) => {
                if (statuscode === "OK") { alert("successful"); setSession(newAccount) }
                else if (statuscode === "CONFLICT") {
                    setWarning("Username not available. Try another Username!")
                } else {
                    setWarning("incorrect username or password.")
                }
            })
    }
    return (
        <div className="col-md-4 set-credentials registration  form-card">
            <div className="row"><div className="back-button"><i className="bx bx-arrow-back" onClick={() => { nextStep(true) }}>Back</i></div> <br /><br /></div>
            <h4>change Login details</h4>
            <form className="signup-form">
                <div className="registration-form-group form-group">
                    <label for="username">Username</label>
                    <input type="text" className="form-control creds" defaultValue={newAccount.current.sUsername} placeholder="username" readOnly={true} />
                </div>
                <div className="registration-form-group form-group">
                    <label for="username">Old Password</label>
                    <input type="password" className="form-control creds" onChange={(e) => { newAccount.current.sOldPassword = e.target.value }} placeholder="Old Password" />
                </div>
                <div className="registration-form-group form-group">
                    <label for="password"> new Password</label>
                    <input type="password" className="form-control creds" onChange={(e) => { newAccount.current.sPassword = e.target.value }} placeholder="new Password" />
                </div>
                <div className="registration-form-group form-group">
                    <label for="password"> confirm Password</label>
                    <input type="password" className="form-control creds" onChange={(e) => { newAccount.current.sPassword1 = e.target.value }} placeholder="confirm Password" />
                    <div style={{ color: "#ac1414" }}>{warning}</div>
                </div>
                <button className="btn btn-primary" onClick={e => { e.preventDefault(); register() }}>submit</button>
            </form>
        </div>
    )
}