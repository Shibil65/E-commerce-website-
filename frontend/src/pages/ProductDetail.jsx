import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../styles/product.css';

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://e-commerce-website-78kn.onrender.com/api/products/${id}`
        );

        if (!res.ok) {
          throw new Error('Product not found');
        }

        const data = await res.json();
        setProduct(data);

      } catch (err) {
        console.error(err);
        setProduct(null);

      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1,
      })
    );
  };

  if (loading) {
    return (
      <div className="detail-loading">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="detail-not-found">
        <h2>Product Not Found</h2>

        <Link to="/shop">
          Back To Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="detail-page">

      {/* Breadcrumb */}

      <div className="detail-breadcrumb">

        <Link to="/">Home</Link>

        <span>/</span>

        <Link to="/shop">
          Shop
        </Link>

        <span>/</span>

        <span>
          {product.category}
        </span>

        <span>/</span>

        <strong>
          {product.name}
        </strong>

      </div>

      {/* Product Layout */}

      <div className="detail-layout">

        {/* Image */}

        <div className="detail-image-box">

          <img
            src={product.imageUrl}
            alt={product.name}
            className="detail-image"
          />

        </div>

        {/* Content */}

        <div className="detail-content">

          <span className="detail-category">

            {product.category}

          </span>

          <h1 className="detail-title">

            {product.name}

          </h1>

          <div className="detail-rating">

            ★★★★★

            <span>
              (0 Reviews)
            </span>

          </div>

          <div className="detail-price">

            ₹{Number(product.price).toFixed(2)}

          </div>

          <div className="detail-description-card">

            <h3>
              Product Description
            </h3>

            <p className="detail-description">

              {product.description}

            </p>

          </div>

          <button
            className="detail-cart-btn"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>

          <div
            className={
              product.stock > 0
                ? 'detail-stock detail-in-stock'
                : 'detail-stock detail-out-stock'
            }
          >
            {product.stock > 0
              ? `✓ In Stock (${product.stock} available)`
              : 'Out Of Stock'}
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetail;