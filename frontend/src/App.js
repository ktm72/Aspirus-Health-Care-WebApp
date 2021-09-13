import { BrowserRouter as Router,Route } from 'react-router-dom';
import './App.css';
import AddPayment from './components/PaymentManagement/AddPayment/AddPayment';
import AllPayments from './components/PaymentManagement/AllPayments/AllPayments';
import CreateReview from './components/ReviewManagement/CreateReview/CreateReview';
import DisplayReview from './components/ReviewManagement/DisplayReview/DisplayReview';
import updateReview from './components/ReviewManagement/UpdateReview/UpdateReview';

function App() {
  return (
    <div className="App">
     
      <Router>
        <div>
          <Route path= "/patient/payment" exact component= {AddPayment}/>
          <Route path="/patient/payment/:patientID" exact component = {AllPayments}/>
          <Route path="/patient/review" exact component={CreateReview}/>
          <Route path="/patient/review/:patientID" exact component = {DisplayReview}/>
          <Route path="/patient/review/update/:id" exact component = {updateReview}/>
         
        </div>
      </Router>
    </div>
  );
}

export default App;
