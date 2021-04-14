import { Route, Switch } from "react-router-dom";
import "./App.css";
import Authenticated from "./Components/Authenticated";
// import Home from "./Home";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Authenticated Authenticated>
          <Dashboard />
        </Authenticated>
      </Route>
      <Route exact path="/login">
        <Authenticated nonAuthenticated={true}>
          <Login />
        </Authenticated>
      </Route>
      <Route exact path="*" render={() => "404 Not Found"} />
    </Switch>
  );
}

export default App;
