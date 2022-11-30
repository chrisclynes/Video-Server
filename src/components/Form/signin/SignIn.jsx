import { useState } from 'react';
import axios from 'axios';
import Form from '../form/Form';
import { Link } from "react-router-dom";

import '../form/form.css';

const SignIn = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);

    const userInputHandler = e => {
        setUserName(e.target.value);
    }

    const passwordInputHandler = e => {
        setPassword(e.target.value);
    }

    const onSubmitHandler = () => {
        if(!(password === '' || userName === '')) {
        //if user and password format are valid
        console.log('test')
        axios.post('/api/signIn', {
            userName: userName,
            password: password
            }).then(res => {
                console.log(res)
            //     this.setState({
            //         token: res.data.token
            //     });
            // const data = {
            //     token: token,
            //     time: new Date().getTime()
            // }
            // localStorage.setItem('userTokenTime', JSON.stringify(data));
            // this.setState({
            //     redirect: true
            // });
            }).catch(err => {
            console.log(err);
            });
        } else {
            alert('Please enter valid user and password');
        }
    }

    return (
        <Form onSubmit={onSubmitHandler}>
            <h3 className="text-center text-info">Login</h3>
            <div className="form-group">
                <label htmlFor="username" className="text-info">Username:</label>
                <input
                    id="username"
                    className="form-control"
                    type="text"
                    name="username"
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
                <button onClick={onSubmitHandler} className="btn btn-info btn-md" type="button">Submit</button>
                <Link to="/signup" className="text-info">Sign Up here</Link>
            </div>
        </Form>
    )
}

export default SignIn;