import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './components/PatientManagement/Login/Login';
import History from './components/PrescriptionManagement/History/History';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/patient/login" exact component={Login} />
          <Route path="/prescription/history" exact component={History} />
        </div>
      </Router>
    </div>
  );
}

export default App;
