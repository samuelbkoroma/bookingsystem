import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firestore";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";

// import { employeesData } from "../../data";

const Dashboard = ({ setIsAuthenticated, userEmail, userName }) => {
  // eslint-disable-next-line no-undef
  const [employees, setEmployees] = useState();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getGuests = async () => {
    const querySnapshot = await getDocs(collection(db, "guests"));
    const employees = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setEmployees(employees);
  };

  useEffect(() => {
    getGuests();
  }, []);

  const handleEdit = (id) => {
    const [employee] = employees.filter((employee) => employee.id === id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const [employee] = employees.filter((employee) => employee.id === id);

        deleteDoc(doc(db, "guests", id));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const employeesCopy = employees.filter(
          (employee) => employee.id !== id
        );
        setEmployees(employeesCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
            userEmail={userEmail}
            userName={userName}
          />
          <Table
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
          getGuests={getGuests}
        />
      )}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
          getGuests={getGuests}
        />
      )}
    </div>
  );
};

export default Dashboard;
