import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Workouts from "../Workouts/Workouts";
import { listWorkout } from "../../action/workoutAction";
import Loader from "../Layout/Loader";
import Pagination from "../Layout/Pagination";
import { useParams } from "react-router";

const WorkoutScreen = () => {
  // const [workouts, setWorkouts] = useState([]);
  let { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [woPerPage] = useState(8);

  const dispatch = useDispatch();

  const workoutList = useSelector((state) => state.workoutList);

  const { loading, error, workouts } = workoutList;

  useEffect(() => {
    dispatch(listWorkout(keyword));
  }, [dispatch, keyword]);

  console.log(workouts);

  const indexOfLastWO = currentPage * woPerPage;
  const indexOfFistWO = indexOfLastWO - woPerPage;
  const currentWorkouts =
    workouts && workouts.slice(indexOfFistWO, indexOfLastWO);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log(currentWorkouts);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <div className=" grid-4">
          {currentWorkouts &&
            currentWorkouts.map((workout) => (
              <Workouts key={workout.id} workout={workout} />
            ))}
        </div>
      )}
      <div className="m-3">
        <Pagination
          woPerPage={woPerPage}
          totalWo={workouts && workouts.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default WorkoutScreen;
