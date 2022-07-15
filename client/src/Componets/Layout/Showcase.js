import React from "react";
import { useSelector } from "react-redux";

const Showcase = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const { name } = userInfo;

  return (
    <section className="showcase">
      <h1 className="container heading">
        Welcome to the WokeF<i class="fa-solid fa-dumbbell"></i>t{" "}
        <em>{userInfo ? userInfo.name : " "}</em>
        {/* <em>name</em> */}
      </h1>
    </section>
  );
};

export default Showcase;
