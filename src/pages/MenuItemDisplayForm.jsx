import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/MenuItemDisplayForm.css";

const MenuItemDisplay = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState({});
  const [orderDetails, setOrderDetails] = useState({
    deliveryOption: "pickup",
    deliveryTime: "ASAP",
    address: "sample",
    payment: { cardNumber: "", expiryDate: "", cvv: "" },
  });
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [finalAmount, setFinalAmount] = useState(0);
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    fetchRestaurantDetails();
    fetchMenuItems();
    fetchRandomQuote();
    fetchUserProfile();
  }, [restaurantId]);

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

  const addToCart = (itemId, item) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: {
        ...item,
        quantity: (prevCart[itemId]?.quantity || 0) + 1,
      },
    }));
  };

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

  const calculateTotalAmount = () => {
    return Object.values(cart)
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const handleOrderPlacement = () => {
    if (Object.keys(cart).length === 0) {
      alert("Your cart is empty.");
      return;
    }
    setFinalAmount(calculateTotalAmount());
    setShowOrderConfirmation(true);
  };
  //

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

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      payment: { ...prevDetails.payment, [name]: value },
    }));
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150?text=No+Image+Available";
  };

  const handleLogout = () => {
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="menu-item-display">
      <header className="top-menu-bar">
        <div className="logo">
          <img
            src="/src/assets/images/logo.jpg"
            alt="App Logo"
            className="app-logo"
          />
          <h1 className="app-name">Food On the Fly</h1>
        </div>

        <div className="delivery-info">
          <span>Delivery to: </span>
          <span className="address-display">
            {orderDetails.address || "Enter Address"}
          </span>
        </div>

        <div className="top-menu-buttons">
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

      <div className="quote-section">
        <h3>Food for thought</h3>
        <blockquote className="quote-text">"{quote.text}"</blockquote>
        <p className="quote-author">- {quote.author}</p>
      </div>

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

              <button onClick={confirmOrder} className="confirm-order-button">
                Confirm Order
              </button>
              <button onClick={toggleCartVisibility} className="back-button">
                Back to Menu
              </button>
            </>
          ) : (
            <>
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

export default MenuItemDisplay;
