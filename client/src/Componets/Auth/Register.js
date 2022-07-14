import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { register } from "../../action/userAction";

// import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router";

const Register = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [setMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister; // const location = useLocation(); // const searchParams = new URLSearchParams(location.search); // const redirect = searchParams ? searchParams.get(1) : "/home";

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  const submitForm = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <div className="form-container forms">
      <h1>
        User <span className="text-primary">Register</span>
      </h1>
      {error && <h3>{error}</h3>} {loading && <h3>Loading</h3>}
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="name">Name</label>

          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>

          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>

          <input
            type="password"
            name="password2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>

        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
