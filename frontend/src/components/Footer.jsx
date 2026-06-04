import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <motion.div
          className="footer-brand"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2>KIDOSA</h2>

          <p>
            Premium fashion, toys and essentials
            crafted for happy kids and modern families.
          </p>
        </motion.div>

        <motion.div
          className="footer-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h4>Quick Links</h4>

          <Link to="/home">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/contact">Contact</Link>
        </motion.div>

        <motion.div
          className="footer-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h4>Support</h4>

          <Link to="/return">Return Policy</Link>
          <Link to="/disclaimer">Disclaimer</Link>
          <Link to="/checkout">Checkout</Link>
        </motion.div>

        <motion.div
          className="footer-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h4>Contact</h4>

          <p>support@kidosa.com</p>
          <p>+91 98765 43210</p>

          <div className="footer-social">

            <a href="/">
              IG
            </a>

            <a href="/">
              FB
            </a>

            <a href="/">
              X
            </a>

          </div>

        </motion.div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} KIDOSA.
        All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;