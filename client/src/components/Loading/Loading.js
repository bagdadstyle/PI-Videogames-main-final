import React from "react";
import c from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={c.loading_container}>
    <div className={c.lds_ring}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    </div>
  );
};

export default Loading;