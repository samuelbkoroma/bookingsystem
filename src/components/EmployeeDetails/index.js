import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import styled from "styled-components";

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
    <Div>
      <div>
        <div className="buttons-container">
          <button onClick={handleBackClick}>Back</button>
          <button onClick={handlePrint}>Print</button>
          <button onClick={downloadPDF}>Download PDF</button>
        </div>
        <div ref={componentRef}>
          <h2 className="guesthead">Guest Details</h2>
          {employee && (
            <>
              <p className="titlle">
                Name : <span className="span">{employee.name} </span>{" "}
              </p>
              <p className="titlle">
                Phone No : <span className="span">{employee.phoneNo}</span>{" "}
              </p>
              <p className="titlle">
                ID Number :<span className="span"> {employee.idNumber}</span>{" "}
              </p>
              <p className="titlle">
                Email : <span className="span"> {employee.email} </span>{" "}
              </p>
              <p className="titlle">
                Cost : <span className="span"> ${employee.cost}</span>{" "}
              </p>
              <p className="titlle">
                Room Number : <span className="span"> {employee.roomNo} </span>{" "}
              </p>
              <p className="titlle">
                Number of Guests :{" "}
                <span className="span">{employee.guestNo} </span>{" "}
              </p>
              <p className="titlle">
                Status : <span className="span"> {employee.status}</span>{" "}
              </p>
              <p className="titlle">
                Entry Date : <span className="span"> {employee.entryDate}</span>{" "}
              </p>
              <p className="titlle">
                Leave Date : <span className="span"> {employee.leaveDate}</span>{" "}
              </p>
            </>
          )}
        </div>
      </div>
    </Div>
  );
};

export default EmployeeDetails;

const Div = styled.div`
  margin: 20px;

  .buttons-container {
    display: flex;
    gap: 20px;
  }

  .buttons-container button {
    background: #2f27ce;
    border: none;
    outline: none;
    font-family: "Poppins", sans-serif;
  }

  .guesthead {
    color: #050315;
    text-transform: Capitalize;
    font-size: 50px;
    font-family: "Poppins", sans-serif;
  }

  .span {
    font-size: 20px;
    font-weight: 600;
    font-family: "Poppins", sans-serif;
    color: #050315;
    text-transform: Capitalize;
    margin-left: 15px;
  }

  .titlle {
    font-size: 18px;
    font-weight: 600;
    font-family: "Poppins", sans-serif;
    text-transform: Capitalize;
    margin-left: 15px;
  }
`;
