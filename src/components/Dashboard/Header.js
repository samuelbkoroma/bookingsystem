import React from "react";

import Logout from "../Logout";

const Header = ({ setIsAdding, setIsAuthenticated, userEmail }) => {
  return (
    <header>
      <h1>Booking System </h1>
      <div style={{ marginTop: "30px", marginBottom: "18px" }}>
        <div className="logged-in-user">Logged in as: {userEmail}</div>
        <button onClick={() => setIsAdding(true)}>Add Guest</button>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;
