import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiShoppingBag } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link to="/home" className="logo-section">
        <img
          src="/logo.png"
          alt="Kidoza"
        />
        <h2>KIDOZA</h2>
      </Link>

      <button
        className="menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>

        <li>
          <Link to="/home">Home</Link>
        </li>

        <li>
          <Link to="/shop">Shop</Link>
        </li>

        <li className="cart-link">
          <Link to="/cart">
            <FiShoppingBag />
            Cart

            {cartItems.length > 0 && (
              <span className="cart-badge">
                {cartItems.length}
              </span>
            )}
          </Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/profile">
                {user.name}
              </Link>
            </li>

            {user.role === 'admin' && (
              <li>
                <Link to="/admin">
                  Admin
                </Link>
              </li>
            )}

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              to="/login"
              className="login-btn"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </motion.nav>
  );
};

export default Navbar;