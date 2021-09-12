import { BrowserRouter as Router,Route } from 'react-router-dom';
import './App.css';
import Login from './components/PatientManagement/Login/Login';
import AddProducts from './components/PharmacyManagement/AddProduct/AddProducts'
import Items from './components/PharmacyManagement/Items/Items'
import SingleItem from './components/PharmacyManagement/SingleItem/SingleItem'
import UpdateProduct from './components/PharmacyManagement/UpdateProduct/UpdateProduct'

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path="/patient/login" exact component={Login}/>
          <Route path="/pharmacy/addProduct" exact component={AddProducts}/>
          <Route path="/pharmacy/items" exact component={Items}/>
          <Route path="/pharmacy/item/:id" exact component={SingleItem}/>
          <Route path="/pharmacy/item/update/:id" exact component={UpdateProduct}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
