import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logout from "../Logout";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firestore";

const Header = ({ setIsAdding, setIsAuthenticated, userEmail }) => {
  const [totalCost, setTotalCost] = useState(0);
  const [totalGuest, setTotalGuest] = useState(0);
  const [activeGuests, setActiveGuests] = useState(0);
  const [inactiveGuest, setInactiveGuest] = useState(0);

  const fetchTotalCost = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "guests"));
      let totalCost = 0;

      querySnapshot.docs.forEach((doc) => {
        // Add the cost of each guest to the total cost
        totalCost += parseInt(doc.data().cost); // Convert cost to integer before adding
      });

      setTotalCost(totalCost);
    } catch (error) {
      console.error("Error fetching total cost:", error);
    }
  };

  const fetchGuestData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "guests"));
      let activeGuests = 0;
      let inactiveGuest = 0;

      querySnapshot.docs.forEach((doc) => {
        if (doc.data().status === "Active") {
          activeGuests++;
        } else if (doc.data().status === "Inactive") {
          inactiveGuest++;
        } else {
        }
      });

      const totalGuest = querySnapshot.size;

      setTotalGuest(totalGuest);
      setActiveGuests(activeGuests);
      setInactiveGuest(inactiveGuest);
    } catch (error) {
      console.error("Error fetching guest data:", error);
    }
  };

  useEffect(() => {
    fetchTotalCost();
    fetchGuestData();
  }, []);

  return (
    <Div>
      <div className="head-sec-1">
        <img
          src="bookinglogo.jpg"
          alt=""
          width={100}
          height={100}
          className="logo"
        />
        <span className="title">BeraKah Hotel</span>
        <div className="space">
          <span className="logged-in-user">Logged in as: {userEmail}</span>
          <Logout setIsAuthenticated={setIsAuthenticated} />
        </div>
      </div>

      <div className="items">
        <header>
          <div
            style={{ marginTop: "30px", marginBottom: "18px" }}
            className=" buttons-det"
          >
            <div className="the-buttons">
              <button
                onClick={() => setIsAdding(true)}
                className="add-guest-button"
              >
                Add Guest
              </button>
            </div>
          </div>
        </header>

        <div className="divs">
          <div>
            <p className="p1">Total Guest</p>
            <p className="p2">{totalGuest}</p>
          </div>
          <div>
            <p className="p1">Total Active Guest</p>
            <p className="p2">{activeGuests}</p>
          </div>
          <div>
            <p className="p1">Total Inactive Guest</p>
            <p className="p2">{inactiveGuest}</p>
          </div>
          <div>
            <p className="p1">Total Income</p>
            <p className="p2">${totalCost}</p>
          </div>
        </div>
      </div>
    </Div>
  );
};

export default Header;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  .items {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .divs {
    display: flex;
    gap: 20px;
    text-align: center;
  }
  .divs div {
    border-radius: 50px;
    padding: 10px;
    font-size: 20px;
    width: 200px;
    height: 150px;
    box-shadow: 2px 6px 13px -1px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 2px 6px 13px -1px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 6px 13px -1px rgba(0, 0, 0, 0.75);
    background: #f2f2f2;
  }

  .title {
    text-align: center;
    font-size: 45px;
    font-family: "Poppins", sans-serif;
    font-weight: 800;
    color: #050315;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .logo {
    border-radius: 20px;
    margin-left: 10px;
    box-shadow: 2px 6px 13px -1px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 2px 6px 13px -1px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 2px 6px 13px -1px rgba(0, 0, 0, 0.75);
  }

  .p1 {
    font-size: 20px;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    color: #333;
  }
  .p2 {
    font-size: 20px;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    color: #333;
  }

  .buttons-det {
    margin: 5px;
    display: flex;
    flex-direction: column;
  }
  .logged-in-user {
    font-size: 18px;
    font-weight: 700;
    font-family: "Poppins", sans-serif;
    color: #050315;
  }

  .add-guest-button {
    padding: 20px;
    background-color: #2f27ce;
    border: none;
    outline: none;
    font-size: 17px;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    border-radius: 50px;
  }

  .the-buttons {
    display: flex;
    gap: 8px;
  }
  .head-sec-1 {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-top: 5px;
    margin-bottom: 20px;
  }

  .space {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-end;
    padding: 10px;
  }
`;
