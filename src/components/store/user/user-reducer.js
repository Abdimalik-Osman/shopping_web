// ACTION TYPE
const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
}
// INITIAL STATE value
const initialStateValue = {
    currentUser:null,
}
// reducer function
export const userReducer = (state = initialStateValue, action) =>{
    
    const {type, payload} = action;
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state;
    }
}