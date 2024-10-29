import { useState, useEffect } from "react";

const UserProfile = ({ userProfile, onSaveProfile, onClose }) => {
  const [editableProfile, setEditableProfile] = useState(userProfile);

  useEffect(() => {
    setEditableProfile(userProfile);
  }, [userProfile]);

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

  const handleSave = () => onSaveProfile(editableProfile);

  return (
    <div className="user-profile">
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
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
