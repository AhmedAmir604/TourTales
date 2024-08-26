import React, { createContext, useContext, useState } from "react";

// Create the context with a default value of null
export const UserContext = createContext(null);

// Create the context provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);

  // Handle cases where the context might be undefined or null
  if (context === undefined || context === null) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
