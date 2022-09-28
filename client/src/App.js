import "./App.css";
import { Route } from "react-router-dom";
import StartPage from "./components/StartPage/StartPage";
import Home from "./components/Home/Home";
import PostGame from "./components/PostGame/PostGame";
import GameDetails from "./components/GameDetails/GameDetails";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={StartPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/videogame" component={PostGame} />
      <Route exact path="/videogame/:id" component={GameDetails} />
    </div>
  );
}

export default App;
