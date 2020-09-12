import React, { useEffect } from "react";
import './App.css';
import Header from './Header'
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Checkout from './Checkout';
import Orders from './Orders';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from "./StateProvider";
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"

const promise = loadStripe('pk_test_51HQJ8BBNC5WdoLWo5l72sR89ypC0VgfKWtV53b69R34tXejpcedtUQidhYxM3KTfI9CGnkAywcBJRbv7Ci3ZfJVz00V563AYSC')

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    //will run only once when app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('The user is >>>>', authUser)
      if(authUser){
        //means user logged in 
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else {
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })

      }
    })
  }, []) // if blank only run one time when App loads, if you have anything else it runs on change of state

  return (
    <Router>
      <div className="App">
       

        <Switch>
        <Route path="/orders"> 
                <Header />
                <Orders/>
          </Route>
        <Route path="/login"> 
                <Login/>
          </Route>
          <Route path="/checkout"> 
                <Header />
                  <Checkout/>
          </Route>
          <Route path="/payment"> 
              <Header />
              {/* Pass highder order promise */}
              <Elements stripe={promise}>
                <Payment />
              </Elements>
                
          </Route>
          <Route path="/"> 
                <Header />
                  <Home/>
          </Route>

        </Switch>
      </div>

    </Router>
  );
}

export default App;
