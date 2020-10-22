import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {loginUser} from '../redux/authReducer';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ZeppiCloud from '../assets/ZeppiLogo/ZeppiCloud/ZeppiCloud';
import CloudSpan from '../assets/Clouds/CloudSpan/CloudSpan';

function Login() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        if(email !== '' && password !== '') {
            axios.post('/auth/login', {email, password}).then(res => {
                dispatch(loginUser(res.data))
                history.push('/map')
            }).catch(err => {
                console.log(err)
                alert('Could not log in.')
            })
        } else {
            // Notifiy user ------ Email or password can not be left blank
        }
    }

    return (
        <div className="auth-page">
            <div className="Login">
                <div className="AuthForm">
                    <div className="container__row">
                        <div className="LoginForm">
                            <div className="container__row">
                                <Link to="/" className="AuthLogo">
                                    <ZeppiCloud/>
                                </Link>
                                <h1 className="AuthTitle">ACCOUNT LOGIN</h1>
                                <div className="container__row justify-center">
                                    <input 
                                        className="AuthInput"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}></input>
                                </div>
                                <div className="container__row justify-center">
                                    <input 
                                        className="AuthInput"
                                        placeholder="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}></input>
                                </div>
                                <div className="container__row justify-center">
                                    <button className="AuthSubmit" onClick={handleLogin}>LOGIN</button>
                                </div>
                                <Link to="/signup" className="container__row justify-center textDecor">
                                    <h2 className="auth-form-link m-b-1">Don't have an account?</h2>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="GraphicRow">
                <CloudSpan className="CloudSpan"/>
            </div>
        </div>
    )
}

export default Login;