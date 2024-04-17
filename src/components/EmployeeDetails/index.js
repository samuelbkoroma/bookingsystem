import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const componentRef = useRef();
  const { state: employee } = location;

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const downloadPDF = () => {
    const printContent = componentRef.current;
    const pageHeight = printContent.clientHeight;
    const pageWidth = printContent.clientWidth;

    const pdf = new jsPDF("p", "pt", [pageWidth, pageHeight]);
    pdf.html(printContent, {
      callback: (pdf) => {
        pdf.save("employee_details.pdf");
      },
    });
  };

  return (
    <div>
      <button onClick={handleBackClick}>Back</button>
      <button onClick={handlePrint}>Print</button>
      <button onClick={downloadPDF}>Download PDF</button>
      <div ref={componentRef}>
        <h2>Employee Details</h2>
        {employee && (
          <>
            <p>Name: {employee.name}</p>
            <p>Phone No: {employee.phoneNo}</p>
            <p>ID Number: {employee.idNumber}</p>
            <p>Email: {employee.email}</p>
            <p>Cost: ${employee.cost}</p>
            <p>Room Number: {employee.roomNo}</p>
            <p>Number of Guests: {employee.guestNo}</p>
            <p>Entry Date: {employee.entryDate}</p>
            <p>Leave Date: {employee.leaveDate}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeeDetails;
