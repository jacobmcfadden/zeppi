import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {loginUser} from '../redux/authReducer';
import axios from 'axios';
import ZeppiCloud from '../assets/ZeppiLogo/ZeppiCloud/ZeppiCloud';
import CloudSpan from '../assets/Clouds/CloudSpan/CloudSpan';
import ArrowLeftIcon from '../assets/icons/systemIcons/ArrowLeftIcon';
// ADDED FOR REGEX----------------------
import * as RegexService from '../services/RegexService';
import FormInput from './FormInput';
// END ADD FOR REGEX-----------------

function Signup() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    // ADDED FOR REGEX----------------------------
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [passwordConfirmInvalid, setPasswordConfirmInvalid] = useState(false);
    const [firstNameInvalid, setFirstNameInvalid] = useState(false);
    const [lastNameInvalid, setLastNameInvalid] = useState(false);
    const [phoneInvalid, setPhoneInvalid] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);

    const onFirstNameChange = (event) => {
        if(RegexService.validateInput(event.target.value, event.target.name)){
            // Format check passed
            setFirstName(RegexService.formatInput(event.target.value, event.target.name));
            setFirstNameInvalid(false);
        } else {
            // the format check failed
            setFirstName(RegexService.formatInput(event.target.value, event.target.name));
            firstName !== '' ? setFirstNameInvalid(true) : setFirstNameInvalid(false); 
        }

    }

    const onLastNameChange = (event) => {
        if(RegexService.validateInput(event.target.value, event.target.name)){
            // Format check passed
            setLastName(RegexService.formatInput(event.target.value, event.target.name));
            setLastNameInvalid(false);
        } else {
            // the format check failed
            setLastName(RegexService.formatInput(event.target.value, event.target.name));
            lastName !== '' ? setLastNameInvalid(true) : setLastNameInvalid(false)
        }

    }

    const onPhoneChange = (event) => {
        if(RegexService.validateInput(event.target.value, event.target.name)){
            // Format check passed
            setPhone(RegexService.formatInput(event.target.value, event.target.name));
            setPhoneInvalid(false);
        } else {
            // the format check failed
            setPhone(RegexService.formatInput(event.target.value, event.target.name));
            phone !== '' ? setPhoneInvalid(true) : setPhoneInvalid(false);
        }
    }

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const onEmailChange = (event) => {
        if(RegexService.validateInput(event.target.value, event.target.name)){
            // Format check passed
            setEmail(RegexService.formatInput(event.target.value, event.target.name));
            setEmailInvalid(false);
        } else {
            // the format check failed
            setEmail(RegexService.formatInput(event.target.value, event.target.name));
            email !== '' ? setEmailInvalid(true) : setEmailInvalid(false);
        }
    }

    const onPasswordChange = (event) => {
        if(RegexService.validateInput(event.target.value, event.target.name)){
            // Format check passed
            setPassword(event.target.value);
            setPasswordInvalid(false);
            if(event.target.value === confirm) {
                setPasswordConfirmInvalid(false);
            } else {
                setPasswordConfirmInvalid(true);
            }
        } else {
            // the format check failed
            setPassword(event.target.value);
            setPasswordInvalid(true);
        }
    }

    const onPasswordConfirmChange = (event) => {
        if(event.target.value === password){
            // Format check passed
            setConfirm(event.target.value);
            setPasswordConfirmInvalid(false);
        } else {
            // the format check failed
            setConfirm(event.target.value);
            setPasswordConfirmInvalid(true);
        }
    }

// END OF REGEX ADD--------------------

    const handleRegister = () => {
        if(firstName !== '' && lastName !== '' && phone !== '' && email !== '' && username !== '' && password !== '') {
            if(!firstNameInvalid && !lastNameInvalid && !phoneInvalid && !emailInvalid && !passwordInvalid) {
                if(password === confirm){
                    axios.post('/auth/register', {username, firstName, lastName, phone, email, password}).then(res => {
                        dispatch(loginUser(res.data))
                        history.push('/map')
                    }).catch(err => {
                        console.log(err)
                        alert('Could not register with provided information.')
                    })
                } else {
                    alert('Passwords do not match.')
                    setPasswordInvalid(true);
                    setPasswordConfirmInvalid(true);        
                }
            } else {
                // Notify user they need to correct invalid input fields
            }
        } else {
            // Notification --- All input fields must be filled out correctly
        }
    }

    return (
        <div className="auth-page">
            <div className="Signup">
                <div className="AuthForm">
                    <div className="container__row">
                        <div className="LoginForm">
                            <div className="container__row">
                                <Link to="/" className="AuthLogo">
                                    <ZeppiCloud/>
                                </Link>
                                <h1 className="AuthTitle">ACCOUNT SIGNUP</h1>
                                {/* FIRST NAME INPUT */}
                                <div className="container__col-24"> 
                                <FormInput
                                    styling={'input'}
                                    hide={false}
                                    inputInvalid={firstNameInvalid}
                                    inputId={'firstName'}
                                    name={'firstName'}
                                    value={firstName}
                                    type={'text'}
                                    placeholder={'First Name'}
                                    required={true}
                                    handleClick={onFirstNameChange}
                                    label={'First Name'}
                                    validationMessage={'Firstname must have no spaces.'}
                                />
                                </div>
                                {/* LAST NAME INPUT */}
                                <div className="container__col-24">
                                    <FormInput
                                        styling={'input'}
                                        hide={false}
                                        inputInvalid={lastNameInvalid}
                                        inputId={'lastName'}
                                        name={'lastName'}
                                        value={lastName}
                                        type={'text'}
                                        placeholder={'Last Name'}
                                        required={true}
                                        handleClick={onLastNameChange}
                                        label={'Last Name'}
                                        validationMessage={'Last name must have no spaces.'}
                                    />
                                </div>
                                {/* PHONE INPUT */}
                                <div className="container__col-24">
                                    <FormInput
                                        styling={'input'}
                                        hide={false}
                                        inputInvalid={phoneInvalid}
                                        inputId={'phone'}
                                        name='phone'
                                        value={phone}
                                        type='tel'
                                        placeholder={'Phone Number'}
                                        required={true}
                                        handleClick={onPhoneChange}
                                        label={'Phone Number'}
                                        validationMessage={'Phone number should only be 10 digits long.'}
                                    />
                                </div>
                                {/* EMAIL INPUT */}
                                <div className="container__col-24">
                                    <FormInput
                                        styling={'input'}
                                        hide={false}
                                        inputInvalid={emailInvalid}
                                        inputId={'email'}
                                        name={'email'}
                                        value={email}
                                        type={'email'}
                                        placeholder={'Email Address'}
                                        required={true}
                                        handleClick={onEmailChange}
                                        label={'Email Address'}
                                        validationMessage={'Email incorrect, please revise.'}
                                    />
                                </div>
                                {/* USERNAME INPUT */}
                                <div className="container__col-24">
                                    <FormInput
                                        styling={'input'}
                                        hide={false}
                                        inputInvalid={false}
                                        inputId={'username'}
                                        name={'username'}
                                        value={username}
                                        type={'text'}
                                        placeholder={'Username'}
                                        required={true}
                                        handleClick={onUsernameChange}
                                        label={'Username'}
                                        validationMessage={'Username must be 5+ characters in length.'}
                                    />
                                </div>
                                {/* PASSWORD INPUT */}
                                <div className="container__col-24">
                                    <FormInput
                                        styling={'input'}
                                        hide={false}
                                        inputInvalid={passwordInvalid}
                                        inputId={'password'}
                                        name={'password'}
                                        value={password}
                                        type={'password'}
                                        placeholder={'Password'}
                                        required={true}
                                        handleClick={onPasswordChange}
                                        label={'Password'}
                                        validationMessage={'1-lowercase, uppercase, number, 9+ characters.'}
                                    />
                                </div>
                                {/* CONFIRM PASSWORD INPUT */}
                                <div className="container__col-24">
                                    <FormInput
                                        styling={'input'}
                                        hide={false}
                                        inputInvalid={passwordConfirmInvalid}
                                        inputId={'passwordConfirm'}
                                        name={'passwordConfirm'}
                                        value={confirm}
                                        type={'password'}
                                        placeholder={'Confirm Password'}
                                        required={true}
                                        handleClick={onPasswordConfirmChange}
                                        label={'Confirm Password'}
                                        validationMessage={'Password and Confirm Password must match.'}
                                    />
                                </div>
                                <div className="container__row justify-center">
                                    <button className="AuthSubmit" onClick={handleRegister}>SIGNUP</button>
                                </div>
                                <div className="container__row justify-center align-center">
                                    <Link to="/login" className="flex textDecor">
                                        <ArrowLeftIcon className="auth-form-link" height=".8rem"/>
                                        <h2 className="auth-form-link">Back to Login</h2>
                                    </Link>
                                </div>
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

export default Signup;