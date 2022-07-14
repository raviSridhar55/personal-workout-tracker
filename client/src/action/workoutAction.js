import {
  WORKOUT_LIST_REQUEST,
  WORKOUT_LIST_SUCCESS,
  WORKOUT_LIST_FAIL,
  WORKOUT_DETAIL_REQUEST,
  WORKOUT_DETAIL_SUCCESS,
  WORKOUT_DETAIL_FAIL,
  WORKOUT_DELETE_REQUEST,
  WORKOUT_DELETE_SUCCESS,
  WORKOUT_DELETE_FAIL,
  WORKOUT_CREATE_REQUEST,
  WORKOUT_CREATE_SUCCESS,
  WORKOUT_CREATE_FAIL,
  WORKOUT_UPDATE_REQUEST,
  WORKOUT_UPDATE_SUCCESS,
  WORKOUT_UPDATE_FAIL,
} from "../constants/workoutConstants";
import axios from "axios";

export const listWorkout =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: WORKOUT_LIST_REQUEST,
      });

      const { data } = await axios.get(`/api/workouts?keyword=${keyword}`);

      dispatch({
        type: WORKOUT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: WORKOUT_LIST_FAIL,
        payload:
          error.respose && error.respose.data.message
            ? error.respose.data.message
            : error.message,
      });
    }
  };

export const listWorkoutDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: WORKOUT_DETAIL_REQUEST,
    });

    const { data } = await axios.get(`/api/workouts/${id}`);

    dispatch({
      type: WORKOUT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKOUT_DETAIL_FAIL,
      payload:
        error.respose && error.respose.data.message
          ? error.respose.data.message
          : error.message,
    });
  }
};

export const deleteWorkout = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKOUT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/workouts/${id}`, config);

    dispatch({
      type: WORKOUT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: WORKOUT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createWorkout = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKOUT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/workouts`, {}, config);

    dispatch({
      type: WORKOUT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKOUT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateWorkout = (workout) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORKOUT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/workouts/${workout._id}`,
      workout,
      config
    );

    dispatch({
      type: WORKOUT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORKOUT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
