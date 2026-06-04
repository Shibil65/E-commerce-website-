import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      className="product-card"
      whileHover={{
        y: -8,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="product-image-wrapper">

        <span className="product-badge">
          New
        </span>

        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>

        <div className="rating">
          ⭐⭐⭐⭐⭐
          <span>(245)</span>
        </div>

        <p className="price">
          ₹{product.price}
        </p>

        <Link
          to={`/product/${product._id}`}
          className="view-btn"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;