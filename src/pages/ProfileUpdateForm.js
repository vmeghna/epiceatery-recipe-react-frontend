import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appDB, storageDB } from "../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const ProfileUpdateForm = ({ userData }) => {
  const navigate = useNavigate();
  const uid = localStorage.getItem("UID");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    city: "",
    state: "",
    avatarFile: null,
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        displayName: userData.displayName || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        address: userData.address || "",
        phoneNumber: userData.phoneNumber || "",
        city: userData.city || "",
        state: userData.state || "",
        avatarFile: null,
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "avatar" && files && files.length > 0) {
      const avatarFile = files[0];
      setFormData((prevData) => ({
        ...prevData,
        avatarFile: avatarFile,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let avatarURL = userData.avatar || null;
      //   let avatarURL = null;
      if (formData.avatarFile) {
        const fileName = `${uid}_${formData.avatarFile.name}`;
        const storageRef = ref(storageDB, `images/${fileName}`);
        await uploadBytes(storageRef, formData.avatarFile);
        avatarURL = await getDownloadURL(storageRef);
      }
      const userDocRef = doc(appDB, "users", uid);
      await updateDoc(userDocRef, {
        displayName: formData.displayName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        city: formData.city,
        state: formData.state,
        avatar: avatarURL,
      });
      navigate("/profile");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div className="profile-update-form">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Display Name:
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
        </label>
        <label>
          Avatar (Profile Image):
          <input type="file" name="avatar" onChange={handleChange} />
        </label>
        <button className="btn" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
