import axios from "axios";

export const AddToCart = (itemID,id,Price) => {

    const itemid = itemID
    const patientID = id
    const quantity = 1
    const type = "shopping"
    const price = Price

    const cartItem = {itemid, patientID, quantity, type, price}
    const config = {
        headers: {
            "content-Type": "application/json",
            Authorization: `${localStorage.getItem("patientAuthToken")}`
        }
    };

    axios.post("http://localhost:8070/cart/add", cartItem , config).then((res)=>{
        alert("Product Added to Cart")
    }).catch((error)=>{         
        if(error.response.status === 409){
            alert("Product already exists in your cart")
         }else if(error.response.status === 401){
            alert("Please login")
        }
        else{
            alert("Product can't be Added")       
        }        
    })
}