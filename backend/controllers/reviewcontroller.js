const Review=require('../models/Review');

//create a review
exports.createReview = async(req,res) => {
    const{ patientID,feedback } = req.body;
    let today = new Date();
    const date = (today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear());

    try{
        //creating a new review
         await Review.create({patientID, feedback, date})
        
        res.status(200).json({success:true,message:"review added"})
     }catch(error){
         res.status(500).json({message: "unable to create the review",error:error.message});
     }
}

//update review
exports.updateReview = async(req,res)=>{
    let reviewID=req.params.id;
    const{feedback} =req.body;
    let today = new Date();
    const date = (today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear());
    const updateReview={feedback,date}

    try{
        //find review by review ID
        await Review.findByIdAndUpdate(reviewID,updateReview);

        res.status(200).json({message: "review updated"})
    }catch(error){
        res.status(500).json({message:" updating failed",error:error.message});
    }
 }

//delete reviews
exports.deleteReview= async(req,res)=>{

    let reviewID =req.params.id;

    try{
        await Review.findByIdAndDelete(reviewID);

        res.status(200).json({message:"delete successful"});
    }catch(error){
        res.status(500).json({message:"delete unsuccessful",error:error.message});
    }
}
//retrieve all reviews
exports.fetchAll = async(req,res)=>{

    try{
         const reviews =await Review.find().populate({path:'patientID',select:['firstname','lastname','imgUrl']});

         res.status(200).json({success:true,result:reviews});
    }catch(error){
        res.status(500).json({success:false,message:"fetching failed",error:error.message});
    } 

}

//view reviews
exports.viewReviews = async(req,res) => {
    //get patient id
    let patientID = req.params.id;
    try {
        //view reviews
        const reviews = await Review.find({patientID}).populate({path:'patientID',select:['firstname','lastname']});
        //success message
        res.status(200).json({success: true,result:reviews})
    }catch(error){
        res.status(500).json({message: "Error with fetching reviews", error: error.message})
    }
}

exports.fetchOne = async(req,res)=>{
    let reviewID =req.params.id;
    try{ 
        const review =await Review.findById(reviewID).populate({path:'patientID',select:['firstname','lastname']})
    
        res.status(200).json(review)
    }catch(error){
        res.status(500).json({message:"fetching failed",error:error.message});
    }
}

