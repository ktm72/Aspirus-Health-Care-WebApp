import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router';
import axios from 'axios';
import './UpdateProduct.css'
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { TextField } from '@material-ui/core';



function UpdateProduct(props){
    const [name,setName]= useState("");
    const [description,setDescription]= useState("");
    const [price,setPrice]= useState("");
    const [type,setType]= useState("");
    const history=useHistory();
    const [previewSource, setPreviewSource] = useState();

     //handling the image uploading
     const handleFileInputChange = (event) => {
        const file = event.target.files[0]
        previewImage(file);
    };

    //display a preview of uploaded image
    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            setPreviewSource(reader.result)
        }
    }
    
    useEffect(()=>{
      async function fetchproduct(){
        await axios.get(`http://localhost:8070/product/item/${props.match.params.id}`).then((res)=>{
           setName(res.data.product.name)
           setDescription(res.data.product.description)
           setPrice(res.data.product.price)
           setType(res.data.product.type)
        }).catch((error)=>{
          alert("Failed to fetch item data")
        })
      }
      fetchproduct()
    },[props]);
      
    async function Update(event){

        event.preventDefault()    

        const updatedproduct = {name,description,price,type}

        const config = {
          headers: {
            "content-Type": "application/json",
          }
        };
        
        try {
          await axios.put(`http://localhost:8070/product/update/${props.match.params.id}`,updatedproduct, config);
          alert("Product Updated Successfully")
          history.push('/pharmacy/items')
        } catch (error) {
          alert("Product Updating Failed")
        }
    } 

    return (
        <div className="container" align="center" >
            <div className="row">
                <div className="col-12">
                    <div className="pb-2 px-3 d-flex flex-wrap align-items-center justify-content-between">
                        <h2>Update Product</h2>
                    </div>
                </div>
            </div>
            <div className="update_product">
                <form onSubmit={Update} className="updateProduct">
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-md-8 mb-4">
                                    <div className="form-name">
                                        <OutlinedInput
                                            type="text" id="name" placeholder="Product Name" 
                                            required fullWidth 
                                            value={name}
                                            onChange={(event)=> {setName(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div> 
                                    <div className="col-md-8 mb-4">
                                        <div className="form-price">
                                            <OutlinedInput 
                                                type="price" id="price" placeholder="Product Price"
                                                required fullWidth value={price}
                                                onChange={(event)=> {setPrice(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                </div>  
                                <div className="col-md-3 mb-2">    
                                    <div className="form-type">
                                        <OutlinedInput 
                                            type="type" id="type" placeholder="Type"
                                            required fullWidth value={type}
                                            onChange={(event)=> {setType(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <br></br>                                   
                                    <div className="col-md-10 mb-4">
                                        <div className="form-description">
                                            <TextField
                                                multiline rows={5}
                                                id="description" placeholder="Product Description" 
                                                required fullWidth variant="outlined" value={description}
                                                onChange={(event)=> {setDescription(event.target.value)}}
                                                inputProps={{style: {padding: 12}}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-md-12 mb-4">
                                    <div className="form-group" >
                                    <div>
                                                <label><h6>Type</h6></label>
                                            </div>
                                        <div className="form-check form-check-inline">
                                                <input 
                                                    className="form-check-input" type="radio" name="Type" id="OTC" 
                                                    value={type.OTC}
                                                    onChange={(event)=> {setType(event.target.value)}}
                                                />
                                                <label className="form-check-label" for="OTC">
                                                    OTC
                                                </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                                <input 
                                                    className="form-check-input" type="radio" name="Type" id="Non-OTC" 
                                                    value={type.Non_OTC}
                                                    onChange={(event)=> {setType(event.target.value)}}
                                                />
                                                <label className="form-check-label" for="Non-OTC">
                                                    Non-OTC
                                                </label>
                                            
                                        
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <div>
                                {previewSource ? 
                                    <img src={previewSource} alt="preview" className="previewImgProduct"/>
                                :
                                    <img src="/images/product.jpg" className="updatePreviewImgProduct" alt="product pic"/>
                                }
                                <div className="form-group">
                                    <label htmlFor="productImg">
                                        <input
                                            style={{ display: 'none' }}
                                            id="productImg"
                                            name="productImg"
                                            type="file"
                                            onChange={handleFileInputChange}
                                        />
                                        <Button color="primary" variant="contained" component="span">
                                            <AddAPhotoIcon/> &nbsp; Update Image
                                        </Button>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input className="form-submit-btn" type="submit" value="Update Product" />  
                            </div>
                        </div>
                    </div>   
                </form>             
            </div>                    
        </div> 
    )
}
export default UpdateProduct
