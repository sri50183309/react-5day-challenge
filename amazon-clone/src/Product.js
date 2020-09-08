import React from 'react'
import "./Product.css"

function Product(){
    return(
        <div className="product">
            <div className="product_info">
                <p> The lean start up </p>
                <p className="product_price"> 
                    <small> $ </small>
                    <small>19.99 </small>
                </p>
                <div className="product_rating"> 
                    <p> * </p>
                </div>
            </div>
            <img src="https://images-na.ssl-images-amazon.com/images/I/81jgCiNJPUL._AC_UL600_SR393,600_.jpg" alt="Product Image"/> 
            <button> Add to basket </button>
        </div>
    )
}

export default Product