import React, { useEffect, useState } from "react";
// import { Chart } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { listWorkoutDetails } from "../../action/workoutAction";
import Loader from "../Layout/Loader";
import Rating from "../Layout/Rating";
import Charts from "./Charts";
import LineCharts from "./LineCharts";

const WorkoutDescScreen = () => {
  const [start, setStartTime] = useState();
  const [time, setTime] = useState();
  const [calories, setCalories] = useState();
  const dispatch = useDispatch();

  const workoutDetails = useSelector((state) => state.workoutDetails);
  const { loading, error, workout } = workoutDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const [name, category, seller, description] = workout;

  let { id } = useParams();
  // let { pathname } = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(listWorkoutDetails(id));
  }, [dispatch, id]);

  const startTime = () => {
    const now = new Date();
    setStartTime(now);
    console.log(now);
  };
  const resetTime = () => {
    // const now = new Date();
    setStartTime(0);
    // console.log(now);
  };

  const avgCals = 23;

  const endTime = () => {
    const end = new Date();
    // setStopTime(end);
    console.log(end);
    // console.log(stop);
    const totalseconds = Math.ceil(
      Math.abs(new Date(end) - new Date(start)) / 1000
    );
    setTime(totalseconds);
    const caloriesBurnt = totalseconds * 2;
    setCalories(caloriesBurnt);
  };
  // console.log(totalseconds);

  // console.log(calories);
  console.log("render...");
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <h4>{error}</h4>
      ) : (
        <div style={{ minHeight: "83vh" }}>
          <div className="container p-1">
            <button
              className="btn btn-dark"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          </div>
          <div className="workout-showcase">
            <h1 className="my-3 heading">{workout.name}</h1>
          </div>
          <div className="container my-3">
            <div className="grid-2-3 w-desc-section">
              <div className="w-desc text-center card-desc">
                <div className="heading br-round p-1 bg-gray w-desc text-center">
                  What is this workout??
                </div>
                <p className="lead w-desc-ans">{workout.description}</p>
              </div>
              <div className="w-price-strength card-desc p-1">
                <div className="heading bg-gray br-round">
                  <h3>Price</h3>
                </div>
                <p className="text-center my-1">{workout.price}</p>
                <div className="heading bg-gray br-round">
                  <h3>Category</h3>
                </div>
                <p className="text-center my-1">{workout.category}</p>
                <div className="heading bg-gray br-round">
                  <h3>Trainer</h3>
                </div>
                <p className="text-center my-1">{workout.seller}</p>
                <div className="heading bg-gray br-round">
                  <h3>Difficulty</h3>
                </div>

                <p className="text-center my-1">
                  <Rating value={workout.rating} />
                </p>
              </div>
            </div>
            {!userInfo.isAdmin && (
              <div>
                <div className="grid-2-3">
                  <div className="w-chart">
                    <Charts avgCals={avgCals} calories={calories} />
                  </div>
                  <div className="card-desc w-timer">
                    <div className="timer-btn">
                      <button className="btn btn-success" onClick={startTime}>
                        Start
                      </button>
                      <button className="btn btn-danger" onClick={endTime}>
                        End
                      </button>
                      <button className="btn btn-danger" onClick={resetTime}>
                        Reset
                      </button>
                    </div>

                    <div className="heading bg-gray br-round my-1 ">
                      <h3>Workout Time</h3>
                    </div>
                    <p className="text-center my-1">{time}</p>
                    <div className="heading bg-gray br-round my-1 ">
                      <h3>Calories Burnt per Minute</h3>
                    </div>
                    <p className="text-center my-1">{calories}</p>
                  </div>
                </div>
                <LineCharts />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WorkoutDescScreen;
