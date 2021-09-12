const jwt = require("jsonwebtoken");

//this will check the patient is verified
patientAuth = async (req,res,next) => {
    try {

        let token

        if(!req.headers.authorization)
            res.status(401).json({success: false, message: "No authorization header found"})

        //checking the token type is Patient
        if(req.headers.authorization.startsWith("Patient")){
            //token is an array, this will take the data in the first index
            token = req.headers.authorization.split(" ")[1];
        }
        
        //get data from token
        let decodedData;
        decodedData = jwt.verify(token, process.env.JWT_SECRET);

        //add patient id to request
        req.patientID = decodedData?.id;

        //if all data is valid pass to next step
        next();
    } catch (error) {
        res.status(401).json({success: false, message: "Patient Authentication failed", error: error.message})
    }
}

module.exports = patientAuth;