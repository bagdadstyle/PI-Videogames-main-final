import React from "react";
import { Link } from "react-router-dom";
import c from "./StartPage.module.css";

const StartPage = () => {
  return (
    <div className={c.start_container}>
      <div className={c.button_container}>
        <Link to="/home">
          <button className={c.button_40}>
            <span>START</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;
