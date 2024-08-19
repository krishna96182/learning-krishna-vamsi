import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-menu">
                <li className="navbar-item">   
                    <Link to="/products" className="navbar-link">Products</Link>
                    <Link to="/show" className="navbar-link">Users</Link> 
                    <Link to="/admin" className="navbar-link">Orders</Link>
                    <Link to="/categories" className="navbar-link">Category</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
