import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../action/userAction";

const Navbar = ({ title1, icon, title2 }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const onLogout = () => {
    dispatch(logout());
  };

  const authLinks = (
    <Fragment>
      {userInfo && userInfo.isAdmin ? (
        <li>
          <Link to="/admin/userlist">Users</Link>
          <Link to="/admin/workoutList">Workouts </Link>
          {/* <Link to="/admin/ordertList">Orders</Link> */}
        </li>
      ) : (
        <li>
          <Link to="/profile">{userInfo && userInfo.name}</Link>
        </li>
      )}
      <li>
        <a href="#!" onClick={onLogout}>
          <span className="hide-sm"> Logout</span>
          <i className="fas fa-sign-out-alt" />
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar bg-black ">
      <Link to="/">
        <h1>
          {title1}
          <i className={icon}></i>
          {title2}
        </h1>
      </Link>
      <ul>{userInfo ? authLinks : guestLinks}</ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title1: "Fit",
  icon: "fa-solid fa-dumbbell",
  title2: "Bit",
};

Navbar.propTypes = {
  title1: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title2: PropTypes.string.isRequired,
};

export default Navbar;
