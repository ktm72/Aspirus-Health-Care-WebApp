import { BrowserRouter as Router,Route } from 'react-router-dom';
import './App.css';
import Login from './components/PatientManagement/Login/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/patient/login" exact component={Login}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
