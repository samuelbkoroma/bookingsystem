import React, { useState } from "react";
import Swal from "sweetalert2";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "../Login/login.css";

const Register = ({ setIsAuthenticated, setUserEmail, setUserName }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      await setDoc(doc(db, "users", userId), {
        name: name,
        email: email,
      });
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          setIsAuthenticated(true);
          setUserEmail(email);
          setUserName(name);
          navigate("/dashboard", { replace: true });
          Swal.fire({
            icon: "success",
            title: "Successfully Registered",
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } catch (error) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Incorrect email or password.",
            showConfirmButton: true,
          });
        },
      });
    }
  };

  return (
    <div className="small-containers">
      <div>
        <img src="login.png" alt="login" className="login-img" />
      </div>
      <form onSubmit={handleRegister} className="form">
        <img src="bookinglogo.jpg" alt="" className="bklogo" />
        <span className="ht-text-head">Berakah Hotel</span>
        <p className="ht-text">Welcome to Berakah Hotel's Admin Portal</p>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          style={{ marginTop: "12px", marginRight: "12px" }}
          type="submit"
          value="Register"
          name="Register"
          className="login-btn"
        />
        <br />
        <div className="signup-link">
          <p>Already have an account</p>
          <Link className="register-link" to="/">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
