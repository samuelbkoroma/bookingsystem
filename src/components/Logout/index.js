import React from "react";
import Swal from "sweetalert2";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Logging Out",
      text: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            // Successful logout
            Swal.fire({
              timer: 1500,
              showConfirmButton: false,
              willOpen: () => {
                Swal.showLoading();
              },
              willClose: () => {
                navigate("/");
              },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <Div>
      <button className="muted-button" onClick={handleLogout}>
        Logout
      </button>
    </Div>
  );
};

export default Logout;

const Div = styled.div`
  .muted-button {
    padding: 20px;
    background-color: #dedcff;
    border: none;
    outline: none;
    font-size: 17px;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    color: #433bff;
  }
`;
