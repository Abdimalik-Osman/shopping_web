import { createContext, useState, useEffect, useReducer } from "react";
import {onAuthStateChangedListener,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import { createAction } from "../../utils/reducer/reducer-utils";
import USER_ACTION_TYPES from '../../store/user/user-type'
// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

// INITIAL STATE value
const initialStateValue = {
    currentUser:null,
}
// reducer function
const userReducer = (state, action) =>{
    
    const {type, payload} = action;
    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}
export const UserProvider = ({children}) => {
    
    
    const [{currentUser}, dispatch] = useReducer(userReducer,initialStateValue);
    // console.log(currentUser);
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user)=>{
            // console.log(user);
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
    },[]);

    const value = {currentUser, setCurrentUser};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};