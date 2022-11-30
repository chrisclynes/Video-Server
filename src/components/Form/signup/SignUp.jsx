import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';

import Form from '../form/Form';
import '../form/form.css';

const SignUp = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const userInputHandler = e => {
        setUserName(e.target.value);
    }

    const passwordInputHandler = e => {
        setPassword(e.target.value);
    }


    const onSubmitHandler = (e) => {
    e.preventDefault();
    if(!(password === '' || userName === '')) {
        //if user and password format are valid
      axios.post('/api/signUp', {
        userName: userName,
        password: password
      }).then(res => {
        setRedirect(true);
      }).catch(err => {
        console.log(err);
      });
    } else {
      alert('Please enter valid details');
    }
  }

  return (
    <>
    {redirect && <Navigate to='/' />} 
        <Form onSubmit={onSubmitHandler}>
            <h3 className="text-center text-info">Register</h3>
            <div className="form-group">
            <label htmlFor="first-name" className="text-info">Username:</label>
            <input
                id="first-name"
                className="form-control"
                type="text"
                name="firstName"
                placeholder="Username"
                onChange={userInputHandler}
                required />
            </div>
            <br />
            <div className="form-group">
            <label htmlFor="password" className="text-info">Password:</label>
            <input
                id="password"
                className="form-control"
                type="password"
                name="password"
                placeholder="********"
                onChange={passwordInputHandler}
                required />
            </div>
            <br />
            <div className="d-flex justify-content-between align-items-end">
            <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
            <Link to="/signIn" className="text-info">Login here</Link>
            </div>
        </Form>
      </>
    );
}

export default SignUp;