
import {Component} from "react"

import {Link,Redirect} from "react-router-dom"


import Cookies from "js-cookie"

import "./index.css"

class Profile extends Component {

    logoutUser=()=>{
        Cookies.remove("jwtToken")
        localStorage.removeItem("user")
        this.props.history.push("/login")
    }
    render(){
        const jwtToken = Cookies.get("jwtToken")
        const {username}=JSON.parse(localStorage.getItem("user"))
        if(jwtToken===undefined){
            return(
                <Redirect to="/login" />
            )
        }
        return(
            <div>

                <div className="profile-container">
                <h1>Profile</h1>
                <h2>Welcome, {username}!</h2>


                <h3>Hey back to Home   </h3>
                <Link to ="/">
                
                <button className="home-profile-button" type="button">Home</button>
                </Link>

                <h3>or</h3>
                <button className="user-logout-button" onClick={this.logoutUser} type="button">Logout</button>
            </div>
            </div>
        )
    }
}

export default Profile;