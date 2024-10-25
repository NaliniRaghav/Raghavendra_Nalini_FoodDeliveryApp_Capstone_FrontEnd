import { useEffect, useState } from 'react';

const RestaurantDisplayForm = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/restaurants'); //  
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (err) {
        setError(err.message || 'Failed to load restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="restaurant-display-form">
      <h1>Available Restaurants</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id}>
            <h3>{restaurant.name}</h3>
            <p>Address: {restaurant.address}</p>
            <p>Cuisine: {restaurant.cuisine}</p>
            <p>Phone: {restaurant.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantDisplayForm;

