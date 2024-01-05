'use client';

import { validateInput, loginUser } from './actions';
import { useState } from 'react';
import { redirect } from 'next/navigation';

export default function LoginForm(props:any) {

    let [emailValidation, setEmailValidation]
     = useState({status: '', message: ''});

    let [passwordValidation, setPasswordValidation]
     = useState({status: '', message: ''});

    let [buttonDisabled, setButtonDisabled] = useState(true);

    const validateForm = () => {
        if (emailValidation.status === 'is-valid' &&
            passwordValidation.status === 'is-valid') {
                setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }

    const validateInputEmail = async (event: any) => {
        setEmailValidation(await validateInput(event.target.value));
        validateForm();
    }

    const validateInputPassword = async (event: any) => {
        setPasswordValidation(await validateInput(event.target.value));
        validateForm();
    }

    const handleSubmit = async (formData: FormData) => {
        const status = await loginUser(formData);

        if (status === 200)
            redirect('/profile');
        else{
            setEmailValidation({status: 'is-invalid', message: 'Invalid email or password.'});
            setPasswordValidation({status: 'is-invalid', message: 'Invalid email or password.'});
            validateForm();
        }

    }

    return (
        <div className="container">
            <h1>Log In</h1>
            <form action={handleSubmit}>
                <div className="form-group md-8">
                    <label htmlFor="emailOrUsername">Email or Username</label>
                    <input 
                        type="text" 
                        className={`form-control ${emailValidation.status}`}
                        name="emailOrUsername" 
                        id="emailOrUsername" 
                        placeholder="Email or Username"
                        onInput={validateInputEmail} />
                    <div className="valid-feedback">
                        {emailValidation.message}
                    </div>
                    <div className="invalid-feedback">
                        {emailValidation.message}
                    </div>

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        className={`form-control ${passwordValidation.status}`}
                        name="password" 
                        id="password" 
                        placeholder="Password"
                        onInput={validateInputPassword} />
                    <div className="valid-feedback">
                        {passwordValidation.message}
                    </div>
                    <div className="invalid-feedback">
                        {passwordValidation.message}
                    </div>
                </div>
                
                <button type="submit" className="btn btn-primary" disabled={buttonDisabled}>Submit</button>
            </form>
        </div>
    );
}