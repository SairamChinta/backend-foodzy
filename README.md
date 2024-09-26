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

//we not able test api while created by POSt method in web browser 
so we use POSTMAN software

//while we POSt a request in podtman it shows a internal server error we dont y it because ,
we bcryptjs nd all bu it not wroking wehave to look into it !!  
-- becoz i tried in text which was default after changing to JSON it works well

//succesfull completed login and register backend
//jwt token used to security nd also toindentitfythe firm and add products to the that firm only 
its safe approach to to ake uniq id  nd also we have _id in database we also had a chance it use hat id but that is not thatmuch good approach becoz of it not changes evaerytime and always checking to database id make applicatn performance low
