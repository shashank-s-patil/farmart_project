import './view-cart.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const ViewCart = () => {

    const [user, setUser] = useState({}); 
    const [cart, setCart] = useState([]); 
    const [deleteCartId, setDeleteCartId] = useState(0);
    

    const navigate = useNavigate();
    

    useEffect(() => {   
        getMyCart()       
    }, []);

    async function getMyCart(){
            const url = "http://localhost:5000/myCart";
            let response = await axios.get(url);
            setCart(response.data);    
    }



    //Delete cart item
    async function deleteCartProduct(){

        if(deleteCartId > 0){

            let formData = new FormData();
            formData.append("CartId", deleteCartId);

            let options = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            }

            let res = await axios.post("http://localhost:5000/deleteCartItem", formData, options);
            window.location.reload();

        }
    }





    // useEffect(() => {   
    //     getMyWishlist()       
    // }, [user]);

    // async function getMyWishlist(){
    //         const url = "http://localhost:5000/myCart/"+user.UserId;
    //         let response = await axios.get(url);
    //         setCart(response.data);    
    //         setUser(JSON.parse(document.cookie.split("=")[1]));
    // }



    return(

        <div className='main-post-products'>
            <h3 className="heading text-center pt-4 pb-2">My Cart</h3>
            
            <div className="myProducts pb-5">
            {
                cart.map(bindData)
            }
            </div> 

            <center><button className='btn btn-warning' onClick={() => {
                navigate('/checkout');
            }}>Proceed to Buy</button></center>

        </div>
    )



    function bindData(item, index, arr){

        return (
              
            <div className='productCards'>
                <div className='card mt-3'>
                    <div className='card-header'>
                        <p>{item.ProductCategory}</p>
                        <p><i class="fa-solid fa-heart wishlist"></i></p>
                    </div>

                    <div className='card-body'>   
                        <img src={item.ProductImage}/>
                    </div>
    
                    <div className='card-footer'>
                        <h6> {item.ProductName}</h6>
                        {/* <p className='text-secondary'> <span>MRP: Rs.</span> {item.MRP}</p> */}
                        <p className='text-primary'> <span>Rs.</span> {item.OfferPrice}</p>
                        <p className='text-primary'> <span>Quantity:</span> {item.Quantity}</p>
                            
                        <div>
                            <center>
                                <button className='btn del-btn mb-2 mt-2' onClick={() => {
                                    deleteCartProduct();
                                    setDeleteCartId(item.CartId);
                                }}>Remove</button>
                            </center>
                        </div>
                        
                    </div> 
                
                </div>
            </div>
        )
    }
        





}















