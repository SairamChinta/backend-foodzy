
const productController = require('../controllers/productController');
const vendorController=require('../controllers/vendorController');
const express=require('express');

const router =express.Router();

router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.vendorLogin);
router.get('/all-vendors',vendorController.getAllVendors);
router.get('/single-vendor/:id',vendorController.getVendorById);
router.get('/:firmId/products',productController.getProductByFirm);

module.exports= router;