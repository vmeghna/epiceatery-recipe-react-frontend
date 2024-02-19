import React from "react";
import { useUser } from "../Context/Usercontext";
import { appDB } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const uid = localStorage.getItem("UID");
  const { userData, setUserData } = useUser();
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    navigate("/profile/update");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = doc(appDB, "users", uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (uid) {
      fetchUserData();
    }
  }, [uid]);

  return (
    <div className="for-profile">
      {userData ? (
        <>
          <h1>Profile Details</h1>
          <h2>Email: {userData.email}</h2>
          <h2>Display Name: {userData.displayName}</h2>
          <h2>First Name: {userData.firstName}</h2>
          <h2>Last Name: {userData.lastName}</h2>
          <h2>Address : {userData.address}</h2>
          <h2>City : {userData.city}</h2>
          <h2>state : {userData.state}</h2>
          <h2>Phone Number : {userData.phoneNumber}</h2>
          <div className="img-contain">
            <img className="img-ssd" src={userData.avatar} alt="" />
          </div>
          <button className="btn" onClick={handleUpdateProfile}>
            Update Profile
          </button>
        </>
      ) : (
        <h2>Profile Details not Available</h2>
      )}
    </div>
  );
};

export default Profile;
