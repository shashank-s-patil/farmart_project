import './view-wishlist.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getDataFromCookie } from '../../../services/storage.service';


export const ViewWishlist = () => {

    const [user, setUser] = useState({}); 
    const [wish, setWish] = useState([]);
    const [deleteWishlistId, setDeleteWishlistId] = useState(0);


    const navigate = useNavigate();

    //Delete wish
    async function deleteWishlistProduct(){

        if(deleteWishlistId > 0){

            let formData = new FormData();
            formData.append("WishId", deleteWishlistId);

            let options = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            }

            let res = await axios.post("http://localhost:5000/deleteWishlistItem", formData, options);
            window.location.reload();

        }
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


    
    useEffect(() => { 
        if(user.UserId){
            getMyWishlist(user.UserId);    
        } 
    }, [user.UserId]);

    async function getMyWishlist(UserId){
           try{
                let response = await axios.get(`http://localhost:5000/myWishlist/${UserId}`);
                setWish(response.data); 
           }
            catch(err){

            }
            
    }



    return(

        <div className='main-post-products'>
            <h3 className="heading text-center pt-4 pb-2">My Wishlist</h3>
            
            <div className="myProducts pb-5">
            {
                wish.map(bindData)
            }
            </div>  
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
                        {/* <p className='text-primary'> <span>Quantity:</span> {item.Quantity}</p> */}


                        <div className='addCart-remove'>
                            <div>
                                <center>
                                    <button className='btn del-btn mb-2 mt-2' onClick={() => {
                                        deleteWishlistProduct();
                                        setDeleteWishlistId(item.WishId);
                                    }}>Remove</button>
                                </center>
                            </div>
                        </div>
                        
                    </div> 
                
                </div>
            </div>
        )
    }
        





}















