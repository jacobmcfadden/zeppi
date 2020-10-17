import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AddressBook from './AddressBook';
import {getFriends} from '../redux/friendReducer';
import axios from 'axios';
import {getUser} from '../redux/authReducer';
import CloseIcon from '../assets/icons/systemIcons/CloseIcon';

const NewMessageModal = (props) => {

    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.authReducer)
    const {userId, totalDrops}  = user
    const {latitude, longitude} = props;
    const [receiver, setReceiver] = useState('')
    const [message, setMessage] = useState('')
    const {friends} = useSelector((state) => state.friendReducer)

    useEffect(() => {
        axios.get(`/friends/all/${userId}`).then(res => {
            dispatch(getFriends(res.data))
        })
    }, [dispatch, userId])

    const newMessage =  () => {
        const sender = userId;
        const newTotal = totalDrops + 1;
        axios.post('/msg/newMsg', {message, sender, receiver, latitude, longitude}).then(() => {
            axios.put('/msg/totalDrops', {userId, newTotal}).then(() => {
                axios.get('/auth/user').then(res => {
                    dispatch(getUser(res.data))
                    props.handleClose()
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
        
    }

    const addressBook = friends.map((friend, index) => <AddressBook key={index} friend={friend}/>)

    return (
        <div className="NewMessageModal modal-overlay">
            <div className="modal-container">
                <div className="flex justify-end">
                    <CloseIcon className='color-red m-t-1 m-r-1' onClick={e => props.handleClose(e)}/>
                </div>
                <div className="page-title">
                    <h1 className="title-blue m-t-3">New Drop</h1>
                </div>
                <div className="page-content">
                    <div className="page-header">
                        <div className="container__row justify-between">
                            <div className="full-box">
                                <div className="container__row justify-between">
                                    <select 
                                    value={receiver}
                                    className="input container__col-22 container__col-offset-1"
                                    onChange={(e) => setReceiver(e.target.value)}>
                                        <option disabled value=''>Recipient</option>
                                        {addressBook}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="page-header">
                        <div className="container__row justify-between">
                            <div className="full-box">
                                <div className="container__row justify-between">
                                    <textarea
                                    type="text"
                                    placeholder="Type your message here..."
                                    className="input container__col-22 container__col-offset-1"
                                    onChange={(e) => setMessage(e.target.value)}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-action"> 
                        <button className="btn-lg-red page-btn m-b-3" onClick={newMessage}>ADD DROP</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewMessageModal;