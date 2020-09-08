import React from 'react';
import './Header.css';

function Header(){
    return (
        <div className="header">
            <img  className="header_logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"/>
            <div className="header__search">
                <input clasName="header__searchInput" type="text" />
                {/* Logo */}
            </div>
            <div className="header__nav">
                <div clasName="header__options">
                    <span className="header__optionLineOne"> Hello Guest</span>
                    <span className="header__optionLineOne"> Sign in</span>
                </div>
                <div clasName="header__options"  > 
                    <span className="header__optionLineOne"> Returns</span>
                    <span className="header__optionLineOne"> &Orders</span>
                </div>
                <div clasName="header__options"  > 
                    <span className="header__optionLineOne"> Returns</span>
                    <span className="header__optionLineOne"> &Orders</span>
                </div>
            </div>
      </div>
    )
}

export default Header;