import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { gapi } from "gapi-script";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginGoogle() {

    const navigate = useNavigate();
    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.client.init({
                // retrieve clientid from your .env file
                clientId:
                    process.env.REACT_APP_GOOGLE_CLIENT_ID,
                plugin_name: "chat",
            });
        });
    }, []);

    const handleFailure = (result) => {
        console.log("this is error message", result)
    }
    
    const handleLogin = (googleData) => {
        console.log(googleData)
        // you can see the available data on console
        const userData = {
            googleData: googleData.profileObj.googleId,
            firstname: googleData.profileObj.givenName,
            lastname: googleData.profileObj.familyName,
            email: googleData.profileObj.email
        }

        // backend url
        axios.post("http://localhost:8080/api/users/google-signin", userData).then(result => {
            if (result.data.status) {
                localStorage.setItem('token', result.data.token)
                navigate("/profile")
            }
            else {
                toast.error("Something's wrong.")
            }
        })
    }

    return (
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
        >
        </GoogleLogin>
    )
}

export default LoginGoogle