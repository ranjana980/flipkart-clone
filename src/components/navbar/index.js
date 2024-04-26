import React from 'react'
import { ShoppingCart, Search, Notifications } from "@material-ui/icons";
import './styles.scss'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="navbar">
            <div className='navbar-container'>
                <h3 className="navbar-heading">
                    E-Commerce
                </h3>
                <div className="navbar-search">
                    <input
                        placeholder="Search Your Dream Products Here...."
                    />
                    <Search className="navbar-search-icon"
                    />
                </div>
                <Link to="/account?login=true"
                    className='navbar-button'
                >
                    Login
                </Link>
                <div className="navbar-cart">
                    <ShoppingCart
                    />
                    <b
                    >
                        Cart
                    </b>
                </div>
                <Notifications className='navbar-notification'
                />
            </div>
        </div>
    )
}
