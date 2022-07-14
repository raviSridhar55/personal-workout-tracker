import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../../action/userAction";
// import { useLocation } from "react-router-dom";
import { USER_UPDATE_RESET } from "../../constants/userConstants";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const UserEditScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  //const [setMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  // const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  // const { success } = userUpdateProfile;

  let { id } = useParams();
  console.log(id);
  console.log(userDetails);
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      console.log("success");
      navigate("/admin/userlist");
    } else {
      if (!user || !user.name || user._id !== id) {
        dispatch(getUserDetails(id));
        //console.log("sdfjlakjsdflkj");
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        console.log("asdjj");
      }
    }
  }, [dispatch, id, successUpdate, navigate, user]);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <div className="form-container forms">
        <h1>
          Update <span className="text-primary">Profile</span>
        </h1>
        {loadingUpdate && <h3>Loading</h3>}
        {errorUpdate && <h3>{errorUpdate}</h3>}
        {error && <h3>{error}</h3>}
        {/* {success && <h3>Updated Successfully</h3>} */}
        {loading && <h3>Loading</h3>}
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
          />
        </div> */}
          <div className="form-group">
            <label htmlFor="checkbox">isAdmin</label>
            <input
              type="checkbox"
              name="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </div>
          <input
            type="submit"
            value="Update"
            className="btn btn-primary btn-block"
          />
        </form>
      </div>
    </>
  );
};

export default UserEditScreen;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserDetails } from "../../action/userAction";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// const UserEditScreen = ({ history }) => {
//   const [name, setName] = useState(" ");
//   const [email, setEmail] = useState(" ");
//   const [isAdmin, setIsAdmin] = useState(false);

//   const dispatch = useDispatch();
//   const userDetails = useSelector((state) => state.userDetails);
//   const { loading, error, user } = userDetails;
//   console.log(user);
//   console.log(loading);
//   console.log(error);
//   let { userId } = useParams();
//   useEffect(() => {
//     if (!user || !user.name || user.id !== userId) {
//       dispatch(getUserDetails(userId));
//     } else {
//       setName(user.name);
//       setEmail(user.email);
//       setIsAdmin(user.isAdmin);
//     }
//   }, [dispatch, userId, user]);
//   return <div>UserEditScreen</div>;
// };

// export default UserEditScreen;

// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { getUserDetails } from "../../action/userAction";
// // import { useParams } from "react-router-dom";
// // import { Link } from "react-router-dom";

// // const UserEditScreen = ({ history }) => {
// //   //const userId = match.params.id;
// //   const [name, setName] = useState(" ");
// //   const [email, setEmail] = useState(" ");
// //   const [isAdmin, setIsAdmin] = useState(false);
// //   //const [setMessage] = useState(null);
// //   const dispatch = useDispatch();
// //   const userDetails = useSelector((state) => state.userDetails);
// //   const { loading, error, user } = userDetails;
// //   console.log(user);
// //   console.log(loading);
// //   console.log(error);
// //   let { userId } = useParams();
// //   useEffect(() => {
// //     if (!user.name || user._id !== userId) {
// //       dispatch(getUserDetails(userId));
// //     } else {
// //       setName(user.name);
// //       setEmail(user.email);
// //       setIsAdmin(user.isAdmin);
// //     }
// //   }, [dispatch, userId, user]);

// //   const submitForm = (e) => {
// //     e.preventDefault();
// //   };

// //   return (
// //     <>
// //       <Link to="/admin/userlist" className="btn btn-light my-3">
// //         Go Back
// //       </Link>
// //       <div className="form-container forms">
// //         <h1>
// //           Update <span className="text-primary">User</span>
// //         </h1>
// //         {error && <h3>{error}</h3>} {loading && <h3>Loading</h3>}
// //         <form onSubmit={submitForm}>
// //           <div className="form-group">
// //             <label htmlFor="name">Name</label>

// //             <input
// //               type="text"
// //               name="name"
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div className="form-group">
// //             <label htmlFor="email">Email Address</label>

// //             <input
// //               type="email"
// //               name="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //             />
// //           </div>

// //           {/* instead of this we want check box for isadmin */}

// //           <div className="form-group">
// //             <label htmlFor="checkbox">isAdmin</label>

// //             <input
// //               type="checkbox"
// //               name="isAdmin"
// //               checked={isAdmin}
// //               onChange={(e) => setIsAdmin(e.target.checked)}
// //             />
// //           </div>

// //           <input
// //             type="submit"
// //             value="Update"
// //             className="btn btn-primary btn-block"
// //           />
// //         </form>
// //       </div>
// //     </>
// //   );
// // };

// // export default UserEditScreen;
