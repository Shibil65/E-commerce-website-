import React from 'react';

const Disclaimer = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        padding: '60px 20px'
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '30px',
          padding: '50px',
          boxShadow: '0 15px 50px rgba(0,0,0,0.08)',
          border: '1px solid #e5e7eb'
        }}
      >
        {/* Header */}

        <div
          style={{
            textAlign: 'center',
            marginBottom: '50px'
          }}
        >
          <span
            style={{
              background: '#fff4ef',
              color: '#ff6b35',
              padding: '8px 18px',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            LEGAL INFORMATION
          </span>

          <h1
            style={{
              marginTop: '20px',
              color: '#111827',
              fontSize: '3rem'
            }}
          >
            Disclaimer & Terms
          </h1>

          <p
            style={{
              color: '#6b7280',
              fontSize: '1.1rem',
              marginTop: '10px'
            }}
          >
            Please read the following information carefully.
          </p>
        </div>

        {/* Section 1 */}

        <div
          style={{
            background: '#f9fafb',
            padding: '25px',
            borderRadius: '18px',
            marginBottom: '20px',
            border: '1px solid #e5e7eb'
          }}
        >
          <h3
            style={{
              color: '#ff6b35',
              marginBottom: '12px'
            }}
          >
            1. Accuracy of Information
          </h3>

          <p
            style={{
              color: '#6b7280',
              lineHeight: '1.8'
            }}
          >
            Product descriptions, images, pricing, and other
            information displayed on this platform are provided
            for informational purposes only. While we strive for
            accuracy, errors and omissions may occasionally occur.
          </p>
        </div>

        {/* Section 2 */}

        <div
          style={{
            background: '#f9fafb',
            padding: '25px',
            borderRadius: '18px',
            marginBottom: '20px',
            border: '1px solid #e5e7eb'
          }}
        >
          <h3
            style={{
              color: '#ff6b35',
              marginBottom: '12px'
            }}
          >
            2. Payment & Transactions
          </h3>

          <p
            style={{
              color: '#6b7280',
              lineHeight: '1.8'
            }}
          >
            Payments are processed through secure third-party
            gateways. We do not directly store sensitive payment
            information such as card numbers or banking details.
          </p>
        </div>

        {/* Section 3 */}

        <div
          style={{
            background: '#f9fafb',
            padding: '25px',
            borderRadius: '18px',
            marginBottom: '20px',
            border: '1px solid #e5e7eb'
          }}
        >
          <h3
            style={{
              color: '#ff6b35',
              marginBottom: '12px'
            }}
          >
            3. External Links
          </h3>

          <p
            style={{
              color: '#6b7280',
              lineHeight: '1.8'
            }}
          >
            Our platform may contain links to third-party websites.
            We are not responsible for the content, privacy policies,
            or practices of any external websites or services.
          </p>
        </div>

        {/* Section 4 */}

        <div
          style={{
            background: '#f9fafb',
            padding: '25px',
            borderRadius: '18px',
            border: '1px solid #e5e7eb'
          }}
        >
          <h3
            style={{
              color: '#ff6b35',
              marginBottom: '12px'
            }}
          >
            4. User Responsibility
          </h3>

          <p
            style={{
              color: '#6b7280',
              lineHeight: '1.8'
            }}
          >
            By using this website, you acknowledge and agree to
            comply with all applicable laws and regulations.
            Continued use of the platform indicates acceptance
            of these terms.
          </p>
        </div>

        {/* Footer */}

        <div
          style={{
            marginTop: '40px',
            padding: '20px',
            background: '#fff4ef',
            borderRadius: '16px',
            textAlign: 'center'
          }}
        >
          <p
            style={{
              color: '#ff6b35',
              fontWeight: '600',
              margin: 0
            }}
          >
            Last Updated: 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;