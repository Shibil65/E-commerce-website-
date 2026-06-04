import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  removeFromCart,
  addToCart
} from '../redux/cartSlice';

import '../styles/cart.css';

const Cart = () => {
  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(
        addToCart({
          ...item,
          qty
        })
      );
    }
  };

  const totalPrice =
    cartItems.reduce(
      (acc, item) =>
        acc +
        item.price * item.qty,
      0
    );

  return (
    <div className="cart-page">

      <div className="cart-header">

        <span>
          SHOPPING BAG
        </span>

        <h1>
          Your Cart
        </h1>

        <p>
          Review your selected
          products before checkout.
        </p>

      </div>

      {cartItems.length === 0 ? (

        <div className="empty-cart">

          <h2>
            Your cart is empty
          </h2>

          <p>
            Looks like you haven't
            added anything yet.
          </p>

          <Link
            to="/shop"
            className="continue-btn"
          >
            Continue Shopping
          </Link>

        </div>

      ) : (

        <div className="cart-layout">

          {/* ITEMS */}

          <div className="cart-items">

            {cartItems.map(
              (item) => (

                <div
                  key={
                    item.productId
                  }
                  className="cart-card"
                >

                  <img
                    src={
                      item.imageUrl
                    }
                    alt={
                      item.name
                    }
                    className="cart-image"
                  />

                  <div className="cart-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p className="cart-price">
                      ₹{item.price}
                    </p>

                    <div className="qty-box">

                      <button
                        onClick={() =>
                          handleUpdateQty(
                            item,
                            item.qty - 1
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          handleUpdateQty(
                            item,
                            item.qty + 1
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    <button
                      onClick={() =>
                        handleRemove(
                          item.productId
                        )
                      }
                      className="remove-btn"
                    >
                      Remove Item
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

          {/* SUMMARY */}

          <div className="cart-summary">

            <h2 style={{ fontSize: '24px' }}>
              Order Summary
            </h2>

            <div className="summary-row">

              <span>
                Items
              </span>

              <span>
                {
                  cartItems.length
                }
              </span>

            </div>

            <div className="summary-row">

              <span>
                Delivery
              </span>

              <span>
                Free
              </span>

            </div>

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {totalPrice.toFixed(
                  2
                )}
              </strong>

            </div>

            <button
              className="checkout-btn"
              onClick={() =>
                navigate(
                  '/checkout'
                )
              }
            >
              Proceed To Checkout
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Cart;