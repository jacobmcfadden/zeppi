import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Snapshot from './Snapshot';
import {getLoot, getMessage} from '../redux/messageReducer';
import axios from 'axios';
import FallbackRow from './FallbackRow';

function MyLoot() {
    
    const history = useHistory()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.authReducer)
    const {loot} = useSelector((state) => state.msgReducer)
    const {userId, totalLoot} = user

    useEffect(() => {
        axios.get(`/msg/loot/${userId}`).then(res => {
            dispatch(getLoot(res.data))
        }).catch(err => console.log(err))

    }, [dispatch, userId])

    const view = (lootId) => {
        axios.get(`/msg/view/${lootId}`).then(res => {
            dispatch(getMessage(res.data))
            history.push(`/viewMessage/${lootId}`)
        }).catch(err => console.log(err))
    }

    return (
        <div className="MyLoot dashboard-page">
            <div className="page-container">
                <div className="page-title">
                    <h1 className="title-white">My Loot</h1>
                </div>
                <div className="page-content">
                    <div className="page-header">
                        <div className="container__row justify-between">
                        <div className="half-box">
                            <div className="highlight-container">
                                <div className="highlight-type">Pending</div>
                                <div className="highlight-count highlight-warning">{loot.length}</div>
                                <div className="highlight-focus">Loot</div>
                            </div>
                        </div>
                        <div className="half-box">
                            <div className="highlight-container">
                                <div className="highlight-type">Total</div>
                                <div className="highlight-count highlight">{totalLoot}</div>
                                <div className="highlight-focus">Loot</div>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="table-container">  
                        <div className="table-header">
                            <p className=" table-title phrase-blue">Pending Loot</p>
                        </div>
                        <div className="table-content">
                            {loot.length > 0 ? loot.map(item =><div key={item.message_id} className="table-row"><Snapshot key={item.message_id} loot={item} view={view}/></div>) : <FallbackRow message="No pending loot at the moment."/>}
                        </div>
                        <div className="table-footer">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyLoot;