import { getData, postData } from "./context.service";


const url = "http://localhost:5000/products/";

const addToCartUrl = "http://localhost:5000/addToCart/";

const addToWishlistUrl = "http://localhost:5000/addToWishlist/";


export function getProducts(){
    return getData(url);
}

export function addToCart(data){
    return postData(addToCartUrl, data);
}

export function addToWishlist(data){
    return postData(addToWishlistUrl, data);
}



