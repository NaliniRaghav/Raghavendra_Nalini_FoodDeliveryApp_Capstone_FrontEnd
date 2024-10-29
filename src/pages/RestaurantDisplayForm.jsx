import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RestaurantDisplayForm.css";
import UserProfile from "./UserProfile";

const RestaurantDisplayForm = ({ setCurrentForm }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);
  const [cuisineTypes, setCuisineTypes] = useState([]);
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

        const response2 = await fetch("http://localhost:3000/api/restaurants");
        if (!response2.ok) throw new Error("Failed to fetch zip code data");
        const data2 = await response2.json();

        const uniqueZipCodes = [
          ...new Set(data2.restaurants.map((r) => r.address.zipCode)),
        ];
        setZipCodes(uniqueZipCodes);
      } catch (err) {
        setError(err.message || "Failed to load restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [cuisine, zipcode, sort, page, showProfile]);

  useEffect(() => {
    const fetchCuisineTypes = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/restaurants");
        if (!response.ok) throw new Error("Failed to fetch cuisine types");

        const data = await response.json();
        const uniqueCuisines = [
          ...new Set(data.restaurants.map((r) => r.cuisine)),
        ];

        setCuisineTypes(uniqueCuisines);
      } catch (error) {
        console.error("Error fetching cuisines:", error);
      }
    };

    fetchCuisineTypes();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch user profile");

      const data = await response.json();
      setUserProfile(data);
    } catch (error) {
      setError("Failed to load user profile");
      console.error("Error fetching profile:", error);
    }
  };

  const handleSaveProfile = async (updatedProfile) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      alert("Profile updated successfully");
      setUserProfile(updatedProfile);
      setShowProfile(false);
    } catch (error) {
      console.error("Profile update error:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleProfileClick = () => {
    fetchUserProfile();
    setShowProfile(true);
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
        <div className="header-controls">
          {showProfile ? (
            <button onClick={() => setCurrentForm("login")}>Logout</button>
          ) : (
            <>
              <label>
                Cuisine:
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                >
                  <option value="All">All</option>
                  {cuisineTypes.map((cuisineType) => (
                    <option key={cuisineType} value={cuisineType}>
                      {cuisineType}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Zipcode:
                <select
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                >
                  <option value="">All</option>
                  {zipCodes.map((zip) => (
                    <option key={zip} value={zip}>
                      {zip}
                    </option>
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
              <button onClick={handleProfileClick}>Profile</button>
              <button onClick={() => setCurrentForm("login")}>Logout</button>
            </>
          )}
        </div>
      </header>

      {showProfile ? (
        <UserProfile
          userProfile={userProfile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setShowProfile(false)}
        />
      ) : (
        <>
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
                    src={
                      restaurant.image ||
                      "https://via.placeholder.com/150?text=No+Image+Available"
                    }
                    alt={restaurant.name}
                    className="restaurant-image"
                  />
                  <div className="restaurant-details">
                    <h3 className="restaurant-name">{restaurant.name}</h3>
                    <p className="restaurant-rating">
                      Rating: {restaurant.rating || "Not rated yet"}
                    </p>
                    <p className="restaurant-address">
                      {restaurant.address.street}, {restaurant.address.city},{" "}
                      {restaurant.address.state}, {restaurant.address.zipCode}
                    </p>
                    <p className="restaurant-cuisine">
                      Cuisine: {restaurant.cuisine}
                    </p>
                    <p className="restaurant-price">
                      Price Range: {restaurant.priceRange || "N/A"}
                    </p>
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
