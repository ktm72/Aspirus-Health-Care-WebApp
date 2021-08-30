import { BrowserRouter as Router,Route } from 'react-router-dom';
import './App.css';
import PatientSignIn from './components/PatientManagement/SignIn/SignIn';
import PatientSignUp from './components/PatientManagement/SignUp/SignUp';
import ForgotPassword from './components/PatientManagement/ForgotPassword/ForgotPassword';
import ResetPassword from './components/PatientManagement/ResetPassword/ResetPassword';
import Profile from './components/PatientManagement/Profile/Profile';
import UpdateProfile from './components/PatientManagement/UpdateProfile/UpdateProfile'


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/patient/signin" exact component={PatientSignIn} />
          <Route path="/patient/signup" exact component={PatientSignUp} />
          <Route path="/patient/forgotpassword" exact component={ForgotPassword} />
          <Route path="/patient/resetpassword" exact component={ResetPassword} />
          <Route path="/patient/profile" exact component={Profile} />
          <Route path="/patient/update/profile" exact component={UpdateProfile} />
        </div>
      </Router>
    </div>
  );
}

export default App;
