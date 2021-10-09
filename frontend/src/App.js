import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute';
import PatientPrivateRoute from './Routes/PatientPrivateRoute';
import DoctorPrivateRoute from './Routes/DoctorPrivateRoute';
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
import AllDoctors from './components/DoctorManagement/Doctors/AllDoctors';
import AddPrescription from './components/PrescriptionManagement/Add/Add';
import PrescriptionHistory from './components/PrescriptionManagement/History/History';
import UpdatePrescription from './components/PrescriptionManagement/Update/Update';
import ViewOne from './components/PrescriptionManagement/View/View';
import AddProducts from './components/PharmacyManagement/AddProduct/AddProducts'
import Items from './components/PharmacyManagement/Items/Items';
import SingleItem from './components/PharmacyManagement/SingleItem/SingleItem';
import ProductHistory from './components/PharmacyManagement/ProductHistory/ProductHistory';
import UpdateProduct from './components/PharmacyManagement/UpdateProduct/UpdateProduct';
import Cart from './components/CartManagement/Cart';
import CartReport from './components/CartManagement/Report';
import CartPayment from './components/PaymentManagement/AddPayment/CartPayment';
import AllPayments from './components/PaymentManagement/AllPayments/AllPayments';
import CreateReview from './components/ReviewManagement/CreateReview/CreateReview';
import DisplayReview from './components/ReviewManagement/DisplayReview/DisplayReview';
import updateReview from './components/ReviewManagement/UpdateReview/UpdateReview';
import AddAppointment from './components/AppointmentManagement/AddAppointment';
import ViewAppointment from './components/AppointmentManagement/ViewAppointment';
import DoctorReport from './components/DoctorManagement/DoctorProfile/DoctorReport';
import Footer from './components/Footer/Footer';
import Homepage from './components/Home/Homepage';
import PaymentReport from './components/PaymentManagement/PaymentReport/PaymentReport';
import VideoConference from './components/VideoConference/VideoConference';
import PatientReport from './components/PatientManagement/Report/PatientReport';

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
            <Route path="/patient/passwordreset/:token" exact component={PatientResetPassword} />
            <PatientPrivateRoute path="/patient/profile" exact component={PatientProfile} />
            <PatientPrivateRoute path="/patient/updateprofile/:id" exact component={PatientUpdateProfile} />
            <PatientPrivateRoute path="/patient/report" exact component={PatientReport}/>
            <PatientPrivateRoute path="/channelling" exact component={AllDoctors} />
            <Route path="/doctor/signin" exact component={DoctorLogin}/>
            <Route path="/doctor/signup" exact component={DoctorSignUp}/>  
            <DoctorPrivateRoute path="/doctor/profile" exact component={DoctorProfile}/>
            <DoctorPrivateRoute path="/doctor/update/:id" exact component={DoctorUpdate}/> 
            <DoctorPrivateRoute path ="/doctor/report/:id" exact component={DoctorReport}/> 
            <PrivateRoute path="/prescription/history/:id" exact component={PrescriptionHistory} />
            <PrivateRoute path="/prescription/view/:id" exact component={ViewOne} />  
            <DoctorPrivateRoute path="/prescription/add" exact component={AddPrescription} />
            <DoctorPrivateRoute path="/prescription/update/:id" exact component={UpdatePrescription} />  
            <Route path="/pharmacy/addProduct" exact component={AddProducts}/>
            <Route path="/pharmacy/items" exact component={Items}/>
            <Route path="/pharmacy/product/history" exact component={ProductHistory}/>
            <Route path="/pharmacy/item/:id" exact component={SingleItem}/>
            <Route path="/pharmacy/item/update/:id" exact component={UpdateProduct}/>
            <PatientPrivateRoute path="/cart/:id/:type" exact component={Cart}/>
            <PatientPrivateRoute path="/cart/report/:id/:type" exact component={CartReport}/>
            <PatientPrivateRoute path= "/patient/payment" exact component= {CartPayment}/>
            <PatientPrivateRoute path="/patient/payment/:id" exact component = {AllPayments}/>
            <PatientPrivateRoute path="/patient/payments/report" exact component={PaymentReport}/>
            <PatientPrivateRoute path="/patient/review" exact component={CreateReview}/>
            <PatientPrivateRoute path="/patient/review/:patientID" exact component = {DisplayReview}/>
            <PatientPrivateRoute path="/patient/review/update/:id" exact component = {updateReview}/>      
            <PatientPrivateRoute path="/patient/appointment/:id" exact component={AddAppointment}/>
            <PrivateRoute path="/appointment/:id" exact component={ViewAppointment}/>
            <PrivateRoute path="/video/:id" exact component={VideoConference}/>
            <Footer/>
        </div>
      </Router>
    </div>
  );
}

export default App;
