import React from 'react';

const About = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '60px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          width: '100%',
          background: '#fff',
          borderRadius: '30px',
          padding: '50px',
          boxShadow: '0 15px 50px rgba(0,0,0,0.08)',
          border: '1px solid #e5e7eb'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '40px'
          }}
        >
          {/* IMAGE */}

          <div
            style={{
              flex: '1 1 300px',
              textAlign: 'center'
            }}
          >
            <img
              src="/logo.png"
              alt="KIDOSA"
              style={{
                width: '250px',
                height: '250px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '6px solid #ff6b35',
                boxShadow: '0 15px 40px rgba(255,107,53,.25)'
              }}
            />
          </div>

          {/* CONTENT */}

          <div
            style={{
              flex: '1 1 500px'
            }}
          >
            <span
              style={{
                background: '#fff4ef',
                color: '#ff6b35',
                padding: '8px 18px',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              ABOUT KIDOSA
            </span>

            <h1
              style={{
                marginTop: '20px',
                fontSize: '3rem',
                color: '#111827',
                marginBottom: '15px'
              }}
            >
              Fashion For Happy Kids
            </h1>

            <p
              style={{
                color: '#6b7280',
                fontSize: '1.1rem',
                lineHeight: '1.9',
                marginBottom: '25px'
              }}
            >
              KIDOSA is a modern kids fashion store focused on
              premium quality clothing, toys and baby essentials.
              We carefully select products that combine comfort,
              style and durability for every child.
            </p>

            <p
              style={{
                color: '#6b7280',
                fontSize: '1.05rem',
                lineHeight: '1.8'
              }}
            >
              Our mission is to make shopping for children easy,
              enjoyable and affordable while delivering products
              that parents trust and kids love.
            </p>

            {/* STATS */}

            <div
              style={{
                display: 'flex',
                gap: '25px',
                marginTop: '35px',
                flexWrap: 'wrap'
              }}
            >
              <div>
                <h2
                  style={{
                    color: '#ff6b35',
                    margin: 0
                  }}
                >
                  1000+
                </h2>

                <p style={{ color: '#6b7280' }}>
                  Happy Customers
                </p>
              </div>

              <div>
                <h2
                  style={{
                    color: '#ff6b35',
                    margin: 0
                  }}
                >
                  500+
                </h2>

                <p style={{ color: '#6b7280' }}>
                  Products
                </p>
              </div>

              <div>
                <h2
                  style={{
                    color: '#ff6b35',
                    margin: 0
                  }}
                >
                  24/7
                </h2>

                <p style={{ color: '#6b7280' }}>
                  Support
                </p>
              </div>
            </div>

            {/* BUTTONS */}

            <div
              style={{
                marginTop: '35px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '15px'
              }}
            >
              <a
                href="/shop"
                style={{
                  background: '#ff6b35',
                  color: '#fff',
                  padding: '14px 30px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600'
                }}
              >
                Shop Now
              </a>

              <a
                href="/contact"
                style={{
                  background: '#fff',
                  color: '#111827',
                  padding: '14px 30px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  border: '1px solid #e5e7eb'
                }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;