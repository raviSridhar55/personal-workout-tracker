import React, { useState } from "react";
import { useNavigate } from "react-router";

const Searchbox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="search-bar">
      <div className="form-control">
        <input
          type="text"
          name="q"
          className="br-round"
          onChange={(e) => setKeyword(e.target.value)}
          id=""
        />
      </div>
      <button type="submit" className="p-2 btn btn-dark br-round">
        Search
      </button>
    </form>
  );
};

export default Searchbox;
