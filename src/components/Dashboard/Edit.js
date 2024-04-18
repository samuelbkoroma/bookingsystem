import React, { useState } from "react";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

const Edit = ({
  employees,
  selectedEmployee,

  updateEmployees,
  setIsEditing,
  getGuests,
}) => {
  const id = selectedEmployee.id;

  const [name, setName] = useState(selectedEmployee.name);
  const [phoneNo, setPhoneNo] = useState(selectedEmployee.phoneNo);
  const [idNumber, setIdNumber] = useState(selectedEmployee.idNumber);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [cost, setCost] = useState(selectedEmployee.cost);
  const [roomNo, setRoomNo] = useState(selectedEmployee.roomNo);
  const [guestNo, setGuestNo] = useState(selectedEmployee.guestNo);
  const [entryDate, setEntryDate] = useState(selectedEmployee.entryDate);
  const [leaveDate, setLeaveDate] = useState(selectedEmployee.leaveDate);
  const [status, setStatus] = useState(selectedEmployee.status);

  const handleUpdate = async (e) => {
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

    const employee = {
      id,
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

    await setDoc(doc(db, "guests", id), {
      ...employee,
    });

    setIsEditing(false);
    getGuests();
    updateEmployees(employees);

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${employee.name}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Guest</h1>
        <label htmlFor="firstName">Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="lastName">Phone</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
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
          type="number"
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
