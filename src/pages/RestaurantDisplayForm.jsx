
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RestaurantDisplayForm.css";
import "./InspirationalRandomQuotes.jsx"
const MAX_IMAGES = 20;

const RestaurantDisplayForm = ({ setCurrentForm }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [userProfile, setUserProfile] = useState({
    email: "",
    phone: "",
    address: { street: "", city: "", state: "", zipCode: "" },
  });
  const [cuisineType, setCuisineType] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  // Fetch restaurants based on filters and pagination
  useEffect(() => {
    const fetchRestaurants = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `http://localhost:3000/api/restaurants?cuisineType=${cuisineType}&zipcode=${zipcode}&sort=${sort}&page=${page}&limit=12`
        );
        if (!response.ok) throw new Error("Failed to fetch restaurants");
        const data = await response.json();
        console.log(data);
        setRestaurants(data.restaurants);
        console.log(data.restaurants);
      } catch (err) {
        setError(err.message || "Failed to load restaurants");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [cuisineType, zipcode, sort, page]);

  // Fetch user profile
  const handleProfileClick = () => {
    setShowProfile(true);
    fetchUserProfile();
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/me', {
        credentials: 'include',  
      });
      if (!response.ok) throw new Error("Failed to fetch user profile");
      const data = await response.json();
      setUserProfile(data);
    } catch (err) {
      setError("Failed to load user profile");
    }
  };
  
 
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
      });
      if (response.ok) {
        setCurrentForm("login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  
  const handleCardClick = (restaurantId) => {
    navigate(`/menu/${restaurantId}`);
  };

 
  const handleNextPage = () => setPage(page + 1);
  const handlePreviousPage = () => setPage(page > 1 ? page - 1 : 1);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="restaurant-display-form">
      <header>
        <h1>Food on the Fly</h1>
        <div className="menu">
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleProfileClick}>Profile</button>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </header>

  
      {showProfile && (
        <div className="profile-form">
          <h2>Update Profile</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowProfile(false);  
            }}
          >
            <label>
              Email:
              <input
                type="email"
                value={userProfile.email}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, email: e.target.value })
                }
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                value={userProfile.phone}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, phone: e.target.value })
                }
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowProfile(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

    
      <div className="filters">
        <label>
          Cuisine:
          <select
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
          >
            <option value="">Select Cuisine</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Indian">Indian</option>
            <option value="Mexican">Mexican</option>
            <option value="Japanese">Japanese</option>
            <option value="Thai">Thai</option>
            <option value="American">American</option>
          </select>
        </label>
        <label>
          Zipcode:
          <input
            type="text"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </label>
        <label>
          Sort by:
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Select Sort Option</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
          </select>
        </label>
      </div>

      {/* Display restaurant cards */}
      {/* <div className="restaurant-grid">
        {restaurants.length === 0 ? (
          <p>No restaurants available.</p>
        ) : (
          restaurants.map((restaurant) => (
            <div
              className="restaurant-card"
              key={restaurant._id}
              onClick={() => handleCardClick(restaurant._id)}
            >
              <img
  src={`https://loremflickr.com/200/150/food,${restaurant.cuisineType}`}
  alt={restaurant.name}
  className="restaurant-image"
  onError={(e) => {
    e.target.src = "https://via.placeholder.com/200x150?text=No+Image+Available";
  }}
/>

              <div className="restaurant-details">
                <h3>{restaurant.name}</h3>
                <p>Rating: {restaurant.averageRating || "Not rated yet"}</p>
                <p>
                  {restaurant.address.street}, {restaurant.address.city},{" "}
                  {restaurant.address.state}, {restaurant.address.zipCode}
                </p>
                <p>Cuisine: {restaurant.cuisineType}</p>
                <p>Price Range: {restaurant.priceRange || "N/A"}</p>
              </div>
            </div>
          ))
        )}
      </div> */}
      {/* <div className="restaurant-grid">
  {restaurants.length === 0 ? (
    <p>No restaurants available.</p>
  ) : (
    restaurants.slice(0, 20).map((restaurant, index) => (
      <div
        className="restaurant-card"
        key={restaurant._id}
        onClick={() => handleCardClick(restaurant._id)}
      >
        <img
          src={`/images/restaurant${index + 1}.jpg`} // Adjust to match your local image filenames
          alt={restaurant.name}
          className="restaurant-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200x150?text=No+Image+Available";
          }}
        />

        <div className="restaurant-details">
          <h3>{restaurant.name}</h3>
          <p>Rating: {restaurant.averageRating || "Not rated yet"}</p>
          <p>
            {restaurant.address.street}, {restaurant.address.city},{" "}
            {restaurant.address.state}, {restaurant.address.zipCode}
          </p>
          <p>Cuisine: {restaurant.cuisineType}</p>
          <p>Price Range: {restaurant.priceRange || "N/A"}</p>
        </div>
      </div>
    ))
  )}
</div> */}

<div className="restaurant-grid">
  {restaurants.length === 0 ? (
    <p>No restaurants available.</p>
  ) : (
    restaurants.map((restaurant) => (
      <div
        className="restaurant-card"
        key={restaurant._id}
        onClick={() => handleCardClick(restaurant._id)}
      >
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-image"
          // onError={(e) => {
          //   e.target.src = "https://via.placeholder.com/200x150?text=No+Image+Available";
          // }}
        />
        <div className="restaurant-details">
          <h3>{restaurant.name}</h3>
          <p>Rating: {restaurant.rating || "Not rated yet"}</p>
          <p>
            {restaurant.address.street}, {restaurant.address.city},{" "}
            {restaurant.address.state}, {restaurant.address.zipCode}
          </p>
          <p>Cuisine: {restaurant.cuisine}</p>
          <p>Price Range: {restaurant.priceRange || "N/A"}</p>
        </div>
      </div>
    ))
  )}
</div>

   
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={restaurants.length < 12}>
          Next
        </button>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <h2>Swiggy</h2>
          <p>© 2024 Swiggy Limited</p>
        </div>
      </footer>
    </div>
  );
};

export default RestaurantDisplayForm;
