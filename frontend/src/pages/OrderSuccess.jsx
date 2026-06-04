import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  const styles = {
    page: {
      minHeight: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '30px',
      background: '#f8fafc'
    },

    card: {
      maxWidth: '650px',
      width: '100%',
      background: '#ffffff',
      borderRadius: '28px',
      padding: '50px 40px',
      textAlign: 'center',
      boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
      border: '1px solid #e5e7eb'
    },

    iconWrapper: {
      width: '100px',
      height: '100px',
      margin: '0 auto 25px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg,#10b981,#34d399)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '48px',
      color: '#fff',
      boxShadow: '0 15px 35px rgba(16,185,129,.25)'
    },

    badge: {
      display: 'inline-block',
      background: '#ecfdf5',
      color: '#10b981',
      padding: '8px 18px',
      borderRadius: '50px',
      fontSize: '13px',
      fontWeight: '700',
      marginBottom: '20px',
      letterSpacing: '.5px'
    },

    title: {
      fontSize: '2.8rem',
      fontWeight: '800',
      color: '#111827',
      marginBottom: '15px',
      lineHeight: '1.1'
    },

    description: {
      color: '#6b7280',
      fontSize: '1.1rem',
      lineHeight: '1.8',
      marginBottom: '35px'
    },

    orderInfo: {
      background: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '18px',
      padding: '20px',
      marginBottom: '35px'
    },

    orderText: {
      color: '#374151',
      fontSize: '15px',
      lineHeight: '1.8'
    },

    button: {
      display: 'inline-block',
      textDecoration: 'none',
      padding: '16px 35px',
      borderRadius: '14px',
      background:
        'linear-gradient(135deg,#ff6b35,#ff8a50)',
      color: '#fff',
      fontWeight: '700',
      fontSize: '16px',
      boxShadow:
        '0 15px 30px rgba(255,107,53,.25)',
      transition: '0.3s'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.iconWrapper}>
          ✓
        </div>

        <span style={styles.badge}>
          ORDER CONFIRMED
        </span>

        <h1 style={styles.title}>
          Payment Successful!
        </h1>

        <p style={styles.description}>
          Thank you for shopping with us.
          Your order has been placed successfully
          and our team will start processing it shortly.
        </p>

        <div style={styles.orderInfo}>
          <p style={styles.orderText}>
            📦 Your order is confirmed
            <br />
            🚚 Shipping updates will be provided soon
            <br />
            🔒 Payment received securely
          </p>
        </div>

        <Link
          to="/shop"
          style={styles.button}
        >
          Continue Shopping
        </Link>

      </div>
    </div>
  );
};

export default OrderSuccess;