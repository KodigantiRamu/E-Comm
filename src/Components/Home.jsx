// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSearch } from './SearchContext';
// import "./Home.css";

// function Home({ addToCart }) {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();
//   const { searchTerm, selectedCategory, setSelectedCategory } = useSearch();

//   useEffect(() => {
//     fetch("https://localhost:7046/api/Product")
//       .then((response) => response.json())
//       .then((data) => setProducts(data))
//       .catch((error) => console.error("Error fetching products:", error));
//   }, []);

//   const handleProductClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//   };

//   const handleAddToCart = (product) => {
//     if (!localStorage.getItem('token')) {
//       navigate('/login');
//     } else {
//       addToCart(product);
//       console.log(`Product ${product.productId} added to cart`);
//     }
//   };

//   const handleAddToWishlist = (productId) => {
//     if (!localStorage.getItem('token')) {
//       navigate('/login');
//     } else {
//       // Add to wishlist logic
//       console.log(`Product ${productId} added to wishlist`);
//     }
//   };

//   const filteredProducts = products.filter((product) => {
//     return (
//       product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (selectedCategory === "All" || product.categoryName === selectedCategory)
//     );
//   });

//   const getRatingClass = (rating) => {
//     if (rating > 4) return "rating-good";
//     if (rating >= 3 && rating <= 4) return "rating-ok";
//     return "rating-bad";
//   };

//   return (
//     <div className="product-list">
//       <h1>Product List</h1>
//       <select 
//         value={selectedCategory}
//         onChange={handleCategoryChange} 
//         className="category-filter"
//       >
//         <option value="All">All</option>
//         <option value="Mobile">Mobile</option>
//         <option value="Books">Books</option>
//         <option value="Shoes">Shoes</option>
//         <option value="Sports">Sports</option>
//       </select>
      
//       {filteredProducts.length === 0 ? (
//         <div className="no-results">No products found</div>
//       ) : (
//         <div className="product-grid">
//           {filteredProducts.map((product) => (
//             <div
//               key={product.productId}
//               className="product-item"
//             >
//               <img 
//                 src={product.imgurl} 
//                 alt={product.productName} 
//                 onClick={() => handleProductClick(product.productId)}
//               />
//               <h3>{product.productName}</h3>
//               <h4>₹{product.price}</h4>
//               <p className={`product-card-rating ${getRatingClass(product.averageRating)}`}>
//                 {product.averageRating.toFixed(1)}
//                 <span className="star">★</span>
//               </p>
//               <div className="controls">
//                 <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
//                 <span className="wishlist-icon" onClick={() => handleAddToWishlist(product.productId)}>♡</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// export default Home;









import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from './SearchContext';
import "./Home.css";

function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { searchTerm, selectedCategory, setSelectedCategory } = useSearch();

  useEffect(() => {
    fetch("https://localhost:7046/api/Product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddToCart = (product) => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      addToCart(product);
      console.log(`Product ${product.productId} added to cart`);
    }
  };

  const handleAddToWishlist = (productId) => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      // Add to wishlist logic
      console.log(`Product ${productId} added to wishlist`);
    }
  };

  const filteredProducts = products.filter((product) => {
    return (
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || product.categoryName === selectedCategory)
    );
  });

  const getRatingClass = (rating) => {
    if (rating > 4) return "rating-good";
    if (rating >= 3 && rating <= 4) return "rating-ok";
    return "rating-bad";
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <select 
        value={selectedCategory}
        onChange={handleCategoryChange} 
        className="category-filter"
      >
        <option value="All">All</option>
        <option value="Mobile">Mobile</option>
        <option value="Books">Books</option>
        <option value="Shoes">Shoes</option>
        <option value="Sports">Sports</option>
      </select>
      
      {filteredProducts.length === 0 ? (
        <div className="no-results">No products found</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.productId}
              className="product-item"
            >
              <img 
                src={product.imgurl} 
                alt={product.productName} 
                onClick={() => handleProductClick(product.productId)}
              />
              <h3>{product.productName}</h3>
              <h4>₹{product.price}</h4>
              <p className={`product-card-rating ${getRatingClass(product.averageRating)}`}>
                {product.averageRating.toFixed(1)}
                <span className="star">★</span>
              </p>
              <div className="controls">
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                <span className="wishlist-icon" onClick={() => handleAddToWishlist(product.productId)}>♡</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;