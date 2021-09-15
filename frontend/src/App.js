import { BrowserRouter as Router,Route } from 'react-router-dom';
import PatientPrivateRoute from './Routes/PatientPrivateRoute';
import './App.css';
import Header from './components/Header/Header'
import PatientSignIn from './components/PatientManagement/SignIn/SignIn';
import PatientSignUp from './components/PatientManagement/SignUp/SignUp';
import PatientForgotPassword from './components/PatientManagement/ForgotPassword/ForgotPassword';
import PatientResetPassword from './components/PatientManagement/ResetPassword/ResetPassword';
import PatientProfile from './components/PatientManagement/Profile/Profile';
import PatientUpdateProfile from './components/PatientManagement/UpdateProfile/UpdateProfile';
import Covid from './components/Home/Covid/Covid';
import AddPrescription from './components/PrescriptionManagement/Add/Add';
import PrescriptionHistory from './components/PrescriptionManagement/History/History';
import UpdatePrescription from './components/PrescriptionManagement/Update/Update';
import ViewOne from './components/PrescriptionManagement/View/View';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
            <Header/> 
            <Route path="/" exact component={Covid} />
            <Route path="/patient/signin" exact component={PatientSignIn} />
            <Route path="/patient/signup" exact component={PatientSignUp} />
            <Route path="/patient/forgotpassword" exact component={PatientForgotPassword} />
            <Route path="/patient/resetpassword" exact component={PatientResetPassword} />
            <PatientPrivateRoute path="/patient/profile" exact component={PatientProfile} />
            <PatientPrivateRoute path="/patient/updateprofile/:id" exact component={PatientUpdateProfile} />
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
