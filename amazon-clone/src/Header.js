import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { Link } from 'react-router-dom'
function Header() {
    return (
        <div className="header">
           <Link to="/">
                <img alt="Amazon Logo White" src="https://www.nicepng.com/png/full/228-2281836_vault-logo-available-amazon-app-store.png" className="header_logo" />
            </Link>
            <div className="header_search">
                <input type="search" className="header_searchInput" />
                <SearchIcon className="header_searchIcon"/>
            </div>
            <div className="header_nav">
                <div className="header_option">
                    <span className="header_optionLineOne">
                        Hello Guest
                    </span>
                    <span className="header_optionLineTwo">
                        Sign In
                    </span>
                </div>
                <div className="header_option">
                <span className="header_optionLineOne">
                        Returns
                    </span>
                    <span className="header_optionLineTwo">
                        &amp; Orders
                    </span>
                </div>
                <div className="header_option">
                <span className="header_optionLineOne">
                       Your 
                    </span>
                    <span className="header_optionLineTwo">
                        prime
                    </span>
                </div>
                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__basketCount">0</span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header