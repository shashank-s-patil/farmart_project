import './menu.css';

import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import { store } from "../../../services/redux-storage.service";
import { setDataInCookie } from "../../../services/storage.service";
import axios from "axios";

export const Menu = () => {

    const [user, setUser] = useState({});

    const [wishCount, setWishCount] = useState([]);
    const [cartCount, setCartCount] = useState({});

    const [filterProducts, setFilterProducts] = useState({});
    const searchTermRef = useRef();

    const navigate = useNavigate();

    function logout(){
       document.cookie='user=;'

       //redux
       setDataInCookie(null);
       let action = {type: "userdata", data: null}
       store.dispatch(action);

       document.getElementById('logout').style.display = 'none';

        navigate("/login");
    }



    function displayNone(){
            document.getElementById('login').style.display = 'none';
            document.getElementById('signup').style.display = 'none';
    }

    function display(){
        document.getElementById('login').style.display = 'inline';
        document.getElementById('signup').style.display = 'inline';
    }




    // useEffect(() => {   
    //     getMyWishlistCount(user.UserId);    
    // }, [user.UserId]);

    async function getMyWishlistCount(UserId){
            let response = await axios.get(`http://localhost:5000/myWishlistCount/${UserId}`);
            setWishCount(response.data);   
    }


    // useEffect(() => {   
    //     getMyCartCount(user.UserId);    
    // }, [user.UserId]);

    async function getMyCartCount(UserId){
            let response = await axios.get(`http://localhost:5000/myCartCount/${UserId}`);
            setCartCount(response.data);   
    }



    useEffect(() => {
        if(document.cookie != null && document.cookie != "" && document.cookie.split("=")[1] != 'null'){
            try{
                setUser(JSON.parse(document.cookie.split("=")[1]));
                displayNone();
            }
            catch(error){

            }
        }
        else{
            display();
        }
    }, []);


    async function getProductsByFilter() {
        try {
          const response = await axios.get(`http://localhost:5000/allproducts/` + searchTermRef.current.value);
          setFilterProducts(response.data[0]);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }



    return(

        <div className="menu">
            <div className="menu-panel1">
                <div class="panel1-icons-left">

                    <a href="#">About Us</a> <span>|</span>
                    <a href="#">Order Tracking</a>
                </div>

                <div class="panel1-icons-right">

                    <span className="username">{user.FullName}</span>

                    <i class="fa-solid fa-user-plus" id="signup" onClick={() => {
                        navigate('/signup');
                    }}></i>                    

                    <i class="fa-solid fa-user" id="login" onClick={() => {
                            navigate('/login');
                        }}></i>

                    {   
                        user && user.UserId>0 && <i class="fa-solid fa-right-from-bracket" id="logout" value="Logout" onClick={() => {
                            logout();
                        }}></i> 
                    }

                </div>

            </div>

            <div className="menu-panel2">
                <div className="panel2-logo">
                    <Link to='/'>
                        <img src={require('../../../assets/images/farmart_logo.png')} alt="logo"/>
                    </Link>
                </div>
                
                <div className="panel2-search">
                    <div className="search-input">
                        <input type="text" placeholder="Search for Products..." ref={searchTermRef} onChange={() => {
                            getProductsByFilter();
                           }}></input>
                    </div>

                    <div className="search-icon">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>

                <div className="panel2-contact">
                    <h5>8 800 332 65-66</h5>
                    <p>Support 24/7</p>
                </div>

                <div className="panel2-wishnCart">
                    <a href="/view-wishlist"> <i class="fa-regular fa-heart"></i> <sup>{wishCount.WishlistCount}</sup> </a> 
                    <a href="/view-cart"> <i class="fa-solid fa-cart-shopping"></i> <sup>{cartCount.CartCount}</sup></a>
                </div>
            </div>

            <div className="menu-panel3">
                <div className="dropdown panel2-menu">
                    <button class="dropbtn"> <i class="fa-solid fa-bars me-3"></i> SHOP BY CATEGORY</button>
                    <div class="dropdown-content">
                        <a href="#">Fruits & Vegetables</a>
                        <a href="#">Grocery</a>
                        <a href="#">Breads & Sweets</a>
                        <a href="#">Ice cream</a>
                        <a href="#">Food Cupboard</a>
                    </div>
                </div>

                <div className="panel3-menu2">
                    <a href="#">Blog</a>
                    <a href="#">FAQ's</a>
                    <a href="#">Contact</a>
                </div>
            </div>



            <div className="row">
                {Array.isArray(filterProducts) ? (filterProducts.map(product => (

                <div className="col-3" style={{width:'250px',border:'1px solid #ccc',borderRadius: '5px', padding: '10px', margin: '20px',border: '1px solid #666666', display: 'flex', justifyContent: 'space-evenly', boxShadow: '5px 5px #f8dca4'}} >
                    <div key={product.ProductId}>
                    <img  src={product.ProductImage}  style={{width:'100%'}}/>
                    <div><h5 className='text text-primary fs-15px'>{product.ProductName}</h5></div>
                    <div className='text text-secondary'>{product.ProductDescription}</div>
                    <div style={{color:'green'}}><h6>Rs. {product.OfferPrice}</h6></div>
                  
                        </div>
                    </div>
                    ))
                    ) : (
                    <div></div>
                    )}
                 </div>


            
        </div>

    )
}