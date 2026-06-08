import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          'https://e-commerce-website-1-rdg5.onrender.com/api/orders',
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        );

        const data = await res.json();

        setOrders(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, [user]);

  const updateStatus = async (
    id,
    status
  ) => {
    const res = await fetch(
      `https://e-commerce-website-1-rdg5.onrender.com/api/orders/${id}/status`,
      {
        method: 'PUT',
        headers: {
          'Content-Type':
            'application/json',
          Authorization:
            `Bearer ${user.token}`
        },
        body: JSON.stringify({
          status
        })
      }
    );

    if (res.ok) {
      setOrders(
        orders.map((order) =>
          order._id === id
            ? {
                ...order,
                status
              }
            : order
        )
      );
    }
  };

  const getStatusStyle = (
    status
  ) => {
    if (status === 'Delivered') {
      return {
        background:
          '#dcfce7',
        color: '#15803d'
      };
    }

    if (status === 'Shipped') {
      return {
        background:
          '#dbeafe',
        color: '#1d4ed8'
      };
    }

    return {
      background:
        '#fef3c7',
      color: '#b45309'
    };
  };

  return (
    <div
      style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 25px'
      }}
    >
      {/* Header */}

      <div
        style={{
          background:
            'linear-gradient(135deg,#ff6b35,#ff8c42)',
          borderRadius: '24px',
          padding: '35px',
          color: '#fff',
          marginBottom: '30px',
          boxShadow:
            '0 20px 50px rgba(255,107,53,.25)'
        }}
      >
        <h1
          style={{
            marginBottom: '10px',
            fontSize: '2.5rem'
          }}
        >
          Orders Management
        </h1>

        <p>
          Manage customer
          orders and update
          delivery status.
        </p>
      </div>

      {/* Orders */}

      <div
        style={{
          display: 'grid',
          gap: '20px'
        }}
      >
        {orders.length === 0 ? (
          <div
            style={{
              background:
                '#fff',
              padding: '50px',
              borderRadius:
                '20px',
              textAlign:
                'center',
              boxShadow:
                '0 10px 30px rgba(0,0,0,.08)'
            }}
          >
            No Orders Found
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              style={{
                background:
                  '#fff',
                borderRadius:
                  '20px',
                padding: '25px',
                boxShadow:
                  '0 10px 30px rgba(0,0,0,.08)',
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems:
                  'center',
                flexWrap:
                  'wrap',
                gap: '20px'
              }}
            >
              <div>
                <h3
                  style={{
                    marginBottom:
                      '10px'
                  }}
                >
                  Order #
                  {order._id.substring(
                    0,
                    8
                  )}
                </h3>

                <p
                  style={{
                    color:
                      '#64748b'
                  }}
                >
                  Customer:{' '}
                  <strong>
                    {order
                      .userId
                      ?.name ||
                      'Deleted User'}
                  </strong>
                </p>

                <p
                  style={{
                    color:
                      '#64748b'
                  }}
                >
                  Date:{' '}
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <div>
                <h2
                  style={{
                    color:
                      '#ff6b35'
                  }}
                >
                  ₹
                  {order.totalAmount.toFixed(
                    2
                  )}
                </h2>
              </div>

              <div
                style={{
                  display:
                    'flex',
                  flexDirection:
                    'column',
                  gap: '10px'
                }}
              >
                <span
                  style={{
                    ...getStatusStyle(
                      order.status
                    ),
                    padding:
                      '8px 16px',
                    borderRadius:
                      '30px',
                    fontWeight:
                      '600',
                    textAlign:
                      'center'
                  }}
                >
                  {order.status}
                </span>

                <select
                  value={
                    order.status
                  }
                  onChange={(
                    e
                  ) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                  style={{
                    padding:
                      '12px',
                    borderRadius:
                      '12px',
                    border:
                      '1px solid #e5e7eb',
                    background:
                      '#fff',
                    cursor:
                      'pointer',
                    outline:
                      'none'
                  }}
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;