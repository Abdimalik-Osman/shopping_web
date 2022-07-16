import React,{useState, useContext} from 'react';
// import { UserContext } from '../contexts/user-context';
import FormInput from '../form-input-component/form-input';
import './sign-up-form-styles.scss';
import Button from '../buttons-component/button';
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils';


const defaultFormFields = {
    displayName:'',
    email: '',
    password: '',
    confirmPassword: ''
}
function SignUpForm() {

    const [formFields,setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;
    
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
    // submit data
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (confirmPassword !== password) {
            alert("passwords are not same.");
            return;
        }
        
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            // setCurrentUser(user);
            await createUserDocumentFromAuth(user,{displayName});
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/email-already-in-use': 
                    alert('can not create user, email already in use');
                    break;
                default:
                    console.log("user creation encountered an error ",error);
            }
        }

    }
  return (
    <div className='sign-up-container'>
    <h2>Don't have an account.</h2>
    <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput
            label="Display Name"
            type="text" name="displayName"
            onChange={handleChange}
            value={displayName} 
            required
            />

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

            <FormInput
            label="Confirm Password"
            type="confirmPassword" name="confirmPassword"
            onChange={handleChange}
            value={confirmPassword} 
            required
            />
        
            <Button type="submit">Sign Up</Button>
        </form>
    </div>
  )
}

export default SignUpForm;