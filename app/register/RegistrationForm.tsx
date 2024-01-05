'use client';

import { registerUser, validateEmail, validateUsername, validateName, validatePassword } from './actions';
import { useState } from 'react';
import { redirect } from 'next/navigation';

export default function RegistrationForm() {

    let [emailValidation, setEmailValidation] = useState({status: '', message: ''});
    let [usernameValidation, setUsernameValidation] = useState({status: '', message: ''});
    let [firstNameValidation, setFirstNameValidation] = useState({status: '', message: ''});
    let [lastNameValidation, setLastNameValidation] = useState({status: '', message: ''});
    let [passwordValidation, setPasswordValidation] = useState({status: '', message: ''});
    let [buttonDisabled, setButtonDisabled] = useState(true);
    let [error, setError] = useState({message: '', hidden: true});

    const validateForm = () => {
        if (emailValidation.status === 'is-valid' &&
            usernameValidation.status === 'is-valid' &&
            firstNameValidation.status === 'is-valid' &&
            lastNameValidation.status === 'is-valid' &&
            passwordValidation.status === 'is-valid') {
                setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }

    const validateInputEmail = async (event: any) => {
        setEmailValidation(await validateEmail(event.target.value));
        validateForm();
    }

    const validateInputUsername = async (event: any) => {
        setUsernameValidation(await validateUsername(event.target.value));
        validateForm();
    }

    const validateInputFirstName = async (event: any) => {
        setFirstNameValidation(await validateName(event.target.value));
        validateForm();
    }

    const validateInputLastName = async (event: any) => {
        setLastNameValidation(await validateName(event.target.value));
        validateForm();
    }

    const validateInputPassword = async (event: any) => {
        setPasswordValidation(await validatePassword(event.target.value));
        validateForm();
    }

    const handleSubmit = async (formData: FormData) => {
        const loggedIn = await registerUser(formData);

        if (loggedIn)
            redirect('/profile');
        else{
            setError({message: 'Something went wrong!', hidden: false});
        }
        
    }

    return (
        <div className="container">
            <h1>Register</h1>
            <form action={handleSubmit}>
                <div className="row">
                    <div className="form-group col-md-4">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            className={`form-control ${emailValidation.status}`}
                            name="email" 
                            id="email" 
                            placeholder="Email"
                            onChange={validateInputEmail} />
                        <div className="valid-feedback">
                            {emailValidation.message}
                        </div>
                        <div className="invalid-feedback">
                            {emailValidation.message}
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            className={`form-control ${usernameValidation.status}`}
                            name="username" 
                            id="username" 
                            placeholder="Username"
                            onChange={validateInputUsername} />
                        <div className="valid-feedback">
                            {usernameValidation.message}
                        </div>
                        <div className="invalid-feedback">
                            {usernameValidation.message}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-md-4">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            type="text" 
                            className={`form-control ${firstNameValidation.status}`}
                            name="firstName" 
                            id="firstName" 
                            placeholder="First Name"
                            onChange={validateInputFirstName} />
                        <div className="valid-feedback">
                            {firstNameValidation.message}
                        </div>
                        <div className="invalid-feedback">
                            {firstNameValidation.message}
                        </div>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            type="text" 
                            className={`form-control ${lastNameValidation.status}`}
                            name="lastName" 
                            id="lastName" 
                            placeholder="Last Name"
                            onChange={validateInputLastName} />
                        <div className="valid-feedback">
                            {lastNameValidation.message}
                        </div>
                        <div className="invalid-feedback">
                            {lastNameValidation.message}
                        </div>
                    </div>
                </div>
                <div className="form-group col-md-8">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        className={`form-control ${passwordValidation.status}`}
                        name="password" 
                        id="password" 
                        placeholder="Password"
                        onChange={validateInputPassword} />
                    <div className="valid-feedback">
                        {passwordValidation.message}
                    </div>
                    <div className="invalid-feedback">
                        {passwordValidation.message}
                    </div>
                </div>
                <div className="alert alert-danger" role="alert" hidden={error.hidden}>
                    {error.message}
                </div>
                <button type="submit" className="btn btn-primary" disabled={buttonDisabled}>Submit</button>
            </form>
        </div>
    );
}