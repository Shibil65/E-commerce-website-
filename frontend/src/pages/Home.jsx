import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

import offerImage from '../assets/offer.png';

import boysImage from '../assets/boys.png';
import girlsImage from '../assets/girls.png';
import babyImage from '../assets/baby.png';
import toysImage from '../assets/toys.png';

export const categories = [
  { label: "Boys Collection", value: "boys", img: boysImage },
  { label: "Girls Collection", value: "girls", img: girlsImage },
  { label: "Baby Essentials", value: "baby", img: babyImage },
  { label: "Toys & Fun", value: "toys", img: toysImage }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">

        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/Kids-fashion.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay"></div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span>NEW ARRIVALS 2026</span>

          <h1>
            Fashion For
            <br />
            Happy Kids
          </h1>

          <p>
            Premium clothing, accessories and toys
            designed with comfort and style.
          </p>

          <button
            className="hero-btn"
            onClick={() => navigate('/shop')}
          >
            Shop Collection
          </button>
        </motion.div>

      </section>

      {/* OFFER */}

      <section className="offer">

        <motion.div
          className="offer-box"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          <div className="offer-image">
            <img src={offerImage} alt="Offer" />
          </div>

          <div className="offer-content">

            <span>LIMITED OFFER</span>

            <h2>50% OFF</h2>

            <p>
              Discover the latest kids fashion collection
              with amazing discounts.
            </p>

            <button
              className="offer-btn"
              onClick={() => navigate('/shop')}
            >
              Shop Now
            </button>

          </div>

        </motion.div>

      </section>

      {/* CATEGORIES */}

      <section className="categories">

        <div className="section-header">
          <span>OUR COLLECTION</span>
          <h2>Shop By Category</h2>
          <p>
            Explore premium collections designed
            for every little star.
          </p>
        </div>

        <div className="category-grid">

          {categories.map((cat, index) => (
            <motion.div
              key={cat.value}
              className="category-card"
              onClick={() =>
                navigate(`/shop?category=${cat.value}`)
              }
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >

              <img
                src={cat.img}
                alt={cat.label}
              />

              <div className="category-info">

                <h3>{cat.label}</h3>

                <button>
                  Explore →
                </button>

              </div>

            </motion.div>
          ))}

        </div>

      </section>

      {/* FEATURES */}

      <section className="features">

        {[
          {
            icon: "🚚",
            title: "Free Shipping",
            text: "Fast delivery nationwide"
          },
          {
            icon: "🛡️",
            title: "Quality Guarantee",
            text: "Premium products only"
          },
          {
            icon: "💳",
            title: "Secure Payment",
            text: "100% safe checkout"
          },
          {
            icon: "❤️",
            title: "Trusted Parents",
            text: "Loved by families"
          }
        ].map((item, index) => (

          <motion.div
            key={index}
            className="feature-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >

            <div className="feature-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <p>{item.text}</p>

          </motion.div>

        ))}

      </section>

    </div>
  );
};

export default Home;