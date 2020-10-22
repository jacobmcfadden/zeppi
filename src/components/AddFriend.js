import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUsers} from '../redux/friendReducer'
import User from './User'
import axios from 'axios';
import SearchIcon from '../assets/icons/systemIcons/SearchIcon'


function AddFriend() {

    const {user} = useSelector((state) => state.authReducer)
    const {userId} = user
    const {users} = useSelector((state) => state.friendReducer)
    const dispatch = useDispatch()
    const [nameSearch, setName] = useState('')
    const [results, setResults] = useState([])
    const [searching, setSearch] = useState(false)

    useEffect(() => {
        axios.get(`/friends/find/${userId}`).then(res => {
            dispatch(getUsers(res.data))
        }).catch(err => console.log(err))
    }, [dispatch, userId])

    const addFriend = (userOne, userTwo) => {
        axios.post(`/friends/newFriend`, {userOne, userTwo}).then(res => {
            dispatch(getUsers(res.data))
            setSearch(false)
        }).catch(err => console.log(err))
    }

    const search = () => {
        const regex = new RegExp (`${nameSearch}`, 'gmi')
        setResults(users.filter(item => item.user_name.match(regex)))
        setName('')
        setSearch(true)
    }

    const resultList = results.map((person, index) => <div key={index} className="table-row"> <User key={index} person={person} addFriend={addFriend}/></div>)

    const userList = users.map((person, index) => <div key={index} className="table-row"> <User key={index} person={person} addFriend={addFriend}/></div>)

    return (
        <div className="AddFriend dashboard-page">
            <div className="page-container">
                <div className="page-title">
                    <h1 className="title-white">Find Friends</h1>
                </div>
                <div className="page-content">
                    <div className="page-header">
                        <div className="container__row justify-between">
                            <div className="full-box">
                                <div className="container__row justify-between">
                                    <div className="container__col-21 container__col-offset-1">
                                        <div className="container__row justify-between">
                                            <input 
                                            value={nameSearch}
                                            placeholder="Search Users by Username..."
                                            type="text"
                                            onChange={(e) => setName(e.target.value)}
                                            className="page-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="container__col-2">
                                        <SearchIcon  width="1.3rem" height="1.3rem" className="inputIcon m-t-75" onClick={search}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-container">  
                        <div className="table-header">
                            <p className=" table-title phrase-blue">See a friend?</p>
                        </div>
                        {searching ? 
                        <div className="table-content">
                            {resultList}
                        </div> :
                        <div className="table-content">
                            {userList} 
                        </div>}
                    </div>
                </div>
            </div>
        </div>

)
}

export default AddFriend;