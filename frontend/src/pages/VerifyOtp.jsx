import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');

  const email =
    localStorage.getItem(
      'pendingEmail'
    );

  const navigate =
    useNavigate();

  const handleVerify =
    async (e) => {

      e.preventDefault();

      const res =
        await fetch(
          'https://e-commerce-website-kidoza-8162.onrender.com/api/auth/verify-otp',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body:
              JSON.stringify({
                email,
                otp,
              }),
          }
        );

      const data =
        await res.json();

      if (res.ok) {

        alert(
          'Account Verified!'
        );

        localStorage.removeItem(
          'pendingEmail'
        );

        navigate('/login');

      } else {

        alert(
          data.message
        );

      }
    };

  return (
    <div
      className="auth-container"
    >
      <form
        onSubmit={
          handleVerify
        }
        className="auth-form"
      >
        <h2>
          Verify OTP
        </h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(
              e.target.value
            )
          }
          required
        />

        <button
          type="submit"
          className="btn"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;