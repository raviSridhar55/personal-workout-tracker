import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { WORKOUT_CREATE_RESET } from "../../constants/workoutConstants";
import { useNavigate } from "react-router";
import {
  listWorkout,
  deleteWorkout,
  createWorkout,
} from "../../action/workoutAction";
import Pagination from "../Layout/Pagination";
const WorkoutListScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [woPerPage] = useState(5);

  const dispatch = useDispatch();

  const workoutList = useSelector((state) => state.workoutList);
  const { workouts } = workoutList;

  const workoutCreate = useSelector((state) => state.workoutCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    workout: createdWorkout,
  } = workoutCreate;

  const workoutDelete = useSelector((state) => state.workoutDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = workoutDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: WORKOUT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/workout/${createdWorkout._id}/edit`);
    } else {
      dispatch(listWorkout());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdWorkout,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ")) {
      // DELETE WORKOUT
      console.log(dispatch(deleteWorkout(id)));
    }
  };

  const createWorkoutHandler = () => {
    //create product
    dispatch(createWorkout());
  };

  const indexOfLastWO = currentPage * woPerPage;
  const indexOfFistWO = indexOfLastWO - woPerPage;
  const currentWorkouts =
    workouts && workouts.slice(indexOfFistWO, indexOfLastWO);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(workouts);

  return (
    <div className="workoutScreen" style={{ minHeight: "83vh" }}>
      <div className="row align-items-center ">
        <div className="col">
          <h1 className="heading bg-gray text-center">Workouts</h1>
        </div>
        <div className="col">
          <button className="btn  m-3" onClick={createWorkoutHandler}>
            <i className="fas fa-plus"></i> create workout
          </button>
        </div>
      </div>
      {errorDelete && <h3>{errorDelete}</h3>}
      {loadingDelete && <h3>loadingDelete</h3>}
      {errorCreate && <h3>{errorCreate}</h3>}
      {loadingCreate && <h3>loadingCreate</h3>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>CATEGORY</th>
            <th>TRAINER</th>
            <th>EDIT/DELETE</th>
          </tr>
        </thead>
        <tbody>
          {currentWorkouts &&
            currentWorkouts.map((workout) => (
              <tr key={workout._id}>
                <td style={{ textTransform: "capitalize" }}>{workout._id}</td>
                <td style={{ textTransform: "capitalize" }}>{workout.name}</td>
                <td style={{ textTransform: "capitalize" }}>
                  {workout.category}
                </td>
                <td style={{ textTransform: "capitalize" }}>
                  {workout.seller}{" "}
                </td>
                <td>
                  <Link to={`/admin/workout/${workout._id}/edit`}>
                    <button className="btn bg-light">
                      <i className="fas fa-edit"></i>
                    </button>
                  </Link>
                  <button
                    className="btn"
                    onClick={() => deleteHandler(workout._id)}
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
          woPerPage={woPerPage}
          totalWo={workouts && workouts.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default WorkoutListScreen;
