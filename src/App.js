import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home';
import MovieDetail from './components/moviedetail';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/:mname" component={MovieDetail} />
   </Router>
  );
}

export default App;
