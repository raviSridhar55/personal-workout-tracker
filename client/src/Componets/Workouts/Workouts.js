import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Layout/Rating";
import weight from "../../img/weight.png";
import cardio from "../../img/cardio.png";
import exercise from "../../img/exercise.png";

const Workouts = ({ workout }) => {
  const { name, _id, seller, category, rating } = workout;

  return (
    // homepage workout Cards
    <div className="card ">
      <div className="card-img">
        {category === "cardio" ? (
          <img src={cardio} alt="dum" />
        ) : category === "Weight" ? (
          <img src={weight} alt="dum" />
        ) : (
          <img src={exercise} alt="dum" />
        )}
      </div>
      <h4
        className="text-center bg-gray br-round"
        style={{ textTransform: "capitalize" }}
      >
        <Link to={`/workout/${_id}`}>{name}</Link>
      </h4>
      <center>
        <p>
          <label htmlFor="Seller">Trainer: </label>
          {seller}
        </p>
        <p style={{ textTransform: "capitalize" }}>{category}</p>
        {/* changed the layout of the price and gave price tag */}

        <p>
          Difficulty: <Rating value={rating} />{" "}
        </p>
      </center>
    </div>
  );
};

export default Workouts;
