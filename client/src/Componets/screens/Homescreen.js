import React from "react";
import Searchbox from "../Layout/Searchbox";
import Showcase from "../Layout/Showcase";
import WorkoutScreen from "./WorkoutScreen";

const Homescreen = () => {
  return (
    <div>
      <Showcase />
      <div className="bg-gray">
        <h1 className="text-center my-3 heading">Workouts</h1>
      </div>
      <div className="container">
        <div className="grid-center">
          <Searchbox />
        </div>
      </div>
      <div className="container">
        <WorkoutScreen />
      </div>
    </div>
  );
};

export default Homescreen;
