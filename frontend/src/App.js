import { BrowserRouter as Router,Route } from 'react-router-dom';
import './App.css';
import DoctorLogin from './components/DoctorManagement/DoctorLogin/DoctorLogin';
import DoctorSignUp from './components/DoctorManagement/DoctorSignUp/DoctorSignUp';
import DoctorProfile from './components/DoctorManagement/DoctorProfile/DoctorProfile';
import DoctorUpdate from './components/DoctorManagement/DoctorUpdateProfile/DoctorUpdate';
import DoctorPrivateRoute from './Routes/DoctorPrivateRoute';


function App() {
  return (
    <div className="App">
      <Router>
        <div> 
          <Route path="/doctor/signin" exact component={DoctorLogin}/>  
          <Route path="/doctor/signup" exact component={DoctorSignUp}/>  
          <DoctorPrivateRoute path="/doctor/profile" exact component={DoctorProfile}/>
          <DoctorPrivateRoute path="/doctor/update/:id" exact component={DoctorUpdate}/> 
        </div>
      </Router>
    </div>
  );
}

export default App;
