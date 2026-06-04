import React, {
  useEffect,
  useState,
  useContext
} from 'react';

import { AuthContext } from '../context/AuthContext';

const AdminUsers = () => {
  const { user } = useContext(AuthContext);

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          'https://e-commerce-website-kidoza-8162.onrender.com/api/auth/users',
          {
            headers: {
              Authorization:
                `Bearer ${user.token}`
            }
          }
        );

        const data =
          await res.json();

        setUsers(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  return (
    <div style={styles.page}>

      {/* Header */}

      <div style={styles.header}>

        <div>
          <h1 style={styles.title}>
            User Directory
          </h1>

          <p style={styles.subtitle}>
            Manage registered users
          </p>
        </div>

      </div>

      {/* Stats */}

      <div style={styles.statsCard}>

        <div>
          <h3>Total Users</h3>
        </div>

        <span style={styles.count}>
          {users.length}
        </span>

      </div>

      {/* Table */}

      <div style={styles.tableWrapper}>

        {loading ? (

          <div style={styles.loading}>
            Loading Users...
          </div>

        ) : (

          <table style={styles.table}>

            <thead>

              <tr>

                <th style={styles.th}>
                  User
                </th>

                <th style={styles.th}>
                  Email
                </th>

                <th style={styles.th}>
                  Role
                </th>

                <th style={styles.th}>
                  Joined
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map((u) => (

                <tr
                  key={u._id}
                  style={styles.row}
                >

                  <td style={styles.td}>

                    <div
                      style={
                        styles.userBox
                      }
                    >

                      <div
                        style={
                          styles.avatar
                        }
                      >
                        {u.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>

                        <h4
                          style={{
                            marginBottom:
                              '4px'
                          }}
                        >
                          {u.name}
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
                          {u._id.slice(
                            0,
                            8
                          )}
                          ...
                        </span>

                      </div>

                    </div>

                  </td>

                  <td style={styles.td}>
                    {u.email}
                  </td>

                  <td style={styles.td}>

                    <span
                      style={{
                        ...styles.roleBadge,

                        background:
                          u.role ===
                          'admin'
                            ? 'rgba(255,107,53,.12)'
                            : 'rgba(34,197,94,.12)',

                        color:
                          u.role ===
                          'admin'
                            ? '#ff6b35'
                            : '#22c55e'
                      }}
                    >
                      {u.role}
                    </span>

                  </td>

                  <td style={styles.td}>
                    {new Date(
                      u.createdAt
                    ).toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

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
    marginBottom: '25px'
  },

  title: {
    fontSize: '2.3rem',
    color: '#111827',
    marginBottom: '6px'
  },

  subtitle: {
    color: '#64748b'
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
    alignItems: 'center',
    boxShadow:
      '0 10px 30px rgba(0,0,0,.06)'
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
    padding: '18px',
    textAlign: 'left',
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

  userBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },

  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background:
      'linear-gradient(135deg,#ff6b35,#ff8c42)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '18px'
  },

  roleBadge: {
    padding: '8px 14px',
    borderRadius: '30px',
    fontSize: '13px',
    fontWeight: '700',
    textTransform:
      'capitalize'
  },

  loading: {
    padding: '50px',
    textAlign: 'center',
    color: '#64748b'
  }

};

export default AdminUsers;