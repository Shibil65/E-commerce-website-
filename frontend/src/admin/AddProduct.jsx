import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/addproduct.css';

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: ''
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return alert('Please upload image');
    }

    setLoading(true);

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    data.append('image', image);

    try {
      const res = await fetch(
        'https://e-commerce-website-78kn.onrender.com/api/products',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user.token}`
          },
          body: data
        }
      );

      const result = await res.json();

      if (res.ok) {
        alert('Product Created Successfully');
        navigate('/shop');
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">

      <div className="form-section">

        <div className="form-card">

          <h1>Add New Product</h1>
          <p>Create and preview products instantly</p>

          <form onSubmit={handleSubmit}>

            <div className="input-grid">

              <input
                type="text"
                name="name"
                placeholder="Product Name"
                onChange={handleChange}
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                onChange={handleChange}
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                onChange={handleChange}
              />

              <input
                type="number"
                name="stock"
                placeholder="Stock"
                onChange={handleChange}
              />

            </div>

            <textarea
              name="description"
              placeholder="Product Description..."
              onChange={handleChange}
            />

            <div className="upload-box">

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
              />

            </div>

            <button
              className="publish-btn"
              disabled={loading}
            >
              {loading
                ? 'Publishing...'
                : 'Publish Product'}
            </button>

          </form>

        </div>

      </div>

      <div className="preview-section">

        <div className="preview-card">

          <div className="preview-image">

            {preview ? (
              <img
                src={preview}
                alt="preview"
              />
            ) : (
              <div className="placeholder">
                Upload Image
              </div>
            )}

          </div>

          <div className="preview-content">

            <span className="preview-category">
              {form.category || 'Category'}
            </span>

            <h3>
              {form.name || 'Product Name'}
            </h3>

            <div className="preview-price">
              ₹{form.price || '0'}
            </div>

            <p>
              {form.description ||
                'Product description will appear here...'}
            </p>

            <div className="preview-stock">
              Stock: {form.stock || 0}
            </div>

            <button className="preview-btn">
              Add To Cart
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddProduct;