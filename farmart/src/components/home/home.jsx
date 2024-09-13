import './home.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { addToCart, addToWishlist } from '../../services/product.service';


export const Home = () => {

    const QuantityRef = useRef();

    const [user, setUser] = useState({}); 
    const [product, setProduct] = useState([]); 
    const [wishlistDetails, setWishlistDetails] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();
    
    useEffect(() => { 
            getProducts();      
    }, []);

    async function getProducts(){
            
            let response = await axios.get("http://localhost:5000/productDetails");
            setProduct(response.data);
            setWishlistDetails(response.data.map(() => ({
                Quantity: 1
            })))
    }

    useEffect(() => {
        if(document.cookie != null && document.cookie != "" && document.cookie.split("=")[1] != 'null'){
            try{
                setUser(JSON.parse(document.cookie.split("=")[1]));
            }
            catch(error){
            }
        }
        
    }, []);


    // Quantity Toggle button
    async function addDataToCart(ProductId){
        if(!user){
            navigate('/login');
        }
        else{
            let UserId = user.UserId; 
            
            let formdata = new FormData();
            formdata.append("UserId", UserId);
            formdata.append("ProductId", ProductId);
            formdata.append("Quantity", QuantityRef.current.value);

            let res = await addToCart(formdata);
            alert("Added to Cart");
        }
    }

    function incDecQuantity(type) { 
        switch(type) { 
            case "inc": if(QuantityRef.current.value == 0){ 
                QuantityRef.current.value = 1; 
            } 
            else { 
                setQuantity(parseInt(QuantityRef.current.value)+1); 
            } 
            break; 
            
            case "dec": if(QuantityRef.current.value == 0){
                QuantityRef.current.value = 0; 
            }
            else { 
                setQuantity(parseInt( QuantityRef.current.value)-1); 
            } 
            break; 
        } 
    }


    // add To Wishlist
    async function addDataToWishlist(ProductId){
        if(!user){
            navigate('/');
        }
        else{
            let UserId = user.UserId; 
            
            let formdata = new FormData();
            formdata.append("UserId", UserId);
            formdata.append("ProductId", ProductId);

            let res = await addToWishlist(formdata);
            alert("Added to Wishlist");
        }
    }



    return(
        
        <div className="home">            

            <div className="banner1">

                <div className="banner1-sub mt-4">
                    <div className='sub1'>
                        <img src={require('../../assets/images/farmart_banner2.jpg')}/>
                    </div>

                    <div className='sub2'>
                        <img src={require('../../assets/images/farmart_banner1.jpg')}/>
                    </div>
                </div>
            </div>
        
            <center><h3 className='heading'>Browse by Category</h3></center>

            <div className="handpicks mt-4">

                <div className="card">
                    <div className="card-body">
                        <img src={require('../../assets/images/Fruits & Vegetables.png')}/>
                    </div>   

                    <div className="card-footer">
                        <a href='#'>Fruits & Vegetables</a>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <img src={require('../../assets/images/Grocery.png')}/>
                    </div>   

                    <div className="card-footer">
                        <a href='#'>Grocery</a>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <img src={require('../../assets/images/Breads & Sweets.png')}/>
                    </div>   

                    <div className="card-footer">
                        <a href='#'>Breads & Sweets</a>
                    </div>
                </div>  

                <div className="card">
                    <div className="card-body">
                        <img src={require('../../assets/images/Ice cream.png')}/>
                    </div>   

                    <div className="card-footer">
                        <a href='#'>Ice cream</a>
                    </div>
                </div>  

                <div className="card">
                    <div className="card-body">
                        <img src={require('../../assets/images/Grocery.png')}/>
                    </div>   

                    <div className="card-footer">
                        <a href='#'>Food Cupboard</a>
                    </div>
                </div>  


            </div>

            <div className="banner2">
                <div className='banner2-sub'>
                    <img src={require('../../assets/images/img1.png')}/>
                </div>

                <div className='banner2-sub'>
                    <img src={require('../../assets/images/img2.png')}/>
                </div>

                <div className='banner2-sub'>
                    <img src={require('../../assets/images/img3.png')}/>
                </div>
            </div>


            <div className='main-post-products'>
                <h3 className="heading text-center mb-2">Shop Your Favourites Now</h3>
                
                <div className="myProducts pb-5">
                {
                    product.map(bindData)
                }
                </div>  
            </div>

        </div>
        
    )


    function bindData(item, index, arr){

        return (
            
            <div className='productCards'>
                <div className='card mt-3'>
                    <div className='card-header'>
                        <p>{item.ProductCategory}</p>

                        <p onClick={() => {
                            // document.getElementById("wishlist" + item.ProductId).submit();

                            addDataToWishlist(item.ProductId);
                            }}><i class="fa-solid fa-heart wishlist-icon"></i></p>
                    </div>

                    <div className='card-body'>   
                        <img src={item.ProductImage}/>
                    </div>
    
                    <div className='card-footer'>
                        <h6> {item.ProductName}</h6>
                        {/* <p className='text-secondary'> <span>MRP: Rs.</span> {item.MRP}</p> */}
                        <p className='text-primary'> <span>Rs.</span> {item.OfferPrice}</p>
                        {/* <p className='text-primary'> <span>Quantity:</span> {item.Quantity}</p> */}

                        <div>
                            
                            <div className='Quantity-btn' style={{width: "117px"}}>
                                <input type='button' className='btn btn-light' value="-" onClick={() => {
                                    incDecQuantity("dec");
                                }}></input>
                                <input type='text' value={quantity} className='form-control' style={{width: "50px"}} ref={QuantityRef}></input>
                                <input type='button' className='btn btn-light' value="+" onClick={() => {
                                    incDecQuantity("inc");
                                }}></input>
                            </div>

                            <center>
                                <button className='btn add-btn mb-2 mt-4' value="cart" onClick={() => {
                                    if(quantity > 0){
                                        addDataToCart(item.ProductId);
                                    }
                                    }}>Add to Cart</button>

                            </center>
                        </div>
                        
                    </div> 
                
                </div>
            </div>
        )
    }









}





