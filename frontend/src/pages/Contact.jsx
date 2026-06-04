import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/contact.css';

import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      'service_wavqv36',
      'template_57oj2of',
      form.current,
      '0_em7aZwagKaLQRQU'
    )
    .then(() => {
      setSuccess(true);
      setLoading(false);
      form.current.reset();
    })
    .catch(() => {
      setLoading(false);
    });
  };

  return (
    <div className="contact-container">

      <h2>Contact Us</h2>

      {/* FORM CARD */}
      <form ref={form} onSubmit={sendEmail} className="contact-form">

        <input
          type="text"
          name="user_name"
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          name="user_email"
          placeholder="Your Email"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
        />

        <button type="submit">
          {loading ? 'Sending...' : 'Send Message'}
        </button>

        {success && (
          <p className="success">Message sent successfully ✅</p>
        )}
      </form>

      {/* SOCIAL SECTION */}
      <div className="social-section">

        <h3>Connect with us</h3>

        <div className="social-icons">

          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noreferrer"
            className="icon instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noreferrer"
            className="icon facebook"
          >
            <FaFacebook />
          </a>

          <a
            href="https://twitter.com/yourpage"
            target="_blank"
            rel="noreferrer"
            className="icon twitter"
          >
            <FaTwitter />
          </a>

          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noreferrer"
            className="icon whatsapp"
          >
            <FaWhatsapp />
          </a>

        </div>
      </div>

    </div>
  );
};

export default Contact;