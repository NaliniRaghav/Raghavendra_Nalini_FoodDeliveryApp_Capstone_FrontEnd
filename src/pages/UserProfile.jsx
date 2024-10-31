// To import necessary hooks for component functionality
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/UserProfile.css";

// Component to display and edit user profile form
const UserProfile = ({ userProfile, onSaveProfile, onClose }) => {
  const [editableProfile, setEditableProfile] = useState(userProfile);
  const navigate = useNavigate();

  // To update the editable profile when userProfile prop changes
  useEffect(() => {
    setEditableProfile(userProfile);
  }, [userProfile]);

  // To handle input changes for profile fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setEditableProfile({
        ...editableProfile,
        address: {
          ...editableProfile.address,
          [addressField]: value,
        },
      });
    } else {
      setEditableProfile({ ...editableProfile, [name]: value });
    }
  };

  // To save the updated profile
  const handleSave = () => onSaveProfile(editableProfile);

  // To navigate back to login page
  const handleExit = () => navigate("/login");

  return (
    <div className="user-profile">
      {" "}
      {/* Container for user profile form */}
      <h2>User Profile</h2>
      <form>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={editableProfile.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={editableProfile.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Street:
          <input
            type="text"
            name="address.street"
            value={editableProfile.address.street}
            onChange={handleChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="address.city"
            value={editableProfile.address.city}
            onChange={handleChange}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="address.state"
            value={editableProfile.address.state}
            onChange={handleChange}
          />
        </label>
        <label>
          Zip Code:
          <input
            type="text"
            name="address.zipCode"
            value={editableProfile.address.zipCode}
            onChange={handleChange}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="address.country"
            value={editableProfile.address.country}
            onChange={handleChange}
            disabled
          />
        </label>
        <div className="profile-actions">
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button" onClick={handleExit}>
            Exit
          </button>
        </div>
      </form>
    </div>
  );
};

// To export the UserProfile component
export default UserProfile;
