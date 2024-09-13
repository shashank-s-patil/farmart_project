import './signup.css';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


export const Signup = () => {

    const{
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const navigate = useNavigate();

    async function saveData(data){

        let formData = new FormData();
        formData.append("FullName", data.FullName);
        formData.append("StoreName", data.StoreName);
        formData.append("GSTIN", data.GSTIN);
        formData.append("PhoneNumber", data.PhoneNumber);
        formData.append("City", data.City);
        formData.append("EmailId", data.EmailId);
        formData.append("Password", data.Password);

        let options = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }

        let res = await axios.post("http://localhost:5000/saveSeller", formData, options);
        navigate("/login");

    }
    
    

    return(

        <div className="signup">
            <div className="signup-container">
                <div className='signup-form mt-5'>

                    <h3 class="text-center">Sign up as Seller</h3>

                    <form onSubmit={handleSubmit(data => {
                        saveData(data)
                    })}>

                        <div className='form-twofieldsdivs'>
                            <div className='twofieldsdiv'>
                                <div class="form-group mt-5">
                                    <label>FULL NAME</label>
                                    <input type="text" class="form-control mt-1" name="FullName" style={{width: "100%"}} {...register('FullName', {required: true})}/>

                                    {errors.FullName && errors.FullName?.type == "required" && <div className='text-danger'>Full name is required.</div>}
                                </div>

                                <div class="form-group mt-5">
                                    <label>Store Name</label>
                                    <input type="text" class="form-control mt-1" name="StoreName" style={{width: "100%"}} {...register('StoreName', {required: true})}/>

                                    {errors.StoreName && errors.StoreName?.type == "required" && <div className='text-danger'>Store Name is required.</div>}
                                </div>

                                <div class="form-group mt-5">
                                    <label>GSTIN</label>
                                    <input type="text" class="form-control mt-1" name="GSTIN" style={{width: "100%"}} {...register('GSTIN', {required: true})}/>

                                    {errors.GSTIN && errors.GSTIN?.type == "required" && <div className='text-danger'>GSTIN is required.</div>}
                                </div>

                                <div class="form-group mt-3">
                                    <label>PHONE NUMBER</label>
                                    <input type="text" class="form-control mt-1" name="PhoneNumber" style={{width: "100%"}} {...register('PhoneNumber', {required: true})}/>

                                    {errors.PhoneNumber && errors.PhoneNumber?.type == "required" && <div className='text-danger'>Phone number is required.</div>}
                                </div>

                                <div class="form-group mt-3">
                                    <label>CITY</label>
                                    <input type="text" class="form-control mt-1" name="City" style={{width: "100%"}} {...register('City', {required: true})}/>

                                    {errors.City && errors.City?.type == "required" && <div className='text-danger'>City is required.</div>}
                                </div>                            
                            </div>

                            <div className='form-twofieldsdiv'>
                                <div class="form-group mt-5">
                                    <label>EMAIL ID</label>
                                    <input type="text" class="form-control mt-1" name="EmailId" style={{width: "100%"}} {...register('EmailId', {required: true})}/>

                                    {errors.EmailId && errors.EmailId?.type == "required" && <div className='text-danger'>Email Id is required.</div>}
                                </div>

                                <div class="form-group mt-3">
                                    <label>PASSWORD</label>
                                    <input type="password" class="form-control mt-1" name="Password" style={{width: "100%"}} {...register('Password', {required: true})}/>

                                    {errors.Password && errors.Password?.type == "required" && <div className='text-danger'>Password is required.</div>}
                                </div>

                            </div>
                        </div>

                        <p className='signup-terms mt-3'>I have read and agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></p>

                        <div class="mt-3">
                            <center><input type="submit" class="btn" value="SIGN UP"/></center>
                        </div>


                        <div className='redirect mt-3'>
                            <p>Already have an account ? <a className='red-signup' href="/login">Login</a></p>
                        </div>

                        <p className='signup-terms2 mt-2'>This form is protected by the Google Privacy Policy and Terms of Service apply</p>
                    
                    </form>
                </div>
            </div> 
        </div>







    )
}





