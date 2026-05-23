import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png"

const Home = ({ selectedCategory }) => {
  const { data, isError, addToCart, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchImagesAndUpdateProducts = async () => {
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            try {
              const response = await axios.get(
                `http://localhost:8080/api/product/${product.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...product, imageUrl };
            } catch (error) {
              console.error(
                "Error fetching image for product ID:",
                product.id,
                error
              );
              return { ...product, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setProducts(updatedProducts);
      };

      fetchImagesAndUpdateProducts();
    }
  }, [data]);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  if (isError) {
    return (
      <section className="home-shell">
        <div className="empty-state">
          <img src={unplugged} alt="Connection error" />
          <h2>Unable to load products</h2>
          <p>Please check that the backend server is running.</p>
        </div>
      </section>
    );
  }
  return (
    <main className="home-shell">
      <section className="store-hero">
        <div>
          <span className="store-kicker">Curated Product Store</span>
          <h1>Find products that fit your day.</h1>
          <p>
            Browse electronics, fashion, and everyday essentials with fast
            product search and easy cart management.
          </p>
        </div>
        <div className="store-stats" aria-label="Store summary">
          <span>{filteredProducts.length}</span>
          <small>Products available</small>
        </div>
      </section>

      <section className="product-toolbar">
        <div>
          <span className="toolbar-label">Showing</span>
          <h2>{selectedCategory || "All Products"}</h2>
        </div>
      </section>

      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <h2>No products available</h2>
            <p>Try another category or add a new product.</p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const { id, brand, name, price, productAvailable, imageUrl } =
              product;
            return (
              <div
                className={`product-card-v2 ${
                  productAvailable ? "" : "is-unavailable"
                }`}
                key={id}
              >
                <Link
                  to={`/product/${id}`}
                  className="product-card-link"
                >
                  <div className="product-image-wrap">
                    <img src={imageUrl} alt={name} />
                    {!productAvailable && (
                      <span className="stock-badge">Out of stock</span>
                    )}
                  </div>

                  <div className="product-card-body">
                    <div className="product-meta">
                      <span>{brand}</span>
                      <h3>{name}</h3>
                    </div>

                    <div className="product-card-footer">
                      <div className="price-block">
                        <small>Price</small>
                        <strong>
                          <i className="bi bi-currency-rupee"></i>
                          {price}
                        </strong>
                      </div>
                      <button
                        className="add-cart-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                        disabled={!productAvailable}
                      >
                        {productAvailable ? "Add to Cart" : "Unavailable"}
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
};

export default Home;
