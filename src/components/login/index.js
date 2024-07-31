import {Component} from "react"

import "./index.css";

import Cookies from "js-cookie"

class Login extends Component {

    state={register:false,username:"",password:"",newUserName:"",newUserPassword:"",confirmPassword:"",errorMessage:"",errorMessageRegister:"",selectedOptions:"admin"}


    registerUser=()=>{
        this.setState({register:true})
    }

    loginUser=()=>{
        this.setState({register:false})
    }

    userName=(e)=>{
        this.setState({username:e.target.value})
    }

    userPassword=(e)=>{
        this.setState({password:e.target.value})
    }

    submitLogin=async(e)=>{
        e.preventDefault()
        const {username,password}=this.state
        const data={username:username,password:password}

        if(username.length===0){
            console.log("Username cannot be empty")
            this.setState({errorMessage:"Username cannot be empty"})
            return
        }
        if(password.length===0){
            console.log("Password cannot be empty")
            this.setState({errorMessage:"Password cannot be empty"})
            return
        }

        const url="https://technokartbackenddaveed.onrender.com/login/"
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }

        const response=await fetch(url,options)

        const responseToJson=await response.json()

        if(response.ok){
            console.log("Login successful")
            console.log(response)
            
            console.log(responseToJson)
            console.log(responseToJson.jwtToken)
            const {id,jwtToken,role,username}=responseToJson
            localStorage.setItem('user', JSON.stringify({ id, jwtToken, role, username }));
            Cookies.set("jwtToken",responseToJson.jwtToken,{expires:30})
            this.props.history.push("/")
           
           
        }else{
            console.log("Login failed",response)
            console.log(responseToJson)
            this.setState({errorMessage:responseToJson.errorMessage})
        }
    }


  

    registerUserName=(e)=>{
        this.setState({newUserName:e.target.value})
    }
    registerPassword=(e)=>{
        this.setState({newUserPassword:e.target.value})
    }

    registerConfirmPassword=(e)=>{
        this.setState({confirmPassword:e.target.value})
    }

    submitNewUserDetails=async(e)=>{
        e.preventDefault()

        const {newUserName,newUserPassword,confirmPassword,selectedOptions}=this.state
        const data={username:newUserName,password:newUserPassword,role:selectedOptions}
        if(newUserName.length===0){
            console.log("Username cannot be empty")
            this.setState({errorMessageRegister:"Username cannot be empty"})
            return
        }
        if(newUserPassword.length===0){
            console.log("Password cannot be empty")
            this.setState({errorMessageRegister:"Password cannot be empty"})
            return
        }
        if(confirmPassword.length===0){
            console.log("Confirm Password cannot be empty")
            this.setState({errorMessageRegister:"Confirm Password cannot be empty"})
            return
        }
        if(newUserPassword!==confirmPassword){
            console.log("Passwords do not match")
            this.setState({errorMessageRegister:"Passwords do not match"})
            return
        }
        if(selectedOptions.length===0){
            console.log("Please select atleast one option")
            this.setState({errorMessageRegister:"Please select atleast one option"})
            return
        }
            const url="https://technokartbackenddaveed.onrender.com/register/"
            const options={
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }
            const response=await fetch(url,options)
            const responseToJson=await response.json()
            if(response.ok){
                console.log("Registration successful")
                this.setState({newUserName:"",newUserPassword:"",confirmPassword:"",errorMessageRegister:""})
                this.props.history.push("/")
            }else{
                console.log("Registration failed")
                
                this.setState({errorMessageRegister:responseToJson.errorMessage})
            }



    }



    selectOption=(e)=>{
        console.log(e.target.value)
        this.setState({selectedOptions:e.target.value})

    }




    render() {
        const {register,username,password,confirmPassword,errorMessage,newUserName,newUserPassword,errorMessageRegister,selectedOptions}=this.state
        return (
            <div className="login-and-register">
             
                <div id="formContainer">

                    {register===false?
                        <div>
                        <form onSubmit={this.submitLogin} className="form">
                            <h2>Login</h2>
                            <div className="form-group">
                                <label htmlFor="loginUsername">Username:</label>
                                <input value={username} onChange={this.userName} type="text" id="loginUsername" name="username" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="loginPassword">Password:</label>
                                <input value={password} onChange={this.userPassword} type="password" id="loginPassword" name="password" required/>
                            </div>
                            <div className="form-group">
                                <button className="login-button" type="submit">Login</button>
                            </div>
                            <div id="loginErrorMessage" className="error-message">{errorMessage}</div>
                            <p>Don't have an account? <span  onClick={this.registerUser} id="showRegisterForm">Register</span></p>
                        </form>
                        </div>
                            :
                        <div>
                        <form onSubmit={this.submitNewUserDetails} id="registerForm" className="form">
                            <h2>Register</h2>
                            <div className="form-group">
                                <label htmlFor="registerUsername">Username:</label>
                                <input value={newUserName} onChange={this.registerUserName} type="text" id="registerUsername" name="username" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="registerPassword">Password:</label>
                                <input value={newUserPassword} onChange={this.registerPassword} type="password" id="registerPassword" name="password" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input value={confirmPassword} onChange={this.registerConfirmPassword} type="password" id="confirmPassword" name="confirmPassword" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="role">Role:</label>
                                <select onChange={this.selectOption} value={selectedOptions} className="select-options">
                                    <option value="admin">Admin</option>
                                    <option value="author">Author</option>
                                    <option value="reader">Reader</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <button className="register-button" type="submit">Register</button>
                            </div>
                            <div id="registerErrorMessage" className="error-message">{errorMessageRegister}</div>
                            <p>Already have an account? <span onClick={this.loginUser}  id="showLoginForm">Login</span></p>
                        </form>
                        </div>

                    }

                    </div>
            </div>
        )
    }
}

export default Login