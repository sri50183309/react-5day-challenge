import React, { useState, useEffect } from 'react'
import "./Payment.css"
import {useStateValue} from  "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import {Link, useHistory} from "react-router-dom";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format'
import axios from './axios';
import { getBasketTotal } from "./reducer";
import {db} from "./firebase";
function Payment() {
    const [{basket, user}, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    //piece of code , run when the payment componenet loads and as well as when any of the dispatch changes
    useEffect(() => {
            //generate the special stripe secret which allows us to charge a 
            //customer

            //axios - fetching library
            const getClientSecret = async () => {
                const response = await axios ({
                    method: 'post',
                    //Strips expects the total in a currencies subunits
                    url: `/payments/create?total=${getBasketTotal(basket) * 100}`
                })
                setClientSecret(response.data.clientSecret)
            }
            getClientSecret();
    }, [basket]);

    console.log('The Secret is  >>> ', clientSecret); //secret key is to power the entire stripe transactions
    const handleSubmit = async (event) => {
        //do all the fancy stripe stuff
        event.preventDefault();
        setProcessing(true); //disable button and pass the submit button clicking again

        //PreStep
        // Client Secrets, tell strip that i have payment that i will sent , give me client secret 

        //use clientSecrets, this is how strip how much money to charge
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation
            console.log('payment intent from stripe', paymentIntent)
            console.log('basket',basket)
            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              }).then(() => {
                  console.log('Created Successfully')
              }).catch((exception) => {
                console.log('Failed while creating', exception)  
              })
            
            setSucceeded(true);
            setError(null)
            setProcessing(false)

            //react context api TO EMPTY BASKET

            //push order to firestore database

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
    }

    const handleChange = event => {
           // Listen for changes in Card Element
           //and display any errors as the customer types their card details 
           setDisabled(event.empty);
           setError(event.error ?  event.error.message : "");
    }
    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout ( <Link to="/checkout"> {basket?.length} items</Link>)
                </h1>
                {/* PaymentSection - delivery Address */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3> Delivery Address </h3>
                    </div>
                    <div className="payment__title">
                        <p> {user?.email}</p>
                        <p> 123 React lane</p>
                        <p> Los Angles, CA</p>
                    </div>
                </div>

                {/* PaymentSection - Review items */}
                <div className="payment__section">
                    <div className="payment__title">
                            <h3> Review items and Delivery </h3>
                    </div>
                    <div class="payment__items"> 
                        {basket.map(item =>(
                                <CheckoutProduct 
                                    id = {item.id}
                                    title = {item.title}
                                    image = {item.image}
                                    price = {item.price}
                                    rating = {item.rating}
                                />
                             )
                            )}
                    </div>
                </div>

                {/* PaymentSection - Payment Method
                 */}
                    <div className="payment__section">
                        <div className="payment__title">
                                <h3> Payment Method </h3>
                        </div>
                        <div className="payment__details">
                            {/* Stripe magic will go */}
                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}></CardElement>
                                <div className="payment__priceContainer">
                                <CurrencyFormat 
                                    renderText={(value) => (
                                       <h3> Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)} // Part of the homework
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                    />
                                    <button disabled={processing || disabled || succeeded}> 
                                    <span> {processing ? <p> Processing</p> : "Buy Now"}</span>
                                    </button>
                                </div>
                                    {error && <div> {error}</div>}
                            </form>
                        </div>
                    </div>
    
            </div>
        </div>
    )
}

export default Payment
