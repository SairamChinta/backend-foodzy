
const Firm=require('../models/Firm');
const Vendor=require('../models/Vendor');
const multer = require('multer');
const path= require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination directory for uploads
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      // Rename the file to ensure uniqueness
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload=multer({storage:storage});

const addFirm = async(req,res)=>{
   try{
    const{firmName,area,offer,category,region}=req.body;
    
    const image=req.file?req.file.file.name:undefined;

    const vendor= await Vendor.findById(req.vendorId);
    if(!vendor){
        return res.status(404).json({error:'vendor not found'})
    }
    const firm=new Firm({
        vendor:vendor._id,image,firmName,area,offer,category,region
    })
    
    const savedFirm=await firm.save();
    vendor.firm.push(savedFirm);
    await vendor.save();

    return res.status(200).json({message:'Firm added Succesfully'})
   }catch(error){
       console.log(error);
       res.status(500).json({error:"internal server error"})
   }

}
const deleteFirmById = async(req,res)=>{
  try {
    const firmId=req.params.firmId;
    const deletedFirm= await Firm.findByIdAndDelete(firmId);

    if(!deletedFirm){
        return res.status(404).json({error:"Firm Not Found"})
    }
   }catch(error){
    console.log(error);
    res.status(500).json({error:"internal server error"})
  }
}

module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}