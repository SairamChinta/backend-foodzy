const Product= require("../models/Product");
const multer = require("multer");
const Firm = require("../models/Firm");

const path=require("path");

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

const addProduct = async(req,res)=>{
    try {
        const { productName, price, description, bestSeller, category}=req.body;
        const image=req.file?req.file.file.name:undefined;

        const firmId=req.params.firmId;
        const firm = await Firm.findById(firmId);
        if(!firmId){
            res.status(404).json({error:"firm not found"});
        
        }
        const product = new Product({ productName, price, description, bestSeller, category,image,firm:firm._id});
        
        const savedProduct = await product.save();
        firm.products.push(savedProduct);
        await firm.save();

        res.status(200).json(savedProduct)

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"});
    }
}
const getProductByFirm = async(req,res)=>{
    

    try {
        const firmId= req.params.firmId;
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"firm not found"});

        }

        const restraurantName=firm.firmName;

        const products= await Product.find({firm: firmId});
        res.status(200).json({restraurantName, products});

    } catch (error) {
       console.log(error);
       res.status(500).json({error:"internal server error"});
    }
}
const deleteProductById= async(req,res)=>{
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if(!deletedProduct){
            res.status(404).json({error:'Product Not Found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"});
    }
}

module.exports = {addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById};
