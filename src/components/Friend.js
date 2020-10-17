import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux'
import UserIcon from '../assets/icons/systemIcons/AccountIcon';

function Friend(props) {

    const [friendName, setFriend] = useState('')
    const {user_a, user_b} = props.friend
    const {user} = useSelector((state) => state.authReducer)
    const {username} = user

    useEffect(() => {
    if(user_a === username){
        return setFriend(user_b)
    } else if (user_b === username){
        return setFriend(user_a)
    };

}, [user_a, user_b, username]);

    return (
        <div className="snapshot">
            <div className="snapshot-content">
                <div className="snapshot-icon">
                    {/* PUT USER ICON HERE */}
                    <UserIcon className="m-h-auto" height="1.5rem" width="1.5rem"/>
                </div>
                <div className="snapshot-info m-t-50">
                    <h1 className="body-blue">{friendName}</h1>
                </div>
            </div>
            <div className="snapshot-action">
                {/* <ExpandAltIcon onClick={() => {}}/> */}
            </div>
        </div>
    )
}

export default Friend;