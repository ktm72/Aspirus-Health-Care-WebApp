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
import DoctorLogin from './components/DoctorManagement/DoctorLogin/DoctorLogin';
import DoctorSignUp from './components/DoctorManagement/DoctorSignUp/DoctorSignUp';
import DoctorProfile from './components/DoctorManagement/DoctorProfile/DoctorProfile';
import DoctorUpdate from './components/DoctorManagement/DoctorUpdateProfile/DoctorUpdate';
import DoctorPrivateRoute from './Routes/DoctorPrivateRoute';
import AddPrescription from './components/PrescriptionManagement/Add/Add';
import PrescriptionHistory from './components/PrescriptionManagement/History/History';
import UpdatePrescription from './components/PrescriptionManagement/Update/Update';
import AddProducts from './components/PharmacyManagement/AddProduct/AddProducts'
import Items from './components/PharmacyManagement/Items/Items'
import SingleItem from './components/PharmacyManagement/SingleItem/SingleItem'
import UpdateProduct from './components/PharmacyManagement/UpdateProduct/UpdateProduct'
import AddPayment from './components/PaymentManagement/AddPayment/AddPayment';
import AllPayments from './components/PaymentManagement/AllPayments/AllPayments';
import CreateReview from './components/ReviewManagement/CreateReview/CreateReview';
import DisplayReview from './components/ReviewManagement/DisplayReview/DisplayReview';
import updateReview from './components/ReviewManagement/UpdateReview/UpdateReview';
import Footer from './components/Footer/Footer';
import Homepage from './components/Home/Homepage';

function App() {
  return (
    <div className="App">
     
      <Router>
        <div>
            <Header/>
            <Route path="/" exact component={Homepage} />
            <Route path="/patient/signin" exact component={PatientSignIn} />
            <Route path="/patient/signup" exact component={PatientSignUp} />
            <Route path="/patient/forgotpassword" exact component={PatientForgotPassword} />
            <Route path="/patient/resetpassword" exact component={PatientResetPassword} />
            <PatientPrivateRoute path="/patient/profile" exact component={PatientProfile} />
            <PatientPrivateRoute path="/patient/updateprofile/:id" exact component={PatientUpdateProfile} />
            <Route path="/doctor/signin" exact component={DoctorLogin}/>  
            <Route path="/doctor/signup" exact component={DoctorSignUp}/>  
            <DoctorPrivateRoute path="/doctor/profile" exact component={DoctorProfile}/>
            <DoctorPrivateRoute path="/doctor/update/:id" exact component={DoctorUpdate}/> 
            <PatientPrivateRoute path="/prescription/history/:id" exact component={PrescriptionHistory} />
            <DoctorPrivateRoute path="/prescription/add" exact component={AddPrescription} />
            <DoctorPrivateRoute path="/prescription/update/:id" exact component={UpdatePrescription} />  
            <Route path="/pharmacy/addProduct" exact component={AddProducts}/>
            <Route path="/pharmacy/items" exact component={Items}/>
            <Route path="/pharmacy/item/:id" exact component={SingleItem}/>
            <Route path="/pharmacy/item/update/:id" exact component={UpdateProduct}/>
            <Route path= "/patient/payment" exact component= {AddPayment}/>
            <Route path="/patient/payment/:patientID" exact component = {AllPayments}/>
            <Route path="/patient/review" exact component={CreateReview}/>
            <Route path="/patient/review/:patientID" exact component = {DisplayReview}/>
            <Route path="/patient/review/update/:id" exact component = {updateReview}/>
            <Footer/>
        </div>
      </Router>
    </div>
  );
}

export default App;
