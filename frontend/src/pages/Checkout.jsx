import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { clearCart } from '../redux/cartSlice';
import '../styles/checkout.css';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: '', street: '', city: '', postalCode: '', country: ''
  });

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePayment = async () => {
    try {
      const orderRes = await fetch('https://e-commerce-website-1-rdg5.onrender.com/api/payment/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice })
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        const fallback = window.confirm("Razorpay keys unconfigured on backend. Use Student Bypass Mode?");
        if (fallback) {
          return bypassPayment();
        } else {
          return alert("Payment failed to initialize");
        }
      }

      const options = {
        key: 'rzp_test_dummykey123',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'ShopNest',
        description: 'Test Transaction',
        order_id: orderData.id,

        handler: async function (response) {
          const verifyRes = await fetch('https://e-commerce-website-1-rdg5.onrender.com/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });

          if (verifyRes.ok) {
            const saveOrderRes = await fetch('https://e-commerce-website-1-rdg5.onrender.com/api/orders', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
              },
              body: JSON.stringify({
                items: cartItems,
                totalAmount: totalPrice,
                address,
                paymentId: response.razorpay_payment_id
              })
            });

            if (saveOrderRes.ok) {
              dispatch(clearCart());
              navigate('/ordersuccess');
            } else {
              alert('Order saving failed');
            }
          } else {
            alert('Payment verification failed');
          }
        },

        prefill: {
          name: address.fullName,
          email: user?.email,
          contact: '9999999999'
        },

        theme: {
          color: '#f97316'
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error(error);
    }
  };

  const bypassPayment = async () => {
    const saveOrderRes = await fetch('https://e-commerce-website-1-rdg5.onrender.com/api/orders', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        items: cartItems,
        totalAmount: totalPrice,
        address,
        paymentId: 'bypass_txn_' + Date.now()
      })
    });

    if (saveOrderRes.ok) {
      dispatch(clearCart());
      navigate('/ordersuccess');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      navigate('/login');
      return;
    }

    handlePayment();
  };

 return (
  <div className="checkout-page">

    <div className="checkout-header">
      <span>SECURE CHECKOUT</span>
      <h1>Complete Your Order</h1>
      <p>
        Enter your shipping details and
        complete your purchase securely.
      </p>
    </div>

    <div className="checkout-grid">

      {/* SHIPPING FORM */}

      <form
        onSubmit={handleSubmit}
        className="checkout-form"
      >
        <h2 style={{ fontSize: '24px' }}>Shipping Address</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            required
            placeholder="Full Name"
            value={address.fullName}
            onChange={(e) =>
              setAddress({
                ...address,
                fullName: e.target.value
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Street Address</label>
          <input
            type="text"
            required
            placeholder="Street Address"
            value={address.street}
            onChange={(e) =>
              setAddress({
                ...address,
                street: e.target.value
              })
            }
          />
        </div>

        <div className="form-row">

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              required
              placeholder="City"
              value={address.city}
              onChange={(e) =>
                setAddress({
                  ...address,
                  city: e.target.value
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Postal Code</label>
            <input
              type="text"
              required
              placeholder="Postal Code"
              value={address.postalCode}
              onChange={(e) =>
                setAddress({
                  ...address,
                  postalCode: e.target.value
                })
              }
            />
          </div>

        </div>

        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            required
            placeholder="Country"
            value={address.country}
            onChange={(e) =>
              setAddress({
                ...address,
                country: e.target.value
              })
            }
          />
        </div>

      </form>

      {/* ORDER SUMMARY */}

      <div className="checkout-summary-card">

        <h2 style={{ fontSize: '24px' }}>Order Summary</h2>

        <div className="summary-items">

          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="summary-item"
            >
              <span>
                {item.name}
                {" "}
                ×
                {item.qty}
              </span>

              <span>
                ₹
                {(
                  item.price *
                  item.qty
                ).toFixed(2)}
              </span>
            </div>
          ))}

        </div>

        <div className="summary-total">
          <span>Total</span>

          <strong>
            ₹{totalPrice.toFixed(2)}
          </strong>
        </div>

        <button
          type="button"
          className="pay-btn"
          onClick={handleSubmit}
        >
          Pay ₹{totalPrice.toFixed(2)}
        </button>

      </div>

    </div>

  </div>
);
};

export default Checkout;