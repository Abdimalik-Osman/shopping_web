import React,{useEffect} from 'react'
import { getRedirectResult } from 'firebase/auth'
import {
      auth, 
      signInWithGooglePopup,
      signInWithGoogleRedirect,
      createUserDocumentFromAuth
    } from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form-component/sign-up-form';
import SignInForm from '../../components/sign-in-form-component/sign-in-form';
import '../authentication-page-component/authentication-styles.scss';
const  Authentication = () => {

  return (
    <div className="authentication-container">     
      <SignInForm />
      <SignUpForm />
    </div>

  )
}

export default Authentication;