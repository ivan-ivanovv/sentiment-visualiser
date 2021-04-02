import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Detailed from "./pages/Detailed.jsx";
import Main from "./pages/Main.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Main} />
        <Route exact path="/details" component={Detailed} />
      </div>
    </Router>
  );
}

export default App;
