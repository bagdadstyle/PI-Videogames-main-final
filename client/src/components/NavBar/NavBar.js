import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getVideogamesByName } from "../../actions";
import { Link } from "react-router-dom";
import c from "./NavBar.module.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInput = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getVideogamesByName(name));
  };

  return (
    <div className={c.container_navBar}>
      
      <input
        className={c.input_text}
        type="text"
        placeholder="Search..."
        onChange={(e) => handleInput(e)}
      />
      <input value="Search" type="submit" onClick={(e) => onSubmit(e)} />

      <Link to="/videogame">
        <span>Crear juego</span>
      </Link>
    </div>
  );
};

export default NavBar;
