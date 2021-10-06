import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from 'axios';
import './UpdateProfile.css';

function UpdateProfile(props) {
    const [firstname,setFirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [bloodPressure, setBloodPressure] = useState("");
    const [sugarLevel, setSugarLevel] = useState("");
    const [userImg, setUserImg] = useState("");
    const bloodGroups = [
        { value: 'A-', label: 'A-',},
        { value: 'O+', label: 'O+',},
        { value: 'B+', label: 'B+',},
        { value: 'AB+', label: 'AB+',},
        { value: 'A-', label: 'A-',},
        { value: 'O-', label: 'O-',},
        { value: 'B-', label: 'B-',},
        { value: 'AB-', label: 'AB-',},
    ];

    const history = useHistory();
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [previewSource, setPreviewSource] = useState();

    //fetching user data
    useEffect(()=>{
        async function fetchUser(){
            await axios.get(`http://localhost:8070/patient/${props.match.params.id}`).then((res)=>{
                setFirstName(res.data.result.firstname)
                setLastName(res.data.result.lastname)
                setEmail(res.data.result.email)
                setPhone(res.data.result.phone)
                setAddress(res.data.result.address)
                setHeight(res.data.result.height)
                setWeight(res.data.result.weight)
                setBloodGroup(res.data.result.bloodGroup)
                setBloodPressure(res.data.result.bloodPressure)
                setSugarLevel(res.data.result.sugarLevel)
                setUserImg(res.data.result.imgUrl)
            }).catch((error)=>{
                alert("Failed to fetch user data")
            })
        }
        fetchUser()
    },[props]);

    //handling the image uploading
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(event.target.value);
    };


    //display a preview of uploaded image
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    //update the user
    async function Update(event){

        event.preventDefault();

        let imgUrl

        if(previewSource){
            const formData = new FormData();
            formData.append("file", selectedFile) 
            formData.append("upload_preset", "patient_pictures")

            try {
                await axios.post("https://api.cloudinary.com/v1_1/aspirushealthcare/image/upload", formData).then((res) =>{
                    imgUrl = res.data.secure_url
                })
            } catch (error) {
                alert(error)
            }
        }

        const updatedPatient = {firstname,lastname,email,phone,address,height,weight,bloodGroup,bloodPressure,sugarLevel, imgUrl}

        //header with authorization token
        const config = {
            headers: {
                "content-Type": "application/json",
                Authorization: `${localStorage.getItem("patientAuthToken")}`,
            }
        };

        try {
            await axios.put(`http://localhost:8070/patient/updateprofile/${props.match.params.id}`,updatedPatient, config);
                alert("Updated Successfully")
                history.push('/patient/profile')
        } catch (error) {
            if(error.response.status === 401){
                alert("Authentication failed. Please Sign In again")
                history.push('/patient/signin')
            } else{
                alert("Updating Failed")
            }
        }    
    }

    return (
        <div className="container" align="center">
            <div className="row">
                <div className="col-1">
                </div>
                 <div className="col-11">
                    <div className="pb-2 px-5 d-flex align-items-center justify-content-between">
                        <h2>Update Profile</h2>
                    </div>
                </div>
            </div>
            <div className="">
                <form onSubmit={Update} encType="multipart/form-data" className="boxUpdate">
                    <div className="row">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput
                                            type="text" id="firstname" placeholder="First Name" required fullWidth
                                            value={firstname}
                                            onChange={(event)=> {setFirstName(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput  
                                            type="text" id="lastname" placeholder="Last Name" required fullWidth
                                            value={lastname}
                                            onChange={(event)=> {setLastName(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-5 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="tel" id="phone" placeholder="phone" required fullWidth
                                            value={phone}
                                            onChange={(event)=> {setPhone(event.target.value)}}
                                            inputProps={{style: {padding: 12}, pattern: "[0-9]{10}" }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-7 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput  
                                            type="email" id="email" placeholder="Email" required fullWidth
                                            value={email}
                                            onChange={(event)=> {setEmail(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="address" placeholder="Address" required fullWidth
                                            value={address}
                                            onChange={(event)=> {setAddress(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="form-group">
                                        <TextField 
                                            id="bloodGroup"
                                            select
                                            SelectProps={{
                                                native: true,
                                            }}
                                            variant="outlined"
                                            fullWidth
                                            value={bloodGroup}
                                            onChange={(event)=> {setBloodGroup(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        >
                                        {bloodGroups.map((option) => (
                                            <option key={option.value} value={option.value}>
                                            {option.label}
                                            </option>
                                        ))}
                                        </TextField>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="height" placeholder="Height" fullWidth
                                            value={height}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    m
                                                </InputAdornment>
                                            }
                                            onChange={(event)=> {setHeight(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                            label="Blood Pressure"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="weight" placeholder="Weight" fullWidth
                                            value={weight}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    kg
                                                </InputAdornment>
                                            }
                                            onChange={(event)=> {setWeight(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="bloodPressure" required placeholder="Blood Pressure" fullWidth
                                            value={bloodPressure}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    mm/Hg
                                                </InputAdornment>
                                            }
                                            onChange={(event)=> {setBloodPressure(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="form-group">
                                        <OutlinedInput 
                                            type="text" id="sugarLevel" required placeholder="Sugar Level" fullWidth
                                            value={sugarLevel}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    mg/dL
                                                </InputAdornment>
                                            }
                                            onChange={(event)=> {setSugarLevel(event.target.value)}}
                                            inputProps={{style: {padding: 12}}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                            <div>
                                { previewSource  ?
                                    <img src={previewSource} alt="preview" className="previewImg"/>
                                : userImg === ""? 
                                    <img src="/images/avatar.jpg" alt="preview" className="previewImg"/>
                                :
                                    <img src={`${userImg}`} className="previewImg" alt="profile pic"/>
                                }
                                <div className="form-group">
                                    <label htmlFor="profilepic">
                                        <input
                                            style={{ display: 'none' }}
                                            id="profilepic"
                                            name="profilepic"
                                            type="file"
                                            onChange={handleFileInputChange}
                                            value={fileInputState}
                                        />

                                        <Button color="primary" variant="contained" component="span">
                                            <AddAPhotoIcon/> &nbsp; Upload Profile Picture
                                        </Button>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>   
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <input className="form-submit-btn mb-0" type="submit" value="Update" />
                            </div> 
                        </div>
                    </div> 
                </form>     
            </div>                    
        </div>
    )
}

export default UpdateProfile
