import React from 'react'
import "./Subtotal.css"
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from './StateProvider'
import { useHistory } from 'react-router-dom'

function Subtotal() {
    const history = useHistory(); //Browser History , it will give
    //history.push vs link (get a new link to browser)
    //programatically push the user to somewhere , we will use history.push
    // we dont want hyperlink
    const [{basket}] = useStateValue() // Pull the basket from useStateValue

    // Homework - Calculate basket total
    const calculateTotal = (basket) => {
        return basket.reduce((price, item) => item.price + price, 0)
    }
    return (
        <div className="subtotal">
            <CurrencyFormat 
            renderText={(value) => (
                <>
                <p>
                Subtotal ({basket.length} items): <strong>{calculateTotal(basket)}</strong> 
                </p>
                <small className="subtotal__gift">
                    <input type="checkbox" /> This order contains a gift
                </small>
                </>
            )}
            decimalScale={2}
            value={0} // Part of the homework
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            />
             <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal