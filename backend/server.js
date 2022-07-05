const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();

app.use(express.static('public'));
//limiting image size to 50mb
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const PatientRouter = require("./routes/patientrouter");
const AdminRouter = require("./routes/adminrouter.js");
const DoctorRouter = require("./routes/doctorrouter");
const AppointmentRouter = require("./routes/appointmentrouter");
const PrescriptionRouter = require("./routes/prescriptionrouter");
const ProductRouter = require("./routes/productrouter");
const CartRouter = require("./routes/cartrouter");
const ReviewRouter = require("./routes/reviewrouter.js");
const PaymentRouter = require("./routes/paymentrouter.js");
const OrderRouter = require("./routes/orderrouter.js");

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

//when http://localhost:8070/patient ran it will execute patientrouter.js file
app.use("/patient",PatientRouter);
//when http://localhost:8070/admin ran it will execute adminrouter.js file
app.use("/admin",AdminRouter);
//when http://localhost:8070/doctor ran it will execute doctorrouter.js file
app.use("/doctor",DoctorRouter);
//when http://localhost:8070/appointment ran it will execute appointmentrouter.js file
app.use("/appointment",AppointmentRouter);
//when http://localhost:8070/prescription ran it will execute prescriptionrouter.js file
app.use("/prescription",PrescriptionRouter);
//when http://localhost:8070/product ran it will execute productrouter.js file
app.use("/product",ProductRouter);
//when http://localhost:8070/cart ran it will execute patientrouter.js file
app.use("/cart",CartRouter);
//when http://localhost:8070/review ran it will execute reviewrouter.js file
app.use("/review",ReviewRouter);
//when http://localhost:8070/payment ran it will execute paymentrouter.js file
app.use("/payment",PaymentRouter);
//when http://localhost:8070/order ran it will execute orderrouter.js file
app.use("/order",OrderRouter);

//defining a port to run the application
//use port 8070 or use any other port if the 8070 is unavailable 
const PORT = process.env.PORT || 8080;

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('../frontend/build'));
}

//running the app in previously defined port
const server = app.listen(PORT,() =>{
    console.log(`Server is up and running on: ${PORT}`);
})

//if the server crashed show it simply and stop the server
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged error: ${error}`);
    server.close(() => process.exit(1));
})
