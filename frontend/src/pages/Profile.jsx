import React, {
  useEffect,
  useState,
  useContext
} from 'react';

import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user, logout } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchMyOrders =
      async () => {
        try {
          const res =
            await fetch(
              'https://e-commerce-website-1-rdg5.onrender.com/api/orders/myorders',
              {
                headers: {
                  Authorization:
                    `Bearer ${user.token}`
                }
              }
            );

          const data =
            await res.json();

          if (res.ok) {
            setOrders(
              Array.isArray(data)
                ? data
                : []
            );
          } else {
            setOrders([]);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchMyOrders();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '40px auto',
        padding: '20px'
      }}
    >
      {/* PROFILE CARD */}

      <div
        style={{
          background: '#fff',
          borderRadius: '24px',
          padding: '35px',
          boxShadow:
            '0 10px 30px rgba(0,0,0,.06)',
          border:
            '1px solid #e5e7eb',
          marginBottom: '30px'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent:
              'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}
        >
          <div>
            <span
              style={{
                background:
                  '#fff3ee',
                color:
                  '#ff6b35',
                padding:
                  '8px 16px',
                borderRadius:
                  '50px',
                fontSize:
                  '13px',
                fontWeight:
                  '700'
              }}
            >
              MY ACCOUNT
            </span>

            <h1
              style={{
                fontSize:
                  '2.5rem',
                marginTop:
                  '15px',
                color:
                  '#111827'
              }}
            >
              Welcome,
              {' '}
              {user.name}
            </h1>

            <p
              style={{
                color:
                  '#6b7280',
                marginTop:
                  '10px'
              }}
            >
              {user.email}
            </p>

            <div
              style={{
                marginTop:
                  '15px'
              }}
            >
              <span
                style={{
                  background:
                    '#ecfdf5',
                  color:
                    '#10b981',
                  padding:
                    '8px 14px',
                  borderRadius:
                    '50px',
                  fontWeight:
                    '600'
                }}
              >
                {user.role.toUpperCase()}
              </span>
            </div>
          </div>

          <button
            onClick={
              handleLogout
            }
            style={{
              border: 'none',
              background:
                '#ef4444',
              color: '#fff',
              padding:
                '14px 25px',
              borderRadius:
                '14px',
              cursor:
                'pointer',
              fontWeight:
                '600'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* ORDER HISTORY */}

      <div>
        <h2
          style={{
            color:
              '#111827',
            marginBottom:
              '25px'
          }}
        >
          Order History
        </h2>

        {loading ? (
          <div
            style={{
              background:
                '#fff',
              padding:
                '30px',
              borderRadius:
                '20px',
              textAlign:
                'center',
              border:
                '1px solid #e5e7eb'
            }}
          >
            Loading Orders...
          </div>
        ) : orders.length ===
          0 ? (
          <div
            style={{
              background:
                '#fff',
              padding:
                '50px',
              borderRadius:
                '24px',
              border:
                '1px solid #e5e7eb',
              textAlign:
                'center'
            }}
          >
            <h3
              style={{
                color:
                  '#111827',
                marginBottom:
                  '10px'
              }}
            >
              No Orders Yet
            </h3>

            <p
              style={{
                color:
                  '#6b7280',
                marginBottom:
                  '25px'
              }}
            >
              Start shopping and
              your orders will
              appear here.
            </p>

            <Link
              to="/shop"
              style={{
                display:
                  'inline-block',
                background:
                  '#ff6b35',
                color:
                  '#fff',
                padding:
                  '14px 28px',
                borderRadius:
                  '14px',
                textDecoration:
                  'none',
                fontWeight:
                  '600'
              }}
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div
            style={{
              display:
                'grid',
              gap: '20px'
            }}
          >
            {orders.map(
              (order) => (
                <div
                  key={
                    order._id
                  }
                  style={{
                    background:
                      '#fff',
                    border:
                      '1px solid #e5e7eb',
                    borderRadius:
                      '20px',
                    padding:
                      '25px',
                    display:
                      'flex',
                    justifyContent:
                      'space-between',
                    alignItems:
                      'center',
                    flexWrap:
                      'wrap',
                    gap: '20px',
                    boxShadow:
                      '0 8px 20px rgba(0,0,0,.04)'
                  }}
                >
                  <div>
                    <p
                      style={{
                        color:
                          '#6b7280',
                        marginBottom:
                          '8px'
                      }}
                    >
                      Order ID
                    </p>

                    <h4
                      style={{
                        color:
                          '#111827'
                      }}
                    >
                      #
                      {order._id.slice(
                        -8
                      )}
                    </h4>

                    <p
                      style={{
                        color:
                          '#6b7280',
                        marginTop:
                          '10px'
                      }}
                    >
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p
                      style={{
                        color:
                          '#6b7280'
                      }}
                    >
                      Total
                    </p>

                    <h3
                      style={{
                        color:
                          '#10b981'
                      }}
                    >
                      ₹
                      {order.totalAmount.toFixed(
                        2
                      )}
                    </h3>
                  </div>

                  <div>
                    <span
                      style={{
                        background:
                          order.status ===
                          'Delivered'
                            ? '#ecfdf5'
                            : order.status ===
                              'Shipped'
                            ? '#eff6ff'
                            : '#fff7ed',

                        color:
                          order.status ===
                          'Delivered'
                            ? '#10b981'
                            : order.status ===
                              'Shipped'
                            ? '#2563eb'
                            : '#f97316',

                        padding:
                          '10px 18px',

                        borderRadius:
                          '50px',

                        fontWeight:
                          '600'
                      }}
                    >
                      {
                        order.status
                      }
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;