import React, {
  useEffect,
  useState,
  useContext
} from 'react';

import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          'https://e-commerce-website-kidoza-8162.onrender.com/api/products'
        );

        const data = await res.json();

        setProducts(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        'Delete this product?'
      );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://e-commerce-website-78kn.onrender.com/api/products/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization:
              `Bearer ${user.token}`
          }
        }
      );

      if (res.ok) {
        setProducts(
          products.filter(
            (item) => item._id !== id
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>

      {/* Header */}

      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            Product Management
          </h1>

          <p style={styles.subtitle}>
            Manage all products from one place
          </p>
        </div>

        <Link
          to="/admin/add-product"
          style={styles.addBtn}
        >
          + Add Product
        </Link>

      </div>

      {/* Stats */}

      <div style={styles.statsCard}>
        <h3>
          Total Products
        </h3>

        <span style={styles.count}>
          {products.length}
        </span>
      </div>

      {/* Table */}

      <div style={styles.tableWrapper}>

        <table style={styles.table}>

          <thead>
            <tr>
              <th style={styles.th}>
                Product
              </th>

              <th style={styles.th}>
                Price
              </th>

              <th style={styles.th}>
                Category
              </th>

              <th style={styles.th}>
                Stock
              </th>

              <th style={styles.th}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {products.length > 0 ? (

              products.map(
                (product) => (

                  <tr
                    key={product._id}
                    style={styles.row}
                  >

                    <td style={styles.td}>

                      <div
                        style={
                          styles.productBox
                        }
                      >

                        <img
                          src={
                            product.imageUrl
                          }
                          alt={
                            product.name
                          }
                          style={
                            styles.image
                          }
                        />

                        <div>

                          <h4
                            style={{
                              marginBottom:
                                '6px'
                            }}
                          >
                            {
                              product.name
                            }
                          </h4>

                          <span
                            style={{
                              color:
                                '#94a3b8',
                              fontSize:
                                '13px'
                            }}
                          >
                            ID:
                            {' '}
                            {product._id.slice(
                              0,
                              8
                            )}
                            ...
                          </span>

                        </div>

                      </div>

                    </td>

                    <td style={styles.td}>
                      ₹
                      {Number(
                        product.price
                      ).toFixed(2)}
                    </td>

                    <td style={styles.td}>
                      <span
                        style={
                          styles.category
                        }
                      >
                        {
                          product.category
                        }
                      </span>
                    </td>

                    <td style={styles.td}>
                      <span
                        style={{
                          color:
                            product.stock >
                            0
                              ? '#22c55e'
                              : '#ef4444',
                          fontWeight:
                            '600'
                        }}
                      >
                        {
                          product.stock
                        }
                      </span>
                    </td>

                    <td style={styles.td}>

                      <div
                        style={
                          styles.actions
                        }
                      >

                        <Link
                          to={`/admin/edit-product/${product._id}`}
                          style={
                            styles.editBtn
                          }
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              product._id
                            )
                          }
                          style={
                            styles.deleteBtn
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )

            ) : (

              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign:
                      'center',
                    padding:
                      '50px',
                    color:
                      '#94a3b8'
                  }}
                >
                  No products found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

const styles = {

  page: {
    maxWidth: '1400px',
    margin: '40px auto',
    padding: '30px'
  },

  header: {
    display: 'flex',
    justifyContent:
      'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px'
  },

  title: {
    fontSize: '2.3rem',
    color: '#111827',
    marginBottom: '6px'
  },

  subtitle: {
    color: '#64748b'
  },

  addBtn: {
    background:
      'linear-gradient(135deg,#ff6b35,#ff8c42)',
    color: '#fff',
    padding: '14px 24px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '600',
    boxShadow:
      '0 10px 25px rgba(255,107,53,.25)'
  },

  statsCard: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    padding: '25px',
    borderRadius: '20px',
    marginBottom: '25px',
    display: 'flex',
    justifyContent:
      'space-between',
    alignItems: 'center'
  },

  count: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#ff6b35'
  },

  tableWrapper: {
    background: '#fff',
    borderRadius: '24px',
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
    boxShadow:
      '0 10px 30px rgba(0,0,0,.06)'
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },

  th: {
    textAlign: 'left',
    padding: '20px',
    background: '#f8fafc',
    color: '#64748b',
    fontSize: '14px',
    fontWeight: '700'
  },

  td: {
    padding: '20px',
    borderTop:
      '1px solid #f1f5f9'
  },

  row: {
    transition: '.3s'
  },

  productBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },

  image: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '14px',
    border:
      '1px solid #e5e7eb'
  },

  category: {
    background:
      'rgba(255,107,53,.1)',
    color: '#ff6b35',
    padding: '8px 14px',
    borderRadius: '30px',
    fontSize: '13px',
    fontWeight: '600'
  },

  actions: {
    display: 'flex',
    gap: '10px'
  },

  editBtn: {
    background: '#3b82f6',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600'
  },

  deleteBtn: {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600'
  }
};

export default AdminProducts;