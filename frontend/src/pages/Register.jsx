import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return alert('Please enter your name');
    }

    if (!email.trim()) {
      return alert('Please enter your email');
    }

    if (password.length < 6) {
      return alert('Password must be at least 6 characters');
    }

    try {
      setLoading(true);

      const res = await fetch(
        'http://localhost:5000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      console.log('Register Response:', data);

      if (res.ok) {
        alert(
          'OTP sent to your email.'
        );

        localStorage.setItem(
          'pendingEmail',
          email
        );

        navigate('/verify-otp');
      }

      // If you create an OTP page later:
      // navigate('/verify-otp');

    } catch (error) {
      console.error('Register Error:', error);

      alert(
        'Server error. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <form
        onSubmit={handleSubmit}
        className="auth-form"
      >

        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          type="submit"
          className="btn"
          disabled={loading}
        >
          {loading
            ? 'Creating Account...'
            : 'Register'}
        </button>

        <p>
          Already have an account?{' '}
          <Link to="/login">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Register;