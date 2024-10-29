const RestaurantDetails = ({ restaurant }) => (
  <div className="restaurant-details">
    <img
      src={
        restaurant.image ||
        "https://via.placeholder.com/150?text=No+Image+Available"
      }
      alt={restaurant.name || "Restaurant Image"}
      className="restaurant-logo"
    />
    <h2>{restaurant.name}</h2>
    <p>{`${restaurant.address.street}, ${restaurant.address.city}, ${restaurant.address.state}`}</p>
    <p>Rating: {restaurant.rating || "No ratings yet"}</p>
    <p>Cuisine: {restaurant.cuisine}</p>
  </div>
);

export default RestaurantDetails;
