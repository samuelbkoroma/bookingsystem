import React, { useState } from "react";
import Swal from "sweetalert2";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

const Add = ({ employees, setEmployees, setIsAdding, getGuests }) => {
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cost, setCost] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [guestNo, setGuestNo] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [status, setStatus] = useState("Active");
  const handleAdd = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !phoneNo ||
      !idNumber ||
      !email ||
      !cost ||
      !roomNo ||
      !guestNo ||
      !entryDate ||
      !leaveDate ||
      !status
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newEmployee = {
      id: Date.now().toString(), // Generate a unique ID using the current timestamp
      name,
      phoneNo,
      idNumber,
      email,
      cost,
      roomNo,
      guestNo,
      entryDate,
      leaveDate,
      status,
    };

    const newEmployees = [...employees, newEmployee];

    try {
      await addDoc(collection(db, "guests"), newEmployee);
      setEmployees(newEmployees);
      setIsAdding(false);
      getGuests();

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: `${name}'s data has been Added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Guest</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="lastName">Phone No</label>
        <input
          id="phoneNo"
          type="text"
          name="phoneNo"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="idNumber">Id Number</label>
        <input
          id="idNumber"
          type="text"
          name="idNumber"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
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
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
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
