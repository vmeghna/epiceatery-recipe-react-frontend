import React, { useState } from "react";
import "./login.css";
import { useUser } from "../Context/Usercontext";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "./../utils/firebase.jsx";
import { AiFillDownCircle } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async (event) => {
    event.preventDefault();
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    setUser(user.email, user.displayName);
    navigate("/recipes");
  };
  const {
    formFields,
    setFormFields,
    setUser,
    setUsername,
    setEmail,
    setPassword,
    setCpassword,
  } = useUser();

  const { username, email, password, cpassword, displayName } = formFields;
  const [isTestBtn, setIsTestBtn] = useState(false);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("hit");

    if (email && password) {
      try {
        const { user } = await signInAuthUserWithEmailAndPassword(
          email,
          password
        );
        console.log({ user });
        setFormFields({ email: "", password: "", cpassword: "" });
        if ({ user }) {
          const uid = user.uid;
          setUser(user.email, user.displayName, user.uid, user.username);
          navigate("/recipes");
          // navigate("/cart");
          console.log(user.email);
          console.log(user.displayName);
        }
      } catch (err) {
        console.log("Error Occurd while Login", err.message);
        console.log(err.code);
        if (err.code === "auth/invalid-credential") {
          alert("Invalid Credentials");
        }
      }
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="login-container">
      <div className="form-box">
        <form action="" onSubmit={submitHandler}>
          <div className="input-box">
            <label htmlFor="email"></label>
            <input
              type="email"
              placeholder="Enter your Email"
              onChange={changeHandler}
              className="input"
              id="email"
              name="email"
              required
            />
            <label htmlFor="password"></label>
            <input
              type="password"
              placeholder="Enter your Password"
              onChange={changeHandler}
              className="input"
              id="password"
              name="password"
              required
            />
          </div>
          <input type="checkbox" /> Remember me!
          <button value="submit" className="btn">
            Login
          </button>
          <div>
            <button
              type="submit"
              className="btn"
              onClick={() => setIsTestBtn(!isTestBtn)}
            >
              view test credentials
              <span className="connect-icon">
                <AiFillDownCircle />
              </span>
            </button>
            {isTestBtn && (
              <div className="testCredentials">
                <div>
                  <h5>Email :</h5>
                  <p>epiceatery@gmail.com</p>
                </div>
                <div>
                  <h5>Password :</h5>
                  <p>Epiceatery@5</p>
                </div>
              </div>
            )}
          </div>
        </form>
        {/* <label className="label">Continue with Google</label> */}
        {/* <button
          className="icon-img"
          style={{ border: "none" }}
          onClick={signInWithGoogle}
        >
          <img src="../images/google.png" alt="" />
        </button> */}
      </div>
    </div>
  );
};

export default Login;
