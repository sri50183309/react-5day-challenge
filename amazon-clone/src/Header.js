import React from 'react'
import './Header.css'
function Header() {
    return (
        <div className="header">
            <img alt="Amazon Logo White" src="https://www.nicepng.com/png/full/228-2281836_vault-logo-available-amazon-app-store.png" className="header_logo" />
            <div className="header_search">
                <input type="search" className="header_searchInput" />
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
                <div className="header_optionBasket">
                    <span className="header_optionLineTwo header_basketCount">0</span>
                </div>
            </div>
        </div>
    )
}

export default Header