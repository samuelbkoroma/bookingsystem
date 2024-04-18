import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Table = ({ employees, handleEdit, handleDelete }) => {
  const navigate = useNavigate();

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 100,
      className: "id",
      headerClassName: "header",
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      headerClassName: "header",
    },
    {
      field: "phoneNo",
      headerName: "Phone No",
      width: 150,
      headerClassName: "header",
    },
    {
      field: "idNumber",
      headerName: "Id Number",
      width: 150,
      headerClassName: "header",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      headerClassName: "header",
    },
    {
      field: "cost",
      headerName: "Cost $",
      width: 150,
      headerClassName: "header",
    },
    {
      field: "roomNo",
      headerName: "Room Number",
      width: 150,
      headerClassName: "header",
    },
    {
      field: "guestNo",
      headerName: "Amount of Guest",
      width: 180,
      headerClassName: "header",
    },
    {
      field: "status",
      headerName: "Status",
      width: 180,
      headerClassName: "header",
      renderCell: (params) => {
        const statusValue = params.value;
        const statusColor = statusValue === "Active" ? "green" : "red";

        return (
          <div style={{ color: statusColor, fontWeight: "bold" }}>
            {statusValue}
          </div>
        );
      },
    },
    {
      field: "entryDate",
      headerName: "Entry Date",
      width: 180,
      headerClassName: "header",
    },
    {
      field: "leaveDate",
      headerName: "Leave Date",
      width: 180,
      headerClassName: "header",
    },
    {
      field: "actions",
      headerName: "Actions",
      headerClassName: "header",
      width: 300,
      renderCell: (params) => (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click event from bubbling up
              handleEdit(params.row.id);
            }}
            className="button muted-button"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click event from bubbling up
              handleDelete(params.row.id);
            }}
            className="button muted-button"
          >
            Delete
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click event from bubbling up
              navigate(`/employee/${params.row.id}`, { state: params.row });
            }}
            className="button muted-button"
          >
            View
          </button>
        </>
      ),
    },
  ];

  const getRowClassName = (params) => {
    return "custom-row";
  };

  const rows = employees
    .map((employee) => ({ ...employee, id: employee.id.toString() }))
    .filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

  return (
    <Div>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          getRowClassName={getRowClassName}
        />
      </div>
    </Div>
  );
};

export default Table;

const Div = styled.div`
  .header {
    font-size: 17px;
    font-weight: 800;
    font-family: "Poppins", sans-serif;
    color: #050315;
  }

  .custom-row {
    font-size: 15px;
    font-weight: 500;
    font-family: "Poppins", san-serif;
    
  }
`;
