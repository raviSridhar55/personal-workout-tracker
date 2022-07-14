import "./App.css";
import "./style.css";
import Navbar from "./Componets/Layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homescreen from "./Componets/screens/Homescreen";
import Footer from "./Componets/Layout/Footer";
import Register from "./Componets/Auth/Register";
import Login from "./Componets/Auth/Login";
import WorkoutDescScreen from "./Componets/screens/WorkoutDescScreen";
import UserListScreen from "./Componets/Admin/UserListScreen";
import Dashboard from "./Componets/Auth/Dashboard";
import UserEditScreen from "./Componets/Admin/UserEditScreen";
import WorkoutListScreen from "./Componets/Admin/WorkoutListScreen";
import WorkoutEditScreen from "./Componets/Admin/workoutEditScreen";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar title1="WokeF" title2="t" />
        <Routes>
          <Route exact path="/" element={<Homescreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Dashboard />} />
          <Route path="/admin/userlist" element={<UserListScreen />} />
          <Route path="/admin/workoutlist" element={<WorkoutListScreen />} />
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          <Route path="/workout/:id" element={<WorkoutDescScreen />} />
          <Route path="/search/:keyword" element={<Homescreen />} />

          <Route
            path="/admin/workout/:id/edit"
            element={<WorkoutEditScreen />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
