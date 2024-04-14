import React, { useState } from "react";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

const Edit = ({
  employees,
  selectedEmployee,
  setEmployees,
  setIsEditing,
  getGuests,
}) => {
  const id = selectedEmployee.id;

  const [firstName, setFirstName] = useState(selectedEmployee.firstName);
  const [lastName, setLastName] = useState(selectedEmployee.lastName);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [cost, setCost] = useState(selectedEmployee.cost);
  const [roomNo, setRoomNo] = useState(selectedEmployee.roomNo);
  const [guestNo, setGuestNo] = useState(selectedEmployee.guestNo);
  const [entryDate, setEntryDate] = useState(selectedEmployee.entryDate);
  const [leaveDate, setLeaveDate] = useState(selectedEmployee.leaveDate);

  const handleUpdate = async (e) => {
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

    const employee = {
      id,
      firstName,
      lastName,
      email,
      cost,
      roomNo,
      guestNo,
      entryDate,
      leaveDate,
    };

    await setDoc(doc(db, "guests", id), {
      ...employee,
    });

    setEmployees(employees);
    setIsEditing(false);
    getGuests();

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${employee.firstName} ${employee.lastName}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Guest</h1>
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
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
