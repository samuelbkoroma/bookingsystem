// import React from "react";

// const Table = ({ employees, handleEdit, handleDelete }) => {
//   const formatter = new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: null,
//   });

//   return (
//     <div className="contain-table">
//       <table className="striped-table">
//         <thead>
//           <tr>
//             <th>Id</th>
//             <th>Name</th>
//             <th>Phone No</th>
//             <th>Id Number</th>
//             <th>Email</th>
//             <th>Cost</th>
//             <th>Room Number</th>
//             <th>Amount of Guest</th>
//             <th>Entry Date</th>
//             <th>Leave Date</th>

//             <th colSpan={2} className="text-center">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees ? (
//             employees.map((employee, i) => (
//               <tr key={employee.id}>
//                 <td>{employee.id}</td>
//                 <td>{employee.name}</td>
//                 <td>{employee.phoneNo}</td>
//                 <td>{employee.idNumber}</td>
//                 <td>{employee.email}</td>
//                 <td>{formatter.format(employee.cost)}</td>
//                 <td>{employee.roomNo}</td>
//                 <td>{employee.guestNo}</td>
//                 <td>{employee.entryDate} </td>
//                 <td>{employee.leaveDate} </td>
//                 <td className="text-right">
//                   <button
//                     onClick={() => handleEdit(employee.id)}
//                     className="button muted-button"
//                   >
//                     Edit
//                   </button>
//                 </td>
//                 <td className="text-left">
//                   <button
//                     onClick={() => handleDelete(employee.id)}
//                     className="button muted-button"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={7}></td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Table;

import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ employees, handleEdit, handleDelete, handleRowClick }) => {
  // const formatter = new Intl.NumberFormat("en-US", {
  //   style: "currency",
  //   currency: "USD",
  //   minimumFractionDigits: null,
  // });

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "phoneNo", headerName: "Phone No", width: 150 },
    { field: "idNumber", headerName: "Id Number", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "cost",
      headerName: "Cost  $",
      width: 150,
      // valueFormatter: (params) => formatter.format(params.value),
    },
    { field: "roomNo", headerName: "Room Number", width: 150 },
    { field: "guestNo", headerName: "Amount of Guest", width: 180 },
    { field: "entryDate", headerName: "Entry Date", width: 180 },
    { field: "leaveDate", headerName: "Leave Date", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <button
            onClick={() => handleEdit(params.row.id)}
            className="button muted-button"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(params.row.id)}
            className="button muted-button"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  const rows = employees.map((employee) => ({
    ...employee,
    id: employee.id.toString(), // Ensure id is a string
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onRowClick={(params) => handleRowClick(params.row)}
      />
    </div>
  );
};

export default Table;
