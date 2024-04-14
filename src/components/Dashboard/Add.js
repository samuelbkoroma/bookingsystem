import React, { useState } from "react";
import Swal from "sweetalert2";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

const Add = ({ employees, setEmployees, setIsAdding, getGuests }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cost, setCost] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [guestNo, setGuestNo] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [leaveDate, setLeaveDate] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !cost ||
      !roomNo ||
      !guestNo ||
      !entryDate ||
      !leaveDate
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newEmployee = {
      firstName,
      lastName,
      email,
      cost,
      roomNo,
      guestNo,
      entryDate,
      leaveDate,
    };

    employees.push(newEmployee);

    try {
      await addDoc(collection(db, "guests"), {
        ...newEmployee,
      });
    } catch (error) {
      console.log(error);
    }

    // Add a new document with a generated id.

    setEmployees(employees);
    setIsAdding(false);
    getGuests();

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${firstName} ${lastName}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Guest</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="salary">Cost ($)</label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />

        <label htmlFor="roomNo">Room Number</label>
        <input
          id="roomNo"
          type="number"
          name="roomNo"
          value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
        />

        <label htmlFor="guestNo">Amount of Guest</label>
        <input
          id="guestNo"
          type="number"
          name="guestNo"
          value={guestNo}
          onChange={(e) => setGuestNo(e.target.value)}
        />
        <label htmlFor="date">Entry Date</label>
        <input
          id="entryDate"
          type="date"
          name="entryDate"
          value={entryDate}
          onChange={(e) => setEntryDate(e.target.value)}
        />

        <label htmlFor="date">Leave Date</label>
        <input
          id="leaveDate"
          type="date"
          name="leaveDate"
          value={leaveDate}
          onChange={(e) => setLeaveDate(e.target.value)}
        />
        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
