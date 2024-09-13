import './login.css';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { checkUser } from '../../../services/login.service';
import { getDataFromCookie, setDataInCookie } from '../../../services/storage.service';
import { store } from '../../../services/redux-storage.service';

export const Login = () => {
    
    const EmailIdRef = useRef();
    const PasswordRef = useRef();
        
    const[showEmailPasswordErrMsg, setShowEmailPasswordErrMsg] = useState(false);

    const navigate = useNavigate();

    async function checkLoggedInUser(data){

        let formData = new FormData();
        formData.append("EmailId", EmailIdRef.current.value);
        formData.append("Password", PasswordRef.current.value);

        let options = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }
 
        let res = await checkUser(formData, options);
        alert(JSON.stringify(res.data[0]));
        setDataInCookie(res.data[0]);

        //redux
        let action = {type: "userdata", data: res.data[0]}
        store.dispatch(action);


        if(res.data[0] != undefined){
            setShowEmailPasswordErrMsg(false);
            getDataFromCookie();
            navigate("/login");
        }
        else{
            setShowEmailPasswordErrMsg(true);
        }

    }    
    


    return(

        <div className="login">
            <div className="login-container">
                <div className='login-form mt-5'>

                    <h3 class="text-center">Login to your account</h3>

                    <form>

                        <div class="form-group mt-5">
                            <label>EMAIL ID</label>
                            <input type="text" class="form-control mt-1" name="EmailId" ref={EmailIdRef} style={{width: "100%"}}/>
                        </div>

                        <div class="form-group mt-3">
                            <label>PASSWORD</label>
                            <input type="password" class="form-control mt-1" name="Password" ref={PasswordRef} style={{width: "100%"}}/>
                        </div>

                        <div class="checkbox form-group mt-3">
                            <div>
                                <input type="checkbox" />
                                <label className="StaySignedIn" for="StaySignedIn">Stay signed in</label>
                            </div>
                        </div>
                    
                        <div class="mt-4">
                            <center><input type="submit" onClick={() => {
                                checkLoggedInUser();
                            }} className="btn" value="LOGIN"/></center>
                        </div>

                        <div class="mt-4">
                            <center>
                                {
                                    showEmailPasswordErrMsg == true && <div className='text-danger'>Incorrect Email/Password</div>
                                }
                            </center>
                        </div>

                        <p className='login-terms mt-2'>This form is protected by the Google Privacy Policy and Terms of Service apply</p>

                        <div className='redirect'>
                            <p>New at Farmart ? <a className='red-signup' href="/signup">Sign Up</a></p>
                            <a className='forgot-pass' href="#">Forgot Password?</a>
                        </div>
                        
                    
                    </form>
                </div>
            </div> 
        </div>







    )
}





