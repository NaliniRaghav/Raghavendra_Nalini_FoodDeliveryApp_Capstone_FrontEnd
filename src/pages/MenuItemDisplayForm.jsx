// // Importing necessary React hooks and components for routing
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Importing CSS for styling
import "../css/MenuItemDisplayForm.css";

// To display restaurant menu and cart functionality
const MenuItemDisplay = () => {
  
  // To get restaurantId from URL parameters
  const { restaurantId } = useParams();
  
  // To navigate between pages
  const navigate = useNavigate();
  
  // To set restaurant details state
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  
  // To set menu items state
  const [menuItems, setMenuItems] = useState([]);
  
  // To set cart items state
  const [cart, setCart] = useState({});
  
  // To set order details for checkout
  const [orderDetails, setOrderDetails] = useState({
    deliveryOption: "pickup",
    deliveryTime: "ASAP",
    address: "sample",
    payment: { cardNumber: "", expiryDate: "", cvv: "" },
  });
  
  // To toggle order confirmation view
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  
  // To set loading state during data fetching
  const [loading, setLoading] = useState(true);
  
  // To set error messages
  const [error, setError] = useState("");
  
  // To set the final amount for order
  const [finalAmount, setFinalAmount] = useState(0);
  
  // To set random quote for display
  const [quote, setQuote] = useState({ text: "", author: "" });
  
  // To toggle cart visibility
  const [isCartVisible, setIsCartVisible] = useState(false);

  // To fetch all data when restaurantId changes
  useEffect(() => {
    fetchRestaurantDetails();
    fetchMenuItems();
    fetchRandomQuote();
    fetchUserProfile();
  }, [restaurantId]);

  // To fetch user profile and update address
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch user profile");
      const data = await response.json();
      const userAddress = `${data.address.street || ""} ${
        data.address.city || ""
      }, ${data.address.state || ""} ${data.address.zipCode || ""} ${
        data.address.country || "USA"
      }`;
      setOrderDetails((prev) => ({
        ...prev,
        address: userAddress || "Enter Address",
      }));
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // To fetch restaurant details
  const fetchRestaurantDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurants/${restaurantId}`
      );
      if (!response.ok) throw new Error("Failed to fetch restaurant details");
      const data = await response.json();
      setRestaurantDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // To fetch menu items for the restaurant
  const fetchMenuItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/menuItems/restaurants/${restaurantId}/menu`
      );
      if (!response.ok) throw new Error("Failed to fetch menu items");
      const data = await response.json();
      setMenuItems(data.menuItems);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // To fetch a random quote for display
  const fetchRandomQuote = async () => {
    try {
      const response = await fetch(
        "https://api.api-ninjas.com/v1/quotes?category=happiness",
        {
          headers: {
            "X-Api-Key": "rjLvoE5akxQb7sUpSQ5E3g==3wq3i5PVHzOU5LzJ",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch the quote");
      const data = await response.json();
      setQuote({ text: data[0].quote, author: data[0].author || "Unknown" });
    } catch (error) {
      console.error("Error fetching the quote:", error);
      setQuote({
        text: "Peace comes from within. Do not seek it without.",
        author: "Buddha",
      });
    }
  };

  // To add menu item to cart
  const addToCart = (itemId, item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: {
        ...item,
        quantity: (prevCart[itemId]?.quantity || 0) + 1,
      },
    }));
  };

  // To update quantity of items in the cart
  const updateCartQuantity = (itemId, delta) => {
    setCart((prevCart) => {
      const quantity = (prevCart[itemId]?.quantity || 0) + delta;
      if (quantity <= 0) {
        const { [itemId]: _, ...newCart } = prevCart;
        return newCart;
      }
      return {
        ...prevCart,
        [itemId]: {
          ...prevCart[itemId],
          quantity,
        },
      };
    });
  };

  // To calculate total amount in the cart
  const calculateTotalAmount = () => {
    return Object.values(cart)
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // To toggle visibility of the cart
  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  // To handle order placement and show confirmation
  const handleOrderPlacement = () => {
    if (Object.keys(cart).length === 0) {
      alert("Your cart is empty.");
      return;
    }
    setFinalAmount(calculateTotalAmount());
    setShowOrderConfirmation(true);
  };

  // To confirm the order after checking payment details
  const confirmOrder = () => {
    const { cardNumber, expiryDate, cvv } = orderDetails.payment;
    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all payment details.");
      return;
    }
    alert("Order placed successfully!");
    setOrderDetails((prev) => ({
      ...prev,
      payment: { cardNumber: "", expiryDate: "", cvv: "" },
    }));
    setCart({});
    setShowOrderConfirmation(false);
    setIsCartVisible(false);
  };

  // To handle changes in payment input fields
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      payment: { ...prevDetails.payment, [name]: value },
    }));
  };

  // To handle image error by setting a placeholder
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150?text=No+Image+Available";
  };

  // To navigate back to restaurant listing
  const handleBackToRestaurants = () => {
    navigate("/restaurantDisplay"); 
  };

  // To navigate to login page on logout
  const handleLogout = () => {
    navigate("/login");
  };

  // To show loading or error message if any
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="menu-item-display">
      {/* Header section with logo and navigation buttons */}
      <header className="top-menu-bar">
        <div className="logo">
          <img
            src="/assets/images/logo.jpg"
            alt="App Logo"
            className="app-logo"
          />
          <h1 className="app-name">Food On the Fly</h1>
        </div>

        {/* Delivery info section */}
        <div className="delivery-info">
          <span>Delivery to: </span>
          <span className="address-display">
            {orderDetails.address || "Enter Address"}
          </span>
        </div>

        {/* Top menu buttons */}
        <div className="top-menu-buttons">
          <button onClick={handleBackToRestaurants} className="back-button">
            Back to Restaurants
          </button>
          <button className="account-button" onClick={handleLogout}>
            Logout
          </button>
          <button className="cart-button" onClick={toggleCartVisibility}>
            {isCartVisible
              ? "Back to Menu"
              : `Cart (${Object.keys(cart).length})`}
          </button>
        </div>
      </header>

      {/* Quote section */}
      <div className="quote-section">
        <h3>Food for thought</h3>
        <blockquote className="quote-text">"{quote.text}"</blockquote>
        <p className="quote-author">- {quote.author}</p>
      </div>

      {/* Restaurant details section */}
      {restaurantDetails && (
        <div className="restaurant-details">
          <img
            src={
              restaurantDetails?.image ||
              "https://via.placeholder.com/150?text=No+Image+Available"
            }
            alt={restaurantDetails?.name || "Restaurant Image"}
            className="restaurant-logo"
            onError={handleImageError}
          />
          <h2>{restaurantDetails.name}</h2>
          <p>{`${restaurantDetails.address.street}, ${restaurantDetails.address.city}, ${restaurantDetails.address.state}`}</p>
          <p>Rating: {restaurantDetails.averageRating || "No ratings yet"}</p>
          <p>Cuisine: {restaurantDetails.cuisineType}</p>
        </div>
      )}

      {/* Cart sidebar section */}
      {isCartVisible ? (
        <div className="cart-sidebar">
          <h3>Cart Summary</h3>
          {Object.keys(cart).length === 0 && !showOrderConfirmation ? (
            <p>Your cart is empty.</p>
          ) : showOrderConfirmation ? (
            <>
              <h4>Order Confirmation</h4>
              <p>
                Your order will be ready for{" "}
                {orderDetails.deliveryOption === "delivery"
                  ? "delivery"
                  : "pickup"}
                .
              </p>
              <p>Estimated time: {orderDetails.deliveryTime}</p>
              <p>Total Amount: ${finalAmount}</p>

              {/* Payment input fields */}
              <h4>Payment Information</h4>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={orderDetails.payment.cardNumber}
                onChange={handlePaymentChange}
              />
              <input
                type="text"
                name="expiryDate"
                placeholder="Expiry Date (MM/YY)"
                value={orderDetails.payment.expiryDate}
                onChange={handlePaymentChange}
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={orderDetails.payment.cvv}
                onChange={handlePaymentChange}
              />

              {/* Order confirmation buttons */}
              <button onClick={confirmOrder} className="confirm-order-button">
                Confirm Order
              </button>
              <button onClick={toggleCartVisibility} className="back-button">
                Back to Menu
              </button>
            </>
          ) : (
            <>
              {/* Displaying cart items */}
              <ul className="cart-items-list">
                {Object.values(cart).map((cartItem) => (
                  <li key={cartItem._id} className="cart-item">
                    <span>{cartItem.name}</span>
                    <div className="cart-item-details">
                      <span>
                        ${cartItem.price.toFixed(2)} x {cartItem.quantity}
                      </span>
                      <span>
                        ${(cartItem.price * cartItem.quantity).toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="total-amount">
                Total Amount: ${calculateTotalAmount()}
              </p>
              <button
                className="checkout-button"
                onClick={handleOrderPlacement}
              >
                Place Order
              </button>
              <button onClick={toggleCartVisibility} className="back-button">
                Back to Menu
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="content-container">
          <div className="menu-items">
            {/* Displaying menu items */}
            {menuItems.map((item) => (
              <div className="menu-item-card" key={item._id}>
                <img
                  src={
                    item.image ||
                    `https://via.placeholder.com/150?text=${encodeURIComponent(
                      item.name
                    )}`
                  }
                  alt={item.name}
                  className="menu-item-image"
                  onError={handleImageError}
                />

                <div className="menu-item-details">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>
                  {cart[item._id] ? (
                    <div className="quantity-controls">
                      <button onClick={() => updateCartQuantity(item._id, -1)}>
                        -
                      </button>
                      <span>{cart[item._id].quantity}</span>
                      <button onClick={() => updateCartQuantity(item._id, 1)}>
                        +
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(item._id, item)}>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Exporting the main component
export default MenuItemDisplay;
