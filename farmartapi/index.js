// Import db-con module
const express = require("express");
const dbcon = require("./db-con");


let app = express();

const cors = require('cors');
const formidable = require('express-formidable');

app.use(cors());
app.use(formidable());

app.listen(5000);






// To get user details
app.get("/userDetails", (req, res) => userDetailsCallback(req, res));

async function userDetailsCallback(req, res){
    let data = await dbcon.getUserDetails();
    res.write(JSON.stringify(data));
    res.end();
}

// To get wishlist details
app.get("/myWishlist/:UserId", (req, res) => myWishlistCallback(req, res));

async function myWishlistCallback(req, res){
    let data = await dbcon.getMyWishlist(req.params.UserId);
    res.write(JSON.stringify(data));
    res.end();
}

// To get wishlist count details
app.get("/myWishlistCount/:UserId", (req, res) => myWishlistCountCallback(req, res));

async function myWishlistCountCallback(req, res){
    let data = await dbcon.getMyWishlistCount(req.params.UserId);
    res.write(JSON.stringify(data));
    res.end();
}



// To get cart details
app.get("/myCart/:UserId", (req, res) => myCartCallback(req, res));

async function myCartCallback(req, res){
    let data = await dbcon.getMyCart(req.params.UserId);
    res.write(JSON.stringify(data));
    res.end();
}

// To get cart details
app.get("/myCart", (req, res) => myCartCallback(req, res));

async function myCartCallback(req, res){
    let data = await dbcon.getMyCart();
    res.write(JSON.stringify(data));
    res.end();
}


// To get cart count details
app.get("/myCartCount/:UserId", (req, res) => myCartCountCallback(req, res));

async function myCartCountCallback(req, res){
    let data = await dbcon.getMyCartCount(req.params.UserId);
    res.write(JSON.stringify(data));
    res.end();
}



// To get seller product details
app.get("/sellerProductDetails/:SellerId", (req, res) => sellerProductDetailsCallback(req, res));

async function sellerProductDetailsCallback(req, res){
    let data = await dbcon.getSellerProductDetails(req.params.SellerId);
    res.write(JSON.stringify(data));
    res.end();
}

// To get Product details
app.get("/productDetails", (req, res) => productDetailsCallback(req, res));

async function productDetailsCallback(req, res){
    let data = await dbcon.getProductDetails();
    res.write(JSON.stringify(data));
    res.end();
}

// To get all products
app.get("/allproducts/:searchterm", (req, res) => productsCallback(req, res));

async function productsCallback(req, res){
    let data = await dbcon.getAllProducts(req.params.searchterm);
    res.write(JSON.stringify(data));
    res.end();
}









// To Post check user detail
app.post("/checkUser", (req,res) => checkLoggedInUserCallback(req, res));

async function checkLoggedInUserCallback(req, res){
    console.log("Check user API called");
    let data = await dbcon.checkLoggedInUser(req.fields.EmailId, req.fields.Password);
    res.end(JSON.stringify(data));
}

// To Post check Seller detail
app.post("/checkSeller", (req,res) => checkLoggedInSellerCallback(req, res));

async function checkLoggedInSellerCallback(req, res){
    console.log("Check Seller API called");
    let data = await dbcon.checkLoggedInSeller(req.fields.EmailId, req.fields.Password);
    res.end(JSON.stringify(data));
}



// To Post user detail
app.post("/saveUser", (req,res) => saveUserCallback(req, res));

async function saveUserCallback(req, res){
    console.log("User save API called");
    let data = await dbcon.saveUserDetail(req.fields.FullName, req.fields.PhoneNumber, req.fields.City, req.fields.EmailId, req.fields.Password);
    res.end();
}

// To Post Product detail
app.post("/saveProduct", (req,res) => saveProductCallback(req, res));

async function saveProductCallback(req, res){
    console.log("Product save API called");    
    let data = await dbcon.saveProductDetail(req.fields.ProductCategory, req.fields.ProductName, req.fields.ProductDescription, req.fields.MRP, req.fields.OfferPrice, req.fields.ProductImage);
    res.end();
}

  
// To post wishlist detail by specific user
app.post("/addToWishlist", (req,res) => saveWishCallback(req, res));

async function saveWishCallback(req, res){
    console.log("Wish save API called");    
    let data = await dbcon.saveWishDetail(req.fields.UserId, req.fields.ProductId);
    res.end();
}

// To post add to cart detail by specific user
app.post("/addToCart", (req,res) => saveCartCallback(req, res));

async function saveCartCallback(req, res){
    console.log("Cart save API called");    
    let data = await dbcon.saveCartDetail(req.fields.UserId, req.fields.ProductId, req.fields.Quantity);
    res.end();
}

// To delete wishlist item
app.post("/deleteWishlistItem", (req,res) => deleteWishCallback(req, res));

async function deleteWishCallback(req, res){
    console.log("Delete Wish API called");    
    let data = await dbcon.deleteWishlistItem(req.fields.WishId);
    res.end();
}

// To delete cart item
app.post("/deleteCartItem", (req,res) => deleteCartCallback(req, res));

async function deleteCartCallback(req, res){
    console.log("Delete Cart API called");    
    let data = await dbcon.deleteCartItem(req.fields.CartId);
    res.end();
}

// To Post seller detail
app.post("/saveSeller", (req,res) => saveSellerCallback(req, res));

async function saveSellerCallback(req, res){
    console.log("Seller save API called");
    let data = await dbcon.saveSellerDetail(req.fields.FullName, req.fields.StoreName, req.fields.GSTIN, req.fields.PhoneNumber, req.fields.City, req.fields.EmailId, req.fields.Password);
    res.end();
}



