import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  workoutListReducer,
  workoutDetailsReducer,
  workoutDeleteReducer,
  workoutCreateReducer,
  workoutUpdateReducer,
} from "./reducers/workoutReducers";
import {
  userLoginReducer,
  userListReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userDetailsReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  workoutList: workoutListReducer,
  workoutDetails: workoutDetailsReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  workoutDelete: workoutDeleteReducer,
  workoutCreate: workoutCreateReducer,
  workoutUpdate: workoutUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
