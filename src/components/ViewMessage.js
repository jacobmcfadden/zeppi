import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {usePosition} from './Location';
import {getUser} from '../redux/authReducer';
import axios from 'axios';
import LoadingPopup from './LoadingPopup';
import FallbackRow from './FallbackRow';

function ViewMessage() {

    const history = useHistory()
    const dispatch = useDispatch()
    const {viewMessage} = useSelector((state) => state.msgReducer)
    const {user} = useSelector((state) => state.authReducer)
    const {latitude, longitude} = usePosition()
    const {message_id, lat, long} = viewMessage
    const [match, setMatch] = useState(false)
    const [result, setResult] = useState({})
    const {message, sender_name} = result
    const {userId, totalLoot} = user
    const [failed, setFail] = useState()

    useEffect(() => {
        const lootId = message_id
        if (message_id && latitude && longitude){
            axios.get(`/msg/match/${lootId}/${latitude}/${longitude}`).then(res => {
               if(res.data[0]){
                setResult(res.data[0])
                setMatch(true)
               }
            }).catch(setFail(true))
        }
    }, [message_id, lat, long, latitude, longitude])

    const close = () => {
        const newTotal = totalLoot + 1
        setMatch(false)
        axios.put('/msg/totalLoot', {userId, newTotal}).then(() => {
            axios.delete(`/msg/delete/${message_id}`).then(() => {
                axios.get('/auth/user').then(res => {
                    dispatch(getUser(res.data))
                    history.push('/loot')
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
        
    }

    const back = () => {
        history.push(`/loot`)
    }

    return (
        <div className="ViewMessage dashboard-page">
        
        { match === true ? (
            <div className="page-container">
                <div className="page-title">
                    <h1 className="title-white">View Message</h1>
                </div>
                <div className="page-content">
                    <div className="page-header">
                        <div className="container__row justify-between">
                            <div className="full-box">
                                <div className="container__row justify-between">
                                    <div className="container__col-22 container__col-offset-1">
                                        <p className="page-input">{`From: ${sender_name}`}</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="page-header">
                        <div className="container__row justify-between">
                            <div className="full-box">
                                <div className="text-container">
                                    <p className="text-display">{message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="page-action"> 
                        <button className="btn-lg-yellow page-btn" onClick={close}>CLAIM</button>
                    </div>

                </div>

            </div> )
            : failed === true ? (
                <div className="page-container">
                    <div className="page-title">
                        <h1 className="title-white">Oops...</h1>
                    </div>
                    <div className="page-content">
                        <div className="table-container">  
                            <div className="table-header">
                            </div>
                            <div className="table-content ">
                                <FallbackRow message="Looks like you're lost... Check your position and try again!"/>
                            </div>
                            <div className="table-footer">
                            </div>
                        </div>
                        <div className="page-action"> 
                        <button className="btn-lg-yellow page-btn" onClick={back}>BACK</button>
                        </div>

                    </div>
                </div>
            )
            :
            <LoadingPopup messageFound={true} isLoading={!match}/> 
            }

        </div>
        

    )
}

export default ViewMessage;