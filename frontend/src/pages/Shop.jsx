import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/shop.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
import { FiSearch, FiFilter } from 'react-icons/fi';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const [visibleProducts, setVisibleProducts] = useState(8);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category') || '';
    setSelectedCategory(cat);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          'https://e-commerce-website-78kn.onrender.com/api/products'
        );

        const data = await res.json();

        setProducts(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory
        ? p.category === selectedCategory
        : true;

    return (
      matchSearch &&
      matchCategory
    );
  });

  const displayedProducts =
    filteredProducts.slice(
      0,
      visibleProducts
    );

  const hasMore =
    filteredProducts.length >
    visibleProducts;

  return (
    <div className="shop-container">

      <div className="shop-header">

        <span className="shop-badge">
          PREMIUM COLLECTION
        </span>

        <h1>
          Kids Fashion Store
        </h1>

        <p>
          Discover premium clothing,
          toys and essentials
          crafted for style,
          comfort and happiness.
        </p>

      </div>

      <div className="filters-card">

        <div className="search-wrapper">
          <FiSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
        </div>

        <div className="select-wrapper">
          <FiFilter className="filter-icon" />

          <select
            value={selectedCategory}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedCategory(value);

              if (value) {
                navigate(`/shop?category=${value}`);
              } else {
                navigate('/shop');
              }
            }}
            className="category-select"
          >
            <option value="">All Categories</option>

            {categories.map((cat) => (
              <option
                key={cat.value}
                value={cat.value}
              >
                {cat.label}
              </option>
            ))}
          </select>
        </div>

      </div>

      {loading ? (
        <div className="loading">
          Loading Products...
        </div>
      ) : (
        <>
          <div className="product-grid">

            {displayedProducts.length >
              0 ? (
              displayedProducts.map(
                (
                  product
                ) => (
                  <ProductCard
                    key={
                      product._id
                    }
                    product={
                      product
                    }
                  />
                )
              )
            ) : (
              <p className="no-products">
                No products found
              </p>
            )}

          </div>

          {hasMore && (
            <div className="load-more-wrapper">

              <button
                className="load-more-btn"
                onClick={() =>
                  setVisibleProducts(
                    filteredProducts.length
                  )
                }
              >
                View More Products
              </button>

            </div>
          )}
        </>
      )}

    </div>
  );
};

export default Shop;