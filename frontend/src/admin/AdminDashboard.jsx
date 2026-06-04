import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch(
          'https://e-commerce-website-kidoza-8162.onrender.com/api/analytics',
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        );

        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, [user, navigate]);

  const styles = {
    page: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 25px'
    },

    hero: {
      background:
        'linear-gradient(135deg,#ff6b35,#ff8c42)',
      borderRadius: '28px',
      padding: '40px',
      color: '#fff',
      marginBottom: '35px',
      boxShadow:
        '0 20px 50px rgba(255,107,53,.25)'
    },

    heroTitle: {
      fontSize: '2.8rem',
      fontWeight: '800',
      marginBottom: '10px'
    },

    heroText: {
      opacity: 0.9,
      fontSize: '1.1rem'
    },

    statsGrid: {
      display: 'grid',
      gridTemplateColumns:
        'repeat(auto-fit,minmax(250px,1fr))',
      gap: '20px',
      marginBottom: '40px'
    },

    card: {
      background: '#fff',
      borderRadius: '24px',
      padding: '30px',
      textAlign: 'center',
      boxShadow:
        '0 15px 40px rgba(0,0,0,.08)',
      border: '1px solid #f1f5f9',
      transition: '.3s'
    },

    icon: {
      width: '65px',
      height: '65px',
      margin: '0 auto 15px',
      borderRadius: '18px',
      background:
        'linear-gradient(135deg,#ff6b35,#ff8c42)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px'
    },

    number: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#111827'
    },

    label: {
      color: '#64748b',
      marginTop: '8px'
    },

    section: {
      background: '#fff',
      borderRadius: '24px',
      padding: '35px',
      boxShadow:
        '0 15px 40px rgba(0,0,0,.08)'
    },

    sectionTitle: {
      fontSize: '1.7rem',
      marginBottom: '25px',
      color: '#111827'
    },

    actionGrid: {
      display: 'grid',
      gridTemplateColumns:
        'repeat(auto-fit,minmax(220px,1fr))',
      gap: '20px'
    },

    actionBtn: {
      border: 'none',
      padding: '22px',
      borderRadius: '18px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '700',
      color: '#fff',
      transition: '.3s'
    },

    orangeBtn: {
      background:
        'linear-gradient(135deg,#ff6b35,#ff8c42)'
    },

    darkBtn: {
      background: '#111827'
    },

    loading: {
      textAlign: 'center',
      fontSize: '1.2rem',
      color: '#ff6b35',
      padding: '50px'
    }
  };

  return (
    <div style={styles.page}>

      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>
          Admin Dashboard
        </h1>

        <p style={styles.heroText}>
          Welcome back, {user?.name}
          <br />
          Manage products, users and orders.
        </p>
      </div>

      {stats ? (
        <>
          <div style={styles.statsGrid}>

            <div style={styles.card}>
              <div style={styles.icon}>📦</div>

              <div style={styles.number}>
                {stats.totalProducts}
              </div>

              <div style={styles.label}>
                Total Products
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.icon}>🛒</div>

              <div style={styles.number}>
                {stats.totalOrders}
              </div>

              <div style={styles.label}>
                Total Orders
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.icon}>👥</div>

              <div style={styles.number}>
                {stats.totalUsers}
              </div>

              <div style={styles.label}>
                Registered Users
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.icon}>💰</div>

              <div style={styles.number}>
                ₹{stats.totalRevenue.toFixed(2)}
              </div>

              <div style={styles.label}>
                Total Revenue
              </div>
            </div>

          </div>

          <div style={styles.section}>

            <h2 style={styles.sectionTitle}>
              Quick Actions
            </h2>

            <div style={styles.actionGrid}>

              <button
                style={{
                  ...styles.actionBtn,
                  ...styles.orangeBtn
                }}
                onClick={() =>
                  navigate('/admin/add-product')
                }
              >
                ➕ Add Product
              </button>

              <button
                style={{
                  ...styles.actionBtn,
                  ...styles.darkBtn
                }}
                onClick={() =>
                  navigate('/admin/products')
                }
              >
                📦 Manage Products
              </button>

              <button
                style={{
                  ...styles.actionBtn,
                  ...styles.darkBtn
                }}
                onClick={() =>
                  navigate('/admin/orders')
                }
              >
                🚚 Manage Orders
              </button>

              <button
                style={{
                  ...styles.actionBtn,
                  ...styles.darkBtn
                }}
                onClick={() =>
                  navigate('/admin/users')
                }
              >
                👥 Users
              </button>

            </div>

          </div>
        </>
      ) : (
        <div style={styles.loading}>
          Loading Dashboard...
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;