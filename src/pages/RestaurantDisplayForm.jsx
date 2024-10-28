import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RestaurantDisplayForm.css";
import "./InspirationalRandomQuotes.jsx";

const RestaurantDisplayForm = ({ setCurrentForm }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [userProfile, setUserProfile] = useState({
    email: "",
    phone: "",
    address: { street: "", city: "", state: "", zipCode: "", country: "USA" },
  });
  const [cuisine, setCuisine] = useState("All");
  const [zipcode, setZipcode] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  
  useEffect(() => {
    if (showProfile) return;

    const fetchRestaurants = async () => {
      setLoading(true);
      setError("");

      try {
        const cuisineQuery = cuisine !== "All" ? `&cuisine=${cuisine}` : "";
        const zipcodeQuery = zipcode ? `&zipcode=${zipcode}` : "";
        const sortQuery = sort ? `&sort=${sort}` : "";

        const response = await fetch(
          `http://localhost:3000/api/restaurants?page=${page}&limit=12${cuisineQuery}${zipcodeQuery}${sortQuery}`
        );
        
        if (!response.ok) throw new Error("Failed to fetch restaurants");

        const data = await response.json();
        setRestaurants(data.restaurants);

        
        const uniqueZipCodes = [...new Set(data.restaurants.map(r => r.address.zipCode))];
        setZipCodes(uniqueZipCodes);
        
      } catch (err) {
        setError(err.message || "Failed to load restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [cuisine, zipcode, sort, page, showProfile]);

 
  const handleProfileClick = async () => {
    try {
      setShowProfile(true);  
      const response = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        credentials: "include",  
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) throw new Error("Failed to fetch user profile");
  
       
      const data = await response.json();
      setUserProfile(data);
    } catch (err) {
      setError("Failed to load user profile");
      console.error("Error fetching profile:", err);  
    }
  };
  
  const handleSaveProfile = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",  
        body: JSON.stringify({
          email: userProfile.email,
          phone: userProfile.phone,
          address: {
            street: userProfile.address.street,
            city: userProfile.address.city,
            state: userProfile.address.state,
            zipCode: userProfile.address.zipCode,
            country: userProfile.address.country,
          },
        }),
      });
  
      if (!response.ok) throw new Error("Failed to update profile");
  
      alert("Profile updated successfully");
      setShowProfile(false);  
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile. Please try again.");
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

  const handleResetFilters = () => {
    setCuisine("All");
    setSort("");
    setZipcode("");
    setPage(1);
  };

  const handleCardClick = (restaurantId) => {
    navigate(`/menu/${restaurantId}`);
  };

  const handleNextPage = () => setPage(page + 1);
  const handlePreviousPage = () => setPage(page > 1 ? page - 1 : 1);

  if (loading && !showProfile) return <p>Loading...</p>;
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

      {showProfile ? (
        <div className="profile-form">
          <h2>Update Profile</h2>
          <form onSubmit={handleSaveProfile}>
            <label>
              Email:
              <input
                type="email"
                value={userProfile.email}
                onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                value={userProfile.phone}
                onChange={(e) => setUserProfile({ ...userProfile, phone: e.target.value })}
              />
            </label>
            <label>
              Street:
              <input
                type="text"
                value={userProfile.address.street}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    address: { ...userProfile.address, street: e.target.value },
                  })
                }
              />
            </label>
            <label>
              City:
              <input
                type="text"
                value={userProfile.address.city}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    address: { ...userProfile.address, city: e.target.value },
                  })
                }
              />
            </label>
            <label>
              State:
              <input
                type="text"
                value={userProfile.address.state}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    address: { ...userProfile.address, state: e.target.value },
                  })
                }
              />
            </label>
            <label>
              Zip Code:
              <input
                type="text"
                value={userProfile.address.zipCode}
                onChange={(e) =>
                  setUserProfile({
                    ...userProfile,
                    address: { ...userProfile.address, zipCode: e.target.value },
                  })
                }
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowProfile(false)}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="filters">
            <label>
              Cuisine:
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
              >
                <option value="All">All</option>
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
              <select
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              >
                <option value="">Select Zipcode</option>
                {zipCodes.map((zip) => (
                  <option key={zip} value={zip}>{zip}</option>
                ))}
              </select>
            </label>
            <label>
              Sort by:
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Select Sort Option</option>
                <option value="rating">Rating</option>
                <option value="price">Price</option>
              </select>
            </label>
            <button onClick={handleResetFilters}>Reset Filters</button>
          </div>

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
        </>
      )}

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
