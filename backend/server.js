const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const PatientRouter = require("./routes/patientrouter");
const ReviewRouter=require("./routes/reviewrouter.js");
const PaymentRouter=require("./routes/paymentrouter.js");

const app = express();

//defining a port to run the application
//use port 8080 or use any other port if the 8070 is unavailable 
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

//getting the database url
const URL = process.env.MONGODB_URL;

//connect to database url with the given options
mongoose.connect(URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

//database connection
const connection = mongoose.connection;
connection.once("open", function() {
    console.log("Aspirus Health Care db connection success");
}); 

//when http://localhost:8080/patient ran it will execute patientrouter.js file
app.use("/patient",PatientRouter);
//when http://localhost:8080/review ran it will execute reviewrouter.js file
app.use("/review",ReviewRouter);
//when http://localhost:8080/payment ran it will execute paymentrouter.js file
app.use("/payment",PaymentRouter);

//running the app in previously defined port
const server = app.listen(PORT,() =>{
    console.log(`Server is up and running on: ${PORT}`);
})

//if the server crashed show it simply and stop the server
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged error: ${error}`);
    server.close(() => process.exit(1));
})
