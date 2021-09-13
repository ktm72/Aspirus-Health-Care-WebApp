import { BrowserRouter as Router,Route } from 'react-router-dom';
import './App.css';
import Login from './components/PatientManagement/Login/Login';
import Cart from './components/CartManagement/Cart';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/patient/login" exact component={Login}/>
          <Route path="/cart/:id/:type" exact component={Cart}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
