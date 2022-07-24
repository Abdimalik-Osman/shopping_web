import {useState} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {useSelector} from 'react-redux';
import { selectCartTotal } from '../../store/cart/cart-selector';
import { selectCurrentUser } from '../../store/user/user-selector';
import Button , { BUTTON_TYPE_CLASSES } from './../buttons-component/button';
import './payment-form-styles.scss';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

    const paymentHandler = async (e) => {
        e.preventDefault();
        if(!stripe || !elements) return;
        
        setIsPaymentProcessing(true);
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amount * 100 }),
          }).then((res) => {
            return res.json();
          });
          
          const {paymentIntent: {client_secret}} = response;
        //   console.log(client_secret);

        const paymentResult = await stripe.confirmCardPayment(client_secret,{
            payment_method:{
                card: elements.getElement(CardElement),
                billing_details:{
                    name: currentUser? currentUser.displayName : 'Guest',
                },
            }
        })

        setIsPaymentProcessing(false);
        if(paymentResult.error) {
            alert(paymentResult.error);
        }
        else{
            if(paymentResult.paymentIntent.status === 'succeeded'){
                alert('Payment Success')
            }
        }
    }
    return(
        <div className="payment-form-container">
            <form onSubmit={paymentHandler} className="form-container">
            <h2>Credit Card Payment:</h2>
            <CardElement />
            <Button isLoading={isPaymentProcessing} buttonType={BUTTON_TYPE_CLASSES.inverted} id="payment-button" >Pay Now</Button>
            </form>
        </div>
    )
}
export default PaymentForm;