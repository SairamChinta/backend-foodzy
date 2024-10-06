#Dependencies //which are installed 
.express
.mongoose
.dotenv
.body-parser
.nodemon
.jwt token
.bcrypt
.multer

#succesfully connnected MOngoDB 

#vendor api structure
vendor - autentication nedded
   |
restaurant-adress
          -offer
          -products--productName,Price---categories
                                        -regions
                                        -disconts

API Creation
        models :Vendor=username,email,password
               :Firm=firmname,area ,category,region,photo,offer,rating
               :products=productName.price,category,best seller,description,image
        controllers :vendorController
        router: VendorRouter
