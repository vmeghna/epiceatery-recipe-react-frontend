import React, { useState } from "react";
import "./login.css";
import { useUser } from "../Context/Usercontext";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../utils/firebase.jsx";
import { doc, setDoc } from "firebase/firestore";
import { appDB, storageDB } from "../utils/firebase.jsx";
import { Link, useNavigate } from "react-router-dom";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";

const SignUp = () => {
  const {
    formFields,
    setFormFields,
    setUser,
    setUsername,
    setEmail,
    setPassword,
    setCpassword,
  } = useUser();
  const [file, setFile] = useState(null);
  const {
    username,
    email,
    password,
    cpassword,
    displayName,
    firstName,
    lastName,
    address,
    city,
    state,
    phoneNumber,
  } = formFields;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== cpassword) {
      alert("Password do not Match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      let avatarURL = null;
      if (file) {
        const fileName = `${user.uid}_${file.name}`;
        const storageRef = ref(storageDB, `images/${fileName}`);
        await uploadBytes(storageRef, file);
        avatarURL = await getDownloadURL(storageRef);
      }

      const userData = {
        displayName,
        firstName,
        lastName,
        address,
        city,
        state,
        phoneNumber,
        email: user.email,
        avatar: avatarURL,
      };

      await setDoc(doc(appDB, "users", user.uid), userData);

      if (user) {
        alert("SignUp Success");
        navigate("/login");
      }
    } catch (err) {
      console.log("Something Happened", err.message);
      console.log(err.code);
      if (err.code === "auth/email-already-in-use") {
        alert("Email Already Exists Please use alternate Email");
      } else if (err.code === "auth/weak-password") {
        alert("Password must be at least 6 characters long");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <form action="" onSubmit={submitHandler}>
          {/* {Form.map((item, index) => ( */}
          <div className="input-box">
            <label htmlFor="username"></label>
            <input
              type="text"
              placeholder="displayName"
              className="input"
              id="displayName"
              name="displayName"
              required
              onChange={changeHandler}
            />
            <label htmlFor="firstname"></label>
            <input
              type="text"
              placeholder="firstName"
              className="input"
              id="firstName"
              name="firstName"
              required
              onChange={changeHandler}
            />
            <label htmlFor="lastname"></label>
            <input
              type="text"
              placeholder="lastName"
              className="input"
              id="lastName"
              name="lastName"
              required
              onChange={changeHandler}
            />
            <label htmlFor="email"></label>
            <input
              type="text"
              placeholder="email"
              className="input"
              id="email"
              name="email"
              required
              onChange={changeHandler}
            />
            <label htmlFor="address"></label>
            <input
              type="text"
              placeholder="address"
              className="input"
              id="address"
              name="address"
              required
              onChange={changeHandler}
            />
            <label htmlFor="city"></label>
            <input
              type="text"
              placeholder="city"
              className="input"
              id="city"
              name="city"
              required
              onChange={changeHandler}
            />
            <label htmlFor="state"></label>
            <input
              type="text"
              placeholder="state"
              className="input"
              id="state"
              name="state"
              required
              onChange={changeHandler}
            />
            <label htmlFor="phonenumber"></label>
            <input
              type="text"
              placeholder="phoneNumber"
              className="input"
              id="phoneNumber"
              name="phoneNumber"
              required
              onChange={changeHandler}
            />

            <label htmlFor="password"></label>
            <input
              type="password"
              placeholder="password"
              className="input"
              id="password"
              name="password"
              required
              onChange={changeHandler}
            />
            <label htmlFor="cpassword"></label>
            <input
              type="password"
              placeholder="confirm password"
              className="input"
              id="cpassword"
              name="cpassword"
              required
              onChange={changeHandler}
            />
            <label className="input">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          {/* ))} */}
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
        {/* <label className="label">Continue with Google</label> */}
        {/* <div className="icon-img">
          <img src="../images/google.png" alt="" />
        </div> */}
      </div>
    </div>
  );
};

export default SignUp;
