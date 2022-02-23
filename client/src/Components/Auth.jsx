import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import signImage from '../assets/signup.jpg';


const cookies = new Cookies();

const Auth = () => {

    const initialState = {
        fullName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        avatarURL: '',
        

    }

    const [form, setForm] = useState(initialState);

    const [isSignup, setIsSignup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const {  userName, password, avatarURL, phoneNumber } = form;
       
        // const URL = 'https://slack-clone-by-keyur.herokuapp.com/auth';
        const URL = 'https://localhost/5000/auth';

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'} `, {
            userName, password, fullName:form.fullName, avatarURL, phoneNumber,
        });

        cookies.set('token', token);
        cookies.set('userName', userName);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if (isSignup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);

        }
        window.location.reload();
        // console.log(form)
    }

    return (
        <div className = "auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'SignUp' : 'SignIn'}</p>
                    <form onSubmit={handleSubmit}>
                        
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName"> Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Please Enter Your Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                          <div className="auth__form-container_fields-content_input">
                                <label htmlFor="userName"> User Name</label>
                                <input
                                    type="text"
                                    name="userName"
                                    placeholder="Please Enter User Name"
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        
                           {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber"> Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Please Enter Mobile Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                            {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL"> AvatarURL</label>
                                <input
                                    type="text"
                                    name="avatarURL"
                                    placeholder="Please Enter Your Profile Photo URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                          <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password"> Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Please Enter Your Password"
                                    onChange={handleChange}
                                    required
                                />
                        </div>
                        
                           {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword"> Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Please Enter Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className="auth__form-container_fields-content_button">
                            <button > {isSignup ? "Sign Up" : "Sign In" }</button>
                        </div>
                    </form>

                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                                ? "Already have an account"
                                : "Don't have an account"}
                            <span onClick={switchMode}>
                                {isSignup ? 'Sign In' : 'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container_image">
                <img src = {signImage} alt = " Sign In"/>
            </div>
        </div>
    )
}

export default Auth
