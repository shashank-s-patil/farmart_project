// DB Connection
const mysqldb = require("mysql2");

const con = mysqldb.createConnection ({
    host : "localhost",
    user : "root",
    password : "Shashank@297",
    database : "etsydb"
});

function startConnection(){
    con.connect((err) => {
        if(err) throw err;
        console.log("Connected");
    });
    
}






// To get user details
async function getUserDetails(){
    startConnection();
    const query = "SELECT * FROM user_details";
    const data = await con.promise().query(query);
    return data[0];
}

// const query = `SELECT pd.* FROM property_details AS pd JOIN wishlist AS w ON pd.'${Id}' = w.'${PropertyId}';


// To get wishlist details
async function getMyWishlist(UserId){
    startConnection();
    const query = `SELECT Distinct * FROM product_details AS pd
    JOIN wishlist AS w ON pd.ProductId = w.ProductId
    WHERE w.UserId = ${UserId}`;
    const data = await con.promise().query(query);
    return data[0];
}


// To get wishlist count details
async function getMyWishlistCount(UserId){
    startConnection();
    const query = `SELECT count(*) AS WishlistCount FROM wishlist WHERE UserId = ${UserId};`;
    const data = await con.promise().query(query);
    return data[0];
}


// To get cart details
async function getMyCart(UserId){
    startConnection();
    const query = `SELECT * FROM product_details AS pd
    JOIN cart AS c ON pd.ProductId = c.ProductId
    WHERE c.UserId = ${UserId};`;
    const data = await con.promise().query(query);
    return data[0];
}

// To get cart details
async function getMyCart(){
    startConnection();
    const query = `SELECT * FROM product_details AS pd
    JOIN cart AS c ON pd.ProductId = c.ProductId`;
    const data = await con.promise().query(query);
    return data[0];
}


// To get cart count details
async function getMyCartCount(UserId){
    startConnection();
    const query = `SELECT sum(Quantity) AS CartCount FROM cart WHERE UserId = ${UserId};`;
    const data = await con.promise().query(query);
    return data[0];
}




// To get Product details
async function getProductDetails(){
    startConnection();
    const query = "SELECT * FROM product_details";
    const data = await con.promise().query(query);
    return data[0];
}

// To get seller Product details
async function getSellerProductDetails(SellerId){
    startConnection();
    const query = `SELECT * FROM product_details where SellerId ='${SellerId}'`;
    const data = await con.promise().query(query);
    return data[0];
}

// To get products
async function getAllProducts(searchterm){
    startConnection();
    const query = `call sp_getProducts("%${searchterm}%");`;
    const data = await con.promise().query(query);
    return data[0];
}










//To check Logged In User
async function  checkLoggedInUser(EmailId, Password){
    startConnection();
    const query = `SELECT * FROM user_details WHERE EmailId="${EmailId}" && Password="${Password}"`;
    const data = await con.promise().query(query);
    return data[0];
}


//To Post user detail
async function  saveUserDetail(FullName, PhoneNumber, City, EmailId, Password){
    startConnection();
    const query = `INSERT INTO user_details(FullName, PhoneNumber, City, EmailId, Password) VALUES('${FullName}', '${PhoneNumber}', '${City}', '${EmailId}', '${Password}')`;
    await con.promise().query(query);
    return true;
}


//To Post product detail
async function  saveProductDetail(ProductCategory, ProductName, ProductDescription, MRP, OfferPrice, ProductImage){
    startConnection();
    const query = `INSERT INTO product_details(ProductCategory, ProductName, ProductDescription, MRP, OfferPrice, ProductImage) VALUES('${ProductCategory}', '${ProductName}', '${ProductDescription}', '${MRP}', '${OfferPrice}', '${ProductImage}')`;
    await con.promise().query(query);
    return true;
}

// To post wishlist detail by specific user
async function  saveWishDetail(UserId, ProductId){
    startConnection();
    const query = `INSERT INTO wishlist(UserId, ProductId) VALUES(${UserId}, ${ProductId})`;
    await con.promise().query(query);
    return true;
}


// To post cart detail by specific user
async function  saveCartDetail(UserId, ProductId, Quantity){
    startConnection();
    const query = `call sp_addtocart (${UserId}, ${ProductId}, ${Quantity})`;
    await con.promise().query(query);
    return true;
}


// To delete wishlist item
async function  deleteWishlistItem(WishId){
    startConnection();
    const query = `DELETE FROM wishlist WHERE WishId = ${WishId}`;
    await con.promise().query(query);
    return true;
}

// To delete cart item
async function  deleteCartItem(CartId){
    startConnection();
    const query = `DELETE FROM cart WHERE CartId = ${CartId}`;
    await con.promise().query(query);
    return true;
}

//To Post seller detail
async function  saveSellerDetail(FullName, StoreName, GSTIN, PhoneNumber, City, EmailId, Password){
    startConnection();
    const query = `INSERT INTO seller_details(FullName, StoreName, GSTIN, PhoneNumber, City, EmailId, Password) VALUES('${FullName}', '${StoreName}', '${GSTIN}', '${PhoneNumber}', '${City}', '${EmailId}', '${Password}')`;
    await con.promise().query(query);
    return true;
}

//To check Logged In Seller
async function  checkLoggedInSeller(EmailId, Password){
    startConnection();
    const query = `SELECT * FROM seller_details WHERE EmailId="${EmailId}" && Password="${Password}"`;
    const data = await con.promise().query(query);
    return data[0];
}









module.exports = {

    // getting details
    getUserDetails : async () => getUserDetails(),

    getMyWishlist : async (UserId) => getMyWishlist(UserId),
    getMyCart : async (UserId) => getMyCart(UserId),

    getMyCart : async () => getMyCart(),

    getMyWishlistCount : async (UserId) => getMyWishlistCount(UserId),
    getMyCartCount : async (UserId) => getMyCartCount(UserId),


    getProductDetails : async () => getProductDetails(),
    getSellerProductDetails : async (SellerId) => getSellerProductDetails(SellerId),

    getAllProducts : async (searchterm) => getAllProducts(searchterm),


    // Posting detail
    checkLoggedInUser: async (EmailId, Password) => checkLoggedInUser(EmailId, Password),
    saveUserDetail: async (FullName, PhoneNumber, City, EmailId, Password) => saveUserDetail(FullName, PhoneNumber, City, EmailId, Password),
    saveProductDetail: async (ProductCategory, ProductName, ProductDescription, MRP, OfferPrice, ProductImage) => saveProductDetail(ProductCategory, ProductName, ProductDescription, MRP, OfferPrice, ProductImage),

    saveWishDetail: async (UserId, ProductId) => saveWishDetail(UserId, ProductId),
    saveCartDetail: async (UserId, ProductId, Quantity) => saveCartDetail(UserId, ProductId, Quantity),

    deleteWishlistItem: async (WishId) => deleteWishlistItem(WishId),
    deleteCartItem: async (CartId) => deleteCartItem(CartId),

    saveSellerDetail: async (FullName, StoreName, GSTIN, PhoneNumber, City, EmailId, Password) => saveSellerDetail(FullName, StoreName, GSTIN, PhoneNumber, City, EmailId, Password),
    checkLoggedInSeller: async (EmailId, Password) => checkLoggedInSeller(EmailId, Password)


}



