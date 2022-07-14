import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listWorkoutDetails, updateWorkout } from "../../action/workoutAction";
// import { useLocation } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { WORKOUT_UPDATE_RESET } from "../../constants/workoutConstants";

const WorkoutEditScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setcategory] = useState("");
  const [seller, setseller] = useState("");
  const [price, setprice] = useState(0);
  const [rating, setrating] = useState(0);
  const [result, setresult] = useState("");

  //const [setMessage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const workoutDetails = useSelector((state) => state.workoutDetails);
  const { loading, error, workout } = workoutDetails;

  const workoutUpdate = useSelector((state) => state.workoutUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = workoutUpdate;

  let { id } = useParams();
  console.log(id);
  //console.log(userDetails);
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: WORKOUT_UPDATE_RESET });
      navigate("/admin/workoutList");
    } else {
      if (!workout || !workout.name || workout._id !== id) {
        dispatch(listWorkoutDetails(id));
        //console.log("sdfjlakjsdflkj");
      } else {
        setName(workout.name);
        setDescription(workout.description);
        setcategory(workout.category);
        setseller(workout.seller);
        setprice(workout.price);
        setrating(workout.rating);
        setresult(workout.result);

        //console.log("asdjj");
      }
    }
  }, [dispatch, id, navigate, workout, successUpdate]);

  const submitForm = (e) => {
    e.preventDefault();
    //update workout
    dispatch(
      updateWorkout({
        _id: id,
        name,
        description,
        category,
        seller,
        price,
        rating,
        result,
      })
    );
  };
  console.log(name, description, category, seller, rating, price, result);
  return (
    <>
      <Link to="/admin/workoutlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <div className="form-container forms">
        {loadingUpdate && <h3>Loading</h3>}
        {errorUpdate && <h3>{errorUpdate}</h3>}
        {error && <h3>{error}</h3>}
        {/* {success && <h3>Updated Successfully</h3>} */}
        {loading && <h3>Loading</h3>}
        <form className="card-desc form-container" onSubmit={submitForm}>
          <h1>
            Edit <span className="text-primary">workout</span>
          </h1>
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
            <label htmlFor="description">description</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Category</label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">seller</label>
            <input
              type="text"
              name="seller"
              value={seller}
              onChange={(e) => setseller(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">price</label>
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rating">rating</label>
            <input
              type="text"
              name="rating"
              value={rating}
              onChange={(e) => setrating(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="result">result</label>
            <input
              type="text"
              name="result"
              value={result}
              onChange={(e) => setresult(e.target.value)}
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

export default WorkoutEditScreen;
