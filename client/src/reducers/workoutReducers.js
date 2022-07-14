import {
  WORKOUT_LIST_FAIL,
  WORKOUT_LIST_REQUEST,
  WORKOUT_LIST_SUCCESS,
  WORKOUT_DETAIL_REQUEST,
  WORKOUT_DETAIL_SUCCESS,
  WORKOUT_DETAIL_FAIL,
  WORKOUT_DELETE_FAIL,
  WORKOUT_DELETE_SUCCESS,
  WORKOUT_DELETE_REQUEST,
  WORKOUT_CREATE_RESET,
  WORKOUT_CREATE_REQUEST,
  WORKOUT_CREATE_SUCCESS,
  WORKOUT_CREATE_FAIL,
  WORKOUT_UPDATE_REQUEST,
  WORKOUT_UPDATE_SUCCESS,
  WORKOUT_UPDATE_FAIL,
  WORKOUT_UPDATE_RESET,
} from "../constants/workoutConstants";

export const workoutListReducer = (state = { workouts: [] }, action) => {
  switch (action.type) {
    case WORKOUT_LIST_REQUEST:
      return { loading: true };
    case WORKOUT_LIST_SUCCESS:
      return { loading: false, workouts: action.payload };
    case WORKOUT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workoutDetailsReducer = (
  state = { workout: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case WORKOUT_DETAIL_REQUEST:
      return { loading: true, ...state };
    case WORKOUT_DETAIL_SUCCESS:
      return { loading: false, workout: action.payload };
    case WORKOUT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workoutDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKOUT_DELETE_REQUEST:
      return { loading: true };
    case WORKOUT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case WORKOUT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workoutCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WORKOUT_CREATE_REQUEST:
      return { loading: true };
    case WORKOUT_CREATE_SUCCESS:
      return { loading: false, success: true, workout: action.payload };
    case WORKOUT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case WORKOUT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const workoutUpdateReducer = (state = { workout: {} }, action) => {
  switch (action.type) {
    case WORKOUT_UPDATE_REQUEST:
      return { loading: true };
    case WORKOUT_UPDATE_SUCCESS:
      return { loading: false, success: true, workout: action.payload };
    case WORKOUT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case WORKOUT_UPDATE_RESET:
      return { workout: {} };
    default:
      return state;
  }
};
