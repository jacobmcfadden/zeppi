import React, {useEffect} from 'react';
import DropSnapshot from './DropSnapshot';
import {useDispatch, useSelector} from 'react-redux';
import {getDrops} from '../redux/messageReducer';
import axios from 'axios';
import AddMessageButton from './AddMessageButton';
import FallbackRow from './FallbackRow';

function MyDrops() {

    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.authReducer)
    const {drops} = useSelector((state) => state.msgReducer)
    const {userId, totalDrops} = user

    useEffect(() => {
        axios.get(`/msg/drops/${userId}`).then(res => {
            dispatch(getDrops(res.data))
        }).catch(err => console.log(err))
    }, [dispatch, userId])
    
    return (
        <div className="MyDrops dashboard-page">
            <AddMessageButton/>
            <div className="page-container">
                <div className="page-title">
                    <h1 className="title-white">My Drops</h1>
                </div>
                <div className="page-content">
                    <div className="page-header">
                        <div className="container__row justify-between">
                        <div className="half-box">
                            <div className="highlight-container">
                                <div className="highlight-type">Active</div>
                                <div className="highlight-count highlight-red">{drops.length}</div>
                                <div className="highlight-focus">Drops</div>
                            </div>
                        </div>
                        <div className="half-box">
                            <div className="highlight-container">
                                <div className="highlight-type">Total</div>
                                <div className="highlight-count highlight">{totalDrops}</div>
                                <div className="highlight-focus">Drops</div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="table-container">  
                        <div className="table-header">
                            <p className=" table-title phrase-blue">Active Drops</p>
                        </div>
                        <div className="table-content">
                            {drops.length > 0 ? drops.map((item, index) => <div key={index} className="table-row"><DropSnapshot key={index} drop={item}/></div>) : <FallbackRow message="You currently have no active drops!"/>}
                        </div>
                        <div className="table-footer">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyDrops;