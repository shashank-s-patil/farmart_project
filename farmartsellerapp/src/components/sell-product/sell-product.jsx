import './sell-product.css';

import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';


export const SellProduct = () => {

    const [ProductImage, setProductImage] = useState(null);
    const[btnText, setbtnText] = useState("Post Product");

    // const [seller, setSeller] = useState({});
    // const user = useContext(UserContext);

    const { ProductId } = useParams();

    const{
        register,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    async function saveData(data){

        let formData = new FormData();
        formData.append("ProductId", ProductId);
        formData.append("ProductCategory", data.ProductCategory);
        formData.append("ProductName", data.ProductName);
        formData.append("ProductDescription", data.ProductDescription);
        formData.append("MRP", data.MRP);
        
        formData.append("OfferPrice", data.OfferPrice);
        formData.append("ProductImage", ProductImage);


        let options = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }

        let res = await axios.post("http://localhost:5000/saveProduct", formData, options);
        navigate("/");

    }

    
    function convertFile(event){
        var reader = new FileReader();

        reader.onload = function(){
            var dataURL = reader.result;
            setProductImage(dataURL);
        };

        reader.readAsDataURL(event.target.files[0]);
    }
   
    // useEffect(() => {

    //     if(document.cookie != null && document.cookie != ""){
    //         setSeller(JSON.parse(document.cookie.split("=")[1]));
    //     }

    // }, []);

 

    // useEffect(() => {
    //     if(ProductId != undefined){
    //         getProductDetails();
    //     }

    // }, []);

    // async function getProductDetails(){
    //     const url = "http://localhost:5000/productDetails/"+ProductId;
    //     let response = await axios.get(url);
    //     let data = response.data[0];

    //     setValue("ProductCategory", data.ProductCategory);
    //     setValue("ProductName", data.ProductName);
    //     setValue("ProductDescription", data.ProductDescription);
    //     setValue("MRP", data.MRP);
    
    //     setValue("OfferPrice", data.OfferPrice);
    //     setProductImage(data.ProductImage);

    //     setbtnText("Update Product");        
    // }


    return(

        <div className="prod">
            <div className="prod-container">

                <div className='prod-form mt-5'>

                    <h3 class="text-center">{ btnText }</h3>
                    <p class="text-center">Sell your product in Simple Steps</p>
                    <hr />

                    <form onSubmit={handleSubmit(data => {
                        saveData(data)
                    })}>

                        <h6 className='mt-4'>Tell us about your product</h6>

                        <div class="form-group mt-4 mb-4">
                            <label>Product Category</label>
                            <input type="text" class="form-control mt-1" name="ProductCategory" style={{width: "60%"}} {...register('ProductCategory', {required: true})}/>

                            {errors.ProductCategory && errors.ProductCategory?.type == "required" && <div className='text-danger'>Product Category is required.</div>}
                        </div>

                        <div class="form-group mt-4">
                            <label>Product Name</label>
                            <input type="text" class="form-control mt-1" name="ProductName" style={{width: "80%"}} {...register('ProductName', {required: true})}/>

                            {errors.ProductName && errors.ProductName?.type == "required" && <div className='text-danger'>Product Name is required.</div>}
                        </div> 

                        <div class="form-group mt-4">
                            <label>Product Description</label>
                            <textarea type="text" class="form-control mt-1" name="ProductDescription" rows="4" style={{width: "80%"}} {...register('ProductDescription', {required: true})}/>

                            {errors.ProductDescription && errors.ProductDescription?.type == "required" && <div className='text-danger'>Product Description is required.</div>}
                        </div> 

                        <div class="form-group mt-4 mb-4">
                            <label>MRP</label>
                            <input type="text" class="form-control mt-1" name="MRP" style={{width: "60%"}} {...register('MRP', {required: true})}/>

                            {errors.MRP && errors.MRP?.type == "required" && <div className='text-danger'>MRP is required.</div>}
                        </div>

                        <div class="form-group mt-4 mb-4">
                            <label>Offer Price</label>
                            <input type="text" class="form-control mt-1" name="OfferPrice" style={{width: "60%"}} {...register('OfferPrice', {required: true})}/>

                            {errors.OfferPrice && errors.OfferPrice?.type == "required" && <div className='text-danger'>Offer Price is required.</div>}
                        </div>

                        <div class="form-group mt-4">
                            <label>Product Image</label>
                            <input type="file" class="form-control mt-1" name="ProductImage" style={{width: "60%"}} onChange={(event) => {
                                convertFile(event)
                            }}/>                            
                        </div>

                        <div className='update-img'>
                            <img src={ProductImage}/>
                        </div>

                        <div class="mt-4">
                            <center><input type="submit" class="btn" value={ btnText }/></center>
                        </div>

                        <p className='prod-terms mt-3'>By proceeding, you agree to our <a href="#">Terms of use</a> & <a href="#">Privacy Policy</a> <br />
                        To use the old form to list your property <a href="#">click here</a></p>

                    
                    </form>
                </div>
            </div> 
        </div>







    )
}





