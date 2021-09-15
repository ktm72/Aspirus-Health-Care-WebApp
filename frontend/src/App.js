import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Login from './components/PatientManagement/Login/Login';
import AddPrescription from './components/PrescriptionManagement/Add/Add';
import PrescriptionHistory from './components/PrescriptionManagement/History/History';
import UpdatePrescription from './components/PrescriptionManagement/Update/Update';
import ViewOne from './components/PrescriptionManagement/View/View';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/patient/login" exact component={Login} />
          <Route path="/prescription/history/:id" exact component={PrescriptionHistory} />
          <Route path="/prescription/add" exact component={AddPrescription} />
          <Route path="/prescription/update/:id" exact component={UpdatePrescription} /> 
          <Route path="/prescription/view/:id" exact component={ViewOne} />
        </div>
      </Router>
    </div>
  );
}

export default App;
