import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listUsers, deleteUser } from "../../action/userAction";
import Loader from "../Layout/Loader";
import Pagination from "../Layout/Pagination";
const UserListScreen = ({ history }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(5);
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);
  console.log(users);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ")) {
      console.log(dispatch(deleteUser(id)));
    }
  };

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFistUser = indexOfLastUser - userPerPage;
  const currentUsers = users && users.slice(indexOfFistUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="listScreen" style={{ minHeight: "82.5vh" }}>
      <h2 className="heading bg-gray">Users</h2>
      {error && <h3>{error}</h3>}
      {loading && <Loader />}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th>EDIT/DELETE</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers &&
            currentUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas-fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <button
                      className="btn bg-light"
                      // style={{ borderRadius: "50%" }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </Link>
                  <button
                    className="btn"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="m-3">
        <Pagination
          woPerPage={userPerPage}
          totalWo={users && users.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default UserListScreen;
