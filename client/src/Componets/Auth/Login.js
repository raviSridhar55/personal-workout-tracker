import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../action/userAction";
import { useNavigate } from "react-router";
import Loader from "../Layout/Loader";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  // const redirect = location.search ? location.search.split("=")[1] : "/";
  //console.log(location);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  const submitForm = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div className="form-container forms">
      <h1>
        User <span className="text-primary">Login</span>
      </h1>

      {error && <h3>{error}</h3>}
      {loading && <Loader />}
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
      {/* <Loader /> */}
    </div>
  );
};
export default Login;
