import React from 'react';

const ReturnPolicy = () => {
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
          background: '#ffffff',
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
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            CUSTOMER SUPPORT
          </span>

          <h1
            style={{
              fontSize: '3rem',
              color: '#111827',
              marginTop: '20px',
              marginBottom: '10px'
            }}
          >
            Return & Refund Policy
          </h1>

          <p
            style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}
          >
            We want every shopping experience to be smooth,
            safe and worry-free.
          </p>
        </div>

        {/* Section 1 */}

        <div
          style={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '20px',
            padding: '25px',
            marginBottom: '20px'
          }}
        >
          <h3
            style={{
              color: '#ff6b35',
              marginBottom: '12px'
            }}
          >
            1. Eligibility For Returns
          </h3>

          <p
            style={{
              color: '#6b7280',
              lineHeight: '1.8'
            }}
          >
            Items can be returned within 30 days of delivery.
            Products must be unused, undamaged, and returned
            in their original packaging with proof of purchase.
          </p>
        </div>

        {/* Section 2 */}

        <div
          style={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '20px',
            padding: '25px',
            marginBottom: '20px'
          }}
        >
          <h3
            style={{
              color: '#ff6b35',
              marginBottom: '12px'
            }}
          >
            2. Refund Processing
          </h3>

          <p
            style={{
              color: '#6b7280',
              lineHeight: '1.8'
            }}
          >
            Once your returned item is received and inspected,
            approved refunds will be processed back to the
            original payment method within 5–7 business days.
          </p>
        </div>

        {/* Section 3 */}

        <div
          style={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '20px',
            padding: '25px',
            marginBottom: '20px'
          }}
        >
          <h3
            style={{
              color: '#ff6b35',
              marginBottom: '12px'
            }}
          >
            3. Non-Returnable Items
          </h3>

          <p
            style={{
              color: '#6b7280',
              lineHeight: '1.8'
            }}
          >
            Customized products, digital goods, gift cards,
            and items showing signs of misuse or damage are
            not eligible for return or refund.
          </p>
        </div>

        {/* Section 4 */}

        <div
          style={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '20px',
            padding: '25px'
          }}
        >
          <h3
            style={{
              color: '#ff6b35',
              marginBottom: '12px'
            }}
          >
            4. Return Shipping
          </h3>

          <p
            style={{
              color: '#6b7280',
              lineHeight: '1.8'
            }}
          >
            Customers are responsible for return shipping
            charges unless the item received was defective,
            damaged, or incorrect.
          </p>
        </div>

        {/* Footer */}

        <div
          style={{
            marginTop: '40px',
            background: '#fff4ef',
            borderRadius: '18px',
            padding: '20px',
            textAlign: 'center'
          }}
        >
          <p
            style={{
              margin: 0,
              color: '#ff6b35',
              fontWeight: '600'
            }}
          >
            Need help with a return? Contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;