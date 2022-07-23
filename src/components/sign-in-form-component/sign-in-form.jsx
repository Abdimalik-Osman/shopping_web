import React,{useState, useContext} from 'react'
import { useDispatch } from 'react-redux';
// import {UserContext} from '../contexts/user-context';
import FormInput from '../form-input-component/form-input';
import './sign-in-form-styles.scss';
import Button from '../buttons-component/button';
import {signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth,signInWithGooglePopup} from '../../utils/firebase/firebase.utils';
import { googleSignInStart, emailSignInStart } from '../../store/user/user-action';
const defaultFormFields = {
    email: '',
    password: ''
}
function SignInForm() {
    const dispatch = useDispatch();
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;
    
    // const {setCurrentUser} = useContext(UserContext);
    
    // reset form fields
    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    // handle change 
    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields, [name]: value});
    }
      // log with google
  const SignInWithGoogle = async () => {
    // await signInWithGooglePopup();
    dispatch(googleSignInStart());
  }
    // submit data
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            dispatch(emailSignInStart(email, password));
            // setCurrentUser(user);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for this email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email address');
                    break;
                default:
                    console.log(error);
            }
        }
    }
  return (
    <div className='sign-in-container'>
    <h2>Already have an account?</h2>
    <span>Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput
            label="Email"
            type="email" name="email"
            onChange={handleChange}
            value={email} 
            required
            />

            <FormInput
            label="Password"
            type="password" name="password"
            onChange={handleChange}
            value={password} 
            required
            />
            <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button type="button" buttonType="google" onClick={SignInWithGoogle}>Google Sign In</Button>
            </div>
        </form>
    </div>
  )
}

export default SignInForm;