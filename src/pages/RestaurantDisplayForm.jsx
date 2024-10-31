// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../css/RestaurantDisplayForm.css";
// import UserProfile from "./UserProfile";

// const RestaurantDisplayForm = ({ setCurrentForm }) => {
//   const [restaurants, setRestaurants] = useState([]);
//   const [zipCodes, setZipCodes] = useState([]);
//   const [cuisineTypes, setCuisineTypes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showProfile, setShowProfile] = useState(false);
//   const [userProfile, setUserProfile] = useState({
//     email: "",
//     phone: "",
//     address: { street: "", city: "", state: "", zipCode: "", country: "USA" },
//   });
//   const [cuisine, setCuisine] = useState("All");
//   const [zipcode, setZipcode] = useState("");
//   const [sort, setSort] = useState("");
//   const [page, setPage] = useState(1);
//   const navigate = useNavigate();

//   // Fetch available cuisine types and zip codes
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const cuisinesResponse = await fetch("http://localhost:3000/api/restaurants/cuisines");
//         if (!cuisinesResponse.ok) throw new Error("Failed to fetch cuisine types");
//         const cuisinesData = await cuisinesResponse.json();
//         setCuisineTypes(["All", ...cuisinesData.cuisines]);

//         const zipCodesResponse = await fetch("http://localhost:3000/api/restaurants/zipcodes");
//         if (!zipCodesResponse.ok) throw new Error("Failed to fetch zip codes");
//         const zipCodesData = await zipCodesResponse.json();
//         setZipCodes(["All", ...zipCodesData.zipcodes]);
//       } catch (error) {
//         console.error("Error fetching filter data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Fetch restaurants based on filters and pagination
//   useEffect(() => {
//     if (showProfile) return;

//     const fetchRestaurants = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const cuisineQuery = cuisine !== "All" ? `&cuisine=${cuisine}` : "";
//         const zipcodeQuery = zipcode ? `&zipcode=${zipcode}` : "";
//         const sortQuery = sort ? `&sort=${sort}` : "";

//         const response = await fetch(
//           `http://localhost:3000/api/restaurants?page=${page}&limit=12${cuisineQuery}${zipcodeQuery}${sortQuery}`
//         );

//         if (!response.ok) throw new Error("Failed to fetch restaurants");

//         const data = await response.json();
//         setRestaurants(data.restaurants);
//       } catch (err) {
//         setError(err.message || "Failed to load restaurants");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRestaurants();
//   }, [cuisine, zipcode, sort, page, showProfile]);
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RestaurantDisplayForm.css";
import UserProfile from "./UserProfile";

// Component to display the restaurant list and filter options
const RestaurantDisplayForm = ({ setCurrentForm }) => {
  // To store the list of restaurants
  const [restaurants, setRestaurants] = useState([]);
  // To store available zip codes for filtering
  const [zipCodes, setZipCodes] = useState([]);
  // To store available cuisine types for filtering
  const [cuisineTypes, setCuisineTypes] = useState([]);
  // To track loading state while data is fetched
  const [loading, setLoading] = useState(true);
  // To store error messages
  const [error, setError] = useState("");
  // To toggle user profile view
  const [showProfile, setShowProfile] = useState(false);
  // To store user profile information
  const [userProfile, setUserProfile] = useState({
    email: "",
    phone: "",
    address: { street: "", city: "", state: "", zipCode: "", country: "USA" },
  });
  // To store selected cuisine type for filtering
  const [cuisine, setCuisine] = useState("All");
  // To store selected zip code for filtering
  const [zipcode, setZipcode] = useState("");
  // To store selected sort option
  const [sort, setSort] = useState("");
  // To track pagination page number
  const [page, setPage] = useState(1);

  // To navigate to other pages
  const navigate = useNavigate();

  // To fetch restaurants data based on filters and pagination
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

  // To fetch unique cuisine types for filtering options
  // useEffect(() => {
  //   const fetchCuisineTypes = async () => {
  //     try {
  //       // const response = await fetch("http://localhost:3000/api/restaurants");
  //      const response = await fetch("http://localhost:3000/api/restaurants/cuisines"); 
  //       if (!response.ok) throw new Error("Failed to fetch cuisine types");

  //       const data = await response.json();
  //       const uniqueCuisines = [
  //         ...new Set(data.restaurants.map((r) => r.cuisine)),
  //       ];

  //       setCuisineTypes(uniqueCuisines);
  //     } catch (error) {
  //       console.error("Error fetching cuisines:", error);
  //     }
  //   };

  //   fetchCuisineTypes();
  // }, []);

    // Fetch available cuisine types and zip codes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cuisinesResponse = await fetch("http://localhost:3000/api/restaurants/cuisines");
        if (!cuisinesResponse.ok) throw new Error("Failed to fetch cuisine types");
        const cuisinesData = await cuisinesResponse.json();
        setCuisineTypes(["All", ...cuisinesData.cuisines]);

        const zipCodesResponse = await fetch("http://localhost:3000/api/restaurants/zipcodes");
        if (!zipCodesResponse.ok) throw new Error("Failed to fetch zip codes");
        const zipCodesData = await zipCodesResponse.json();
        setZipCodes(["All", ...zipCodesData.zipcodes]);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchData();
  }, []);
  // To fetch user profile information
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

  // To handle profile update and save changes
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

  // To handle profile button click and display profile
  const handleProfileClick = () => {
    fetchUserProfile();
    setShowProfile(true);
  };

  // To reset all filter options to default
  const handleResetFilters = () => {
    setCuisine("All");
    setSort("");
    setZipcode("");
    setPage(1);
  };

  // To navigate to the menu page of a selected restaurant
  const handleCardClick = (restaurantId) => {
    navigate(`/menu/${restaurantId}`);
  };

  // To handle Exit button to navigate back to login page
  const handleExit = () => {
    setCurrentForm("login");
    navigate("/login");
  };

  // To go to the next page of pagination
  const handleNextPage = () => setPage(page + 1);
  // To go to the previous page of pagination
  const handlePreviousPage = () => setPage(page > 1 ? page - 1 : 1);

  // To display loading message
  if (loading && !showProfile) return <p>Loading...</p>;
  // To display error message if any
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="restaurant-display-form">
      {/* Header section with title and filter controls */}
      <header>
        <h1>Food on the Fly</h1>
        <div className="header-controls">
          {showProfile ? (
            <>
            </>
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

      {/* User profile section or restaurant grid display */}
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

          {/* Pagination controls for navigating pages */}
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

      {/* Footer section */}
      <footer className="footer">
        <div className="footer-content">
          <h2>Food on The Fly</h2>
          <p>© 2024 @foodonthefly Limited</p>
        </div>
      </footer>
    </div>
  );
};

// To export the RestaurantDisplayForm component
export default RestaurantDisplayForm;