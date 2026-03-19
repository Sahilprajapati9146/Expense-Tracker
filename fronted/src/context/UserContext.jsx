// import React , {createContext, useState} from "react";

// export const UserContext = createContext();

// const UserProvider = ({ children }) =>{
//     const [user, setUser] = useState(null);

//     // Function to update user data
//     const updateUser = (userData)=>{
//         setUser(userData)
//     };

//     // Function to clear user data (e.g., on logout)
//     const clearUser = ()=>{
//         setUser(null);
//     };

//     return (
//         <UserContext.Provider
//          value={{
//             user,
//             updateUser,
//             clearUser,
//          }}>
//             {children}
//          </UserContext.Provider>
//     )

// }

// export default UserProvider;

import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔥 Restore user on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
