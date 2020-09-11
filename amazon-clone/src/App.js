import React, { useEffect } from "react";
import './App.css';
import Header from './Header'
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from "./StateProvider";

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
        <Route path="/login"> 
            <Login/>
          </Route>
          <Route path="/checkout"> 
          <Header />
            <Checkout/>
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
