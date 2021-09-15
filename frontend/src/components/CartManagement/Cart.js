import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import SubIcon from '@material-ui/icons/Remove';
import { Button, IconButton } from '@material-ui/core';
import { red , orange, green} from '@material-ui/core/colors';
import './cart.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckRound from '@material-ui/icons/TripOrigin';


function PrescriptionCart(props) {
    const [items, setItems] = useState([])
    const [isShopping, setIsShopping] = useState(true)
    const history = useHistory()
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    const config = {
        headers: {
            "content-Type": "application/json"
        }
    };

    useEffect(() => {
        //check Cart type
        if (props.match.params.type === "shopping") {
            setIsShopping(true)
        }
        else if(props.match.params.type === "prescription"){
            setIsShopping(false)
        }
        
        //Fetch Item 
        async function getData() {
            await axios.get(`http://localhost:8070/cart/${props.match.params.id}&${props.match.params.type}`).then((res) => {
                setItems(res.data.result) 
            }).catch((error) => {
              alert("Failed to fetch Items")
            })
        }
        getData();
    }, [props])

    //select all checkbox
    const handleSelectAll = event => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(items.map(item => item._id));
        if (isCheckAll) {
          setIsCheck([]);
        }
    };

    function handleClick(event) {
        const id = event.currentTarget.id;
        const checked = event.currentTarget.checked;
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };

    //Update Item
    async function updateQuantity(id, quantity) {
        try {
            await axios.put(`http://localhost:8070/cart/update/${id}`,{quantity},config)
            history.push(`/cart/${props.match.params.id}/${props.match.params.type}`)
        } catch (error) {
            alert("Update failed")
        }                
    }

    //Increment Quantity
    function increment(id) {
        items.forEach(Item => {
            if(Item._id === id){
                Item.quantity++
                updateQuantity(Item._id,Item.quantity)
            }
        })       
    }

    //Decrease Item
    function decrease(id) {
        items.forEach(Item => {
            if(Item._id === id){
                Item.quantity--
                updateQuantity(Item._id,Item.quantity)
            }
            
        })       
    }

    //delete Item
    async function deleteItem(id){        
        await axios.delete(`http://localhost:8070/cart/delete/${id}`, config).then(() => {
            alert("Item deleted successfully")
            setItems(items.filter(element => element._id !== id))
        }).catch((error) => {
            alert(`Failed to delete the item\n${error.message}`)
        }) 
    } 
     
    return (
        <div>
            <div className="container">
                {/* check cart type */}
                <div className="dropdown">
                    <span>{isShopping ? <h2>Shopping Cart</h2> : <h2>Prescription Cart</h2> }</span>
                    <div className="dropdown-content">
                        {isShopping ? <a href={`/cart/${props.match.params.id}/prescription`}><h5 className="linkColor">Prescription Cart</h5></a> : <a href={`/cart/${props.match.params.id}/Shopping`}><h5 className="linkColor">Shopping Cart</h5></a>}
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 exp"> <br/>
                    {/* select all check box*/}
                        <FormControlLabel
                            control={<Checkbox icon={<CheckRound/>}
                            checkedIcon={<CheckCircleIcon style={{color:orange[600]}}/>}
                            id="selectAll" 
                            name="checkedH" />}
                            onChange={handleSelectAll}
                            checked={isCheckAll}
                            label="Select All"
                        />            
                        <br/><br/>
                    </div>                    
                </div>
                <div className="row">
                    <div className="col-xl-8">
                        {/* map */}
                        {items.map((Item, key) => ( 
                            <div key={key}>                                
                                <div className="cart-box mb-3">                        
                                    <div className="row align-items-center">
                                        <div className="col-sm-1">
                                            {/* Check box for item */}
                                            <FormControlLabel                                                    
                                                checked={isCheck.includes(Item._id)}
                                                control={
                                                    <Checkbox icon={<CheckRound />} 
                                                        checkedIcon={<CheckCircleIcon style={{color:orange[600]}}/>}  name="checkedH" 
                                                        id = {Item._id}
                                                        onChange={handleClick}
                                                    />
                                                }
                                            />
                                        </div>
                                        {/* Product Image */}
                                        <div className="col-sm-2">
                                            <div ><img className="product-Img" src="/images/product.jpg" alt="product"></img></div>
                                        </div>
                                        {/* Product Name and description */}
                                        <div className="col-sm-4">                                                
                                            <h4>{Item.itemid.name}</h4>
                                            <p className="textShort mb-1">{Item.itemid.description}</p>   
                                            <Link to={`/pharmacy/item/${Item._id}`}>Show more</Link>
                                        </div>
                                        <div className="col-sm-2">
                                            <div>
                                                {/* Quantity decrease button */}
                                                <IconButton onClick={()=>decrease(Item._id)}>
                                                    <SubIcon style={{fontSize:"small"}}></SubIcon>
                                                </IconButton>

                                                {/* Quantity */}
                                                <Input type="text" name="quantity" className="quantity" disableUnderline margin="dense" readOnly value={(Item.quantity)} min="1" max="100"/>
                                                
                                                {/* Quantity decrease button */}
                                                <IconButton onClick={()=>increment(Item._id)}>
                                                    <AddIcon style={{fontSize:"small"}}></AddIcon>
                                                </IconButton>
                                            </div>
                                        </div>
                                        {/* Price */}
                                        <div className="col-sm-2">
                                            LKR {Item.itemid.price}
                                        </div>
                                        <div className="col-sm-1">
                                            <IconButton onClick={()=>deleteItem(Item._id)}>
                                                <DeleteOutlinedIcon fontSize="large"></DeleteOutlinedIcon>
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Order Summary Card */}
                    <div className="col-xl-4" >
                        <div className="cardSummary">
                            <h5>Order Summary</h5>
                                <br/>
                                <div className="row">
                                    {/* Address */}
                                    <div className="col-xl-12">
                                        Address:<p>69/69, Colombo 69, Sri Lanka</p>
                                    </div>
                                    <hr/>
                                    <div className="col-xl-7">
                                        <p>Total</p>
                                    </div>
                                    {/* Total Price */}
                                    <div className="col-xl-5">
                                        <h5>LKR 200000.00</h5>
                                    </div>
                                    {/* Checkout Button */}
                                    <Button disableElevation style={{backgroundColor:red[500]}} variant="contained" color="secondary">
                                    <b>Checkout</b>
                                    </Button>
                                </div>                                
                        </div>
                        <div>
                            {/* Report Generate Button  */}
                            <center>
                            <Button variant="contained" className="mb-4" disableElevation size="large"
                                style={{ backgroundColor: green[400], color: 'white' }} endIcon={<CloudDownloadIcon/>}>
                                Generate Report
                            </Button>
                            </center>
                        </div>
                    </div>
                </div>        
            </div>               
        </div>
    )
}
export default PrescriptionCart
