import React, { useContext, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Register(){
    const [info,setInfo] = useState({username:"",email:"",password:"",cpassword:""});
    const navigate = useNavigate();
    const a = useContext(UserContext);

    function handleChange(event){
        const {name,value} = event.target;
        setInfo((prev)=>({...prev,[name]:value}));
    }
    function register(event){
        event.preventDefault();
        if(info.password===info.cpassword && info.password!==""){
            Axios.post("https://quiztopia-api.onrender.com/register",{
                Username:info.username,
                Email: info.email,
                Password: info.password
            }).then(res=>{
                if(res.data.error===1){
                    alert("This user already exists!")
                }
                else if(res.data.error===2){
                    alert("Username already taken. Please try anonther one.")
                }
                else{
                    a.setState(()=>({...res.data.user,logged:true}))
                    const path = "/users/"+res.data.user.username;
                    navigate(path);
                }
            });
        }
        else{
            alert("Error! Passwords missing/do not match.");
        }
    }

    return (
        <form className="form">
            <div className="inputs">
                <label htmlFor="username">User Name: </label>
                <input 
                    id="username"
                    type="text"
                    name="username" 
                    value={info.username}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                /><br />
                <label htmlFor="email">Email ID: </label>
                <input 
                    id="email"
                    type="text" 
                    name="email" 
                    value={info.email} 
                    onChange={handleChange}
                    required
                    autoComplete="off"
                /><br />
                <label htmlFor="password">Password: </label>
                <input 
                    id="password"
                    type="password" 
                    name="password" 
                    value={info.password} 
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    /><br />
                <label htmlFor="cpassword">Confirm Password: </label>
                <input 
                    id="cpassword"
                    type="password" 
                    name="cpassword" 
                    value={info.cpassword} 
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    /><br />
            </div>
            <button onClick={register}>Register</button>
        </form>
    )
}