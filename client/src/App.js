import "./App.css";
import { Route } from "react-router-dom";
import StartPage from "./components/StartPage/StartPage";
import Home from "./components/Home/Home";
import PostGame from "./components/PostGame/PostGame";
import GameDetails from "./components/GameDetails/GameDetails";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <StartPage />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/videogame">
        <PostGame />
      </Route>
      <Route exact path="/videogame/:id">
        <GameDetails />
      </Route>
    </div>
  );
}

export default App;
