import {types} from "../config/constant";

export const authReducer = ( state = {}, action ) => {

    switch ( action.type ) {
        case types.login:
            return {
                id: action.payload.id,
                username: action.payload.username,
                firstname: action.payload.firstname,
                img: action.payload.img,
                token: action.payload.token
            }

        case types.logout:
                return { }
    
        default:
            return state;
    }

}