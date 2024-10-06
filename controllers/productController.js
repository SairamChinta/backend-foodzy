import Product, { find, findByIdAndDelete } from "../models/Product";
import multer, { diskStorage } from "multer";
import { findById } from "../models/Firm";
import { extname } from 'path';

const storage = diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination directory for uploads
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      // Rename the file to ensure uniqueness
      cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname));
    }
});

const upload=multer({storage:storage});

const addProduct = async(req,res)=>{
    try {
        const { productName, price, description, bestSeller, category}=req.body;
        const image=req.file?req.file.file.name:undefined;

        const firmId=req.params.firmId;
        const firm = await findById(firmId);
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
        const firm = await findById(firmId);
        if(!firm){
            return res.status(404).json({error:"firm not found"});

        }

        const restraurantName=firm.firmName;

        const products= await find({firm: firmId});
        res.status(200).json({restraurantName, products});

    } catch (error) {
       console.log(error);
       res.status(500).json({error:"internal server error"});
    }
}
const deleteProductById= async(req,res)=>{
    try {
        const productId = req.params.productId;
        const deletedProduct = await findByIdAndDelete(productId);
        if(!deletedProduct){
            res.status(404).json({error:'Product Not Found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"});
    }
}

export default {addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById};
