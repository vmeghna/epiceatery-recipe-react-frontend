import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [uid, setUid] = useState("");
  const [userData, setUserData] = useState(null);

  const setUser = (email, displayName, uid) => {
    setEmail(email);
    setDisplayName(displayName);
    setUid(uid);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("UID", uid);
    // localStorage.setItem("username", username);
    localStorage.setItem("displayName", displayName);
  };

  const [formFields, setFormFields] = useState({
    // username: "",
    displayName: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        formFields,
        setFormFields,
        cpassword,
        setUser,
        // username,
        displayName,
        setDisplayName,
        uid,
        userData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
