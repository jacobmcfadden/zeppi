const initialState = {
    user: {},
    isAuthenticated: false
}

const LOGIN_USER = 'LOGIN_USER'
const GET_USER = 'GET_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function loginUser(payload){
    return {
        type: LOGIN_USER,
        payload
    }
}

export function getUser(payload){
    return {
        type: GET_USER,
        payload: payload
    }
}

export function logoutUser(){
    return {
        type: LOGOUT_USER,
        payload: initialState
    }
}

export default function reducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case LOGIN_USER:
            return {...state, user: payload, isAuthenticated: true}
        case GET_USER:
            return {...state, user: payload, isAuthenticated: true}
        case LOGOUT_USER:
            return {...state, ...payload, isAuthenticated: false}
        default:
            return state
    }
}
