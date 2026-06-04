import React, {
  useEffect,
  useState,
  useContext
} from 'react';

import { AuthContext } from '../context/AuthContext';
import {
  useParams,
  useNavigate
} from 'react-router-dom';

import '../styles/editProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: ''
    });

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/products/${id}`
        );

        const data =
          await res.json();

        setFormData({
          name: data.name,
          description:
            data.description,
          price: data.price,
          category:
            data.category,
          stock: data.stock
        });

        setPreview(
          data.imageUrl
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImage = (e) => {
    const file =
      e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    setLoading(true);

    const data =
      new FormData();

    data.append(
      'name',
      formData.name
    );

    data.append(
      'description',
      formData.description
    );

    data.append(
      'price',
      formData.price
    );

    data.append(
      'category',
      formData.category
    );

    data.append(
      'stock',
      formData.stock
    );

    if (image) {
      data.append(
        'image',
        image
      );
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization:
              `Bearer ${user.token}`
          },
          body: data
        }
      );

      if (res.ok) {
        alert(
          'Product Updated Successfully'
        );

        navigate(
          '/admin/products'
        );
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="edit-page">

      <div className="edit-card">

        <div className="edit-header">
          <h1>Edit Product</h1>

          <p>
            Update your product
            details and preview
            changes instantly.
          </p>
        </div>

        <div className="edit-grid">

          {/* FORM */}

          <form
            className="edit-form"
            onSubmit={
              handleSubmit
            }
          >

            <input
              type="text"
              placeholder="Product Name"
              value={
                formData.name
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name:
                    e.target
                      .value
                })
              }
            />

            <textarea
              rows="5"
              placeholder="Description"
              value={
                formData.description
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description:
                    e.target
                      .value
                })
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={
                formData.price
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price:
                    e.target
                      .value
                })
              }
            />

            <input
              type="text"
              placeholder="Category"
              value={
                formData.category
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category:
                    e.target
                      .value
                })
              }
            />

            <input
              type="number"
              placeholder="Stock"
              value={
                formData.stock
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stock:
                    e.target
                      .value
                })
              }
            />

            <div className="upload-box">
              <label>
                Replace Product
                Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImage
                }
              />
            </div>

            <button
              type="submit"
              className="update-btn"
            >
              {loading
                ? 'Updating...'
                : 'Update Product'}
            </button>

          </form>

          {/* PREVIEW */}

          <div className="preview-card">

            <div className="preview-image">

              {preview ? (
                <img
                  src={preview}
                  alt=""
                />
              ) : (
                <div className="placeholder">
                  No Image
                </div>
              )}

            </div>

            <div className="preview-content">

              <span className="badge">
                {formData.category ||
                  'Category'}
              </span>

              <h2>
                {formData.name ||
                  'Product Name'}
              </h2>

              <div className="preview-price">
                ₹
                {formData.price ||
                  '0'}
              </div>

              <p>
                {formData.description ||
                  'Product description preview will appear here.'}
              </p>

              <div className="stock-badge">
                Stock:
                {' '}
                {formData.stock ||
                  0}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EditProduct;