const initialState = {
    friends: [],
    requests: [],
    users: []
}

const GET_FRIENDS = 'GET_FRIENDS'
const GET_REQUESTS = 'GET_REQUESTS'
const GET_USERS = 'GET_USERS'

export function getFriends(payload){
    return {
        type: GET_FRIENDS,
        payload: payload
    }
}

export function getRequests(payload){
    return {
        type: GET_REQUESTS,
        payload: payload
    }
}

export function getUsers(payload){
    return {
        type: GET_USERS,
        payload: payload
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case GET_FRIENDS:
            return {...state, friends: payload}
        case GET_REQUESTS:
            return {...state, requests: payload}
        case GET_USERS:
            return {...state, users: payload}
        default:
            return state
    }
}