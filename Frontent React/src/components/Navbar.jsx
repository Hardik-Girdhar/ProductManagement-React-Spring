import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Navbar = ({ onSelectCategory }) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light-theme";
  };

  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleChange = async (value) => {
    setInput(value);

    if (value.length < 1) {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
      return;
    }

    setShowSearchResults(true);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/search?keyword=${value}`
      );
      setSearchResults(response.data);
      setNoResults(response.data.length === 0);
    } catch (error) {
      console.error("Error searching:", error);
      setNoResults(true);
    }
  };

  const handleCategorySelect = (category) => {
    onSelectCategory(category);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const categories = [
    "Laptop",
    "Headphone",
    "Mobile",
    "Electronics",
    "Toys",
    "Fashion",
  ];

  return (
    <header>
      <nav className="navbar navbar-expand-lg fixed-top app-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand brand-mark" to="/">
            <span className="brand-icon">T</span>
            <span>Telusko Store</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add_product">
                  Add Product
                </Link>
              </li>

              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle category-trigger"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </button>

                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => handleCategorySelect("")}
                    >
                      All Products
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        className="dropdown-item"
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <div className="navbar-actions">
              <button
                className="theme-btn"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>

              <Link to="/cart" className="cart-link">
                <i className="bi bi-cart3"></i>
                <span>Cart</span>
              </Link>

              <div className="search-area">
                <div className="search-box">
                  <i className="bi bi-search"></i>
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search products"
                    aria-label="Search products"
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                  />
                </div>

                {showSearchResults && (
                  <ul className="list-group search-results-panel">
                    {searchResults.length > 0
                      ? searchResults.map((result) => (
                          <li key={result.id} className="list-group-item">
                            <Link
                              to={`/product/${result.id}`}
                              className="search-result-link"
                              onClick={() => setShowSearchResults(false)}
                            >
                              <span>{result.name}</span>
                              <small>{result.brand}</small>
                            </Link>
                          </li>
                        ))
                      : noResults && (
                          <li className="list-group-item no-results-message">
                            No product found
                          </li>
                        )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
