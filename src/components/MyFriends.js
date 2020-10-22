import React, {useEffect} from 'react';
import Friend from './Friend';
import Request from './Request';
import {useDispatch, useSelector} from 'react-redux';
import {getFriends, getRequests} from '../redux/friendReducer';
import axios from 'axios';
import AddFriendButton from './AddFriendButton';
import FallbackRow from './FallbackRow';

function MyFriends() {

    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.authReducer)
    const {friends, requests} = useSelector((state) => state.friendReducer)
    const {userId} = user

    useEffect(() => {
        axios.get(`/friends/all/${userId}`).then(res => {
            dispatch(getFriends(res.data))
            axios.get(`/friends/request/${userId}`).then(res => {
                dispatch(getRequests(res.data))
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
        
    }, [dispatch, userId])

    const accept = (friendId, userId) => {
        axios.put(`/friends/accept/${friendId}/${userId}`).then(res => {
            dispatch(getFriends(res.data))
            axios.get(`/friends/all/${userId}`).then(res => {
                dispatch(getFriends(res.data))
                axios.get(`/friends/request/${userId}`).then(res => {
                    dispatch(getRequests(res.data))
                }).catch(err => console.log(err))
            }).catch(err => console.log(err))
        }).catch(err => console.log(err))
        
    }

    const deny = (friendId, userId) => {
        axios.put(`/friends/deny/${friendId}/${userId}`).then(res => {
            dispatch(getRequests(res.data))
        }).catch(err => console.log(err))
    }

    const friendList = friends.map((friend, index) => <div key={index} className="table-row"><Friend key={index} friend={friend}/></div>)


    const requestList = requests.map(request => <Request key={request.id} request={request} accept={accept} deny={deny}/>)

    return (
        <div className="MyFriends dashboard-page">

            <AddFriendButton/>

            <div className="page-container">
                <div className="page-title">
                    <h1 className="title-white">My Friends</h1>
                </div>
                <div className="page-content">
                    <div className="table-container">  
                        <div className="table-header">
                            <p className=" table-title phrase-blue">Friends</p>
                        </div>
                        <div className="table-content">
                        {friendList.length > 0 ? friendList : <FallbackRow message="No friends to display currently"/>}
                        </div>
                        <div className="table-footer">
                        </div>
                    </div>
                    <div className="table-container">  
                        <div className="table-header">
                            <p className=" table-title phrase-blue">Requests</p>
                        </div>
                        <div className="table-content ">
                            {requestList.length > 0 ? requestList : <FallbackRow message="No pending friend request right now."/>}
                        </div>
                        <div className="table-footer">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyFriends;