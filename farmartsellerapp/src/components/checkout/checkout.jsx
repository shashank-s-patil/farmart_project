import './checkout.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';


export const Checkout = () => {

    const{
        register,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    async function saveData(data){

        let formData = new FormData();
        // formData.append("ProductId", ProductId);
        // formData.append("ProductCategory", data.ProductCategory);


        let options = {
            headers: {
                "content-type": "multipart/form-data"
            }
        }

        // let res = await axios.post("http://localhost:5000/saveProduct", formData, options);
        // navigate("/");

    }



    return(

        <div>

            <h3 className="heading text-center pt-3 pb-2">Checkout</h3>

            <div className='checkout'>
                <div className="checkout-left">

                    <div class="form-group mt-4 mb-4 del-Address">
                        <h5>1. Delivery Address</h5>
                        <div className='show-address'>
                            <p>Shashank Patil <br />17/2, Santosh bhavan, Sadguru Nagar, MIDC, Jalgaon <br />Jalgaon, MAHARASHTRA 425003</p>                            
                            <a href="#">Add delivery instructions</a>
                        </div>
                        <a href="#">Change</a>

                        {errors.DeliveryAddress && errors.DeliveryAddress?.type == "required" && <div className='text-danger'>Delivery Address is required.</div>}
                    </div>
                    <hr />


                    <h5 className='heading-payment'>2. Select a payment method</h5>

                    <form onSubmit={handleSubmit(data => {
                        saveData(data)
                    })}>

                        <div className='form-data'>

                            <div class="form-group mt-4 avail-bal-div">
                                <h5>Your available balance</h5>
                                <hr />

                                <div className='avail-bal'>
                                    <input type="text" class="form-control mt-1" name="AvailableBalance" style={{width: "30%"}} {...register('AvailableBalance', {required: true})}/> 
                                    <button className='btn btn-light ms-4' value="Apply">Apply</button>
                                </div>
                                {errors.AvailableBalance && errors.AvailableBalance?.type == "required" && <div className='text-danger'>Available Balance field is required.</div>}
                            </div>

                            <div class="form-group mt-4 payment-method">
                                <h5>Another payment method</h5>
                                <hr />

                                <input type="radio" value="Credit or debit card" name="PaymentMethod" {...register('PaymentMethod', {required: true})}/><label className='ms-1 me-3'>Credit or debit card</label><br />                        
                                <img src={require('../../assets/images/payment.png')}/> <br /><br />

                                <input type="radio" value="Net Banking" name="PaymentMethod" {...register('PaymentMethod', {required: true})}/><label className='ms-1 me-3'>Net Banking</label><br />
                                <input type="radio" value="Other UPI Apps" name="PaymentMethod" {...register('PaymentMethod', {required: true})}/><label className='ms-1 me-3'>Other UPI Apps</label><br />
                                <input type="radio" value="Cash on Delivery/Pay on Delivery" name="PaymentMethod" {...register('PaymentMethod', {required: true})}/><label className='ms-1 me-3'>Cash on Delivery/Pay on Delivery</label>

                            </div>
                            <hr />

                            <div class="mt-2 mb-2">
                                <input type="submit" class="btn btn-warning" value="Use this payment method"/>
                            </div>

                        </div>

                    </form>
                    <hr />

                    <h5 className='text-secondary'>3.  Offers</h5><hr />
                    <h5 className='text-secondary'>4. Items and delivery</h5><hr />

                    <p className='mt-5 info-para'>
                        Need help? Check our <a href="#">help pages</a> or <a href="#">contact us</a> <br /><br />
                        When your order is placed, we'll send you an e-mail message acknowledging receipt of your order. If you choose to pay using an electronic payment method (credit card, debit card or net banking), you will be directed to your bank's website to complete your payment. Your contract to purchase an item will not be complete until we receive your electronic payment and dispatch your item. If you choose to pay using Pay on Delivery (POD), you can pay using cash/card/net banking when you receive your item. <br /><br />
                        See Amazon.in's <a href="#">Return Policy</a>. <br /><br />

                        Need to add more items to your order? Continue shopping on the <a href="#">Amazon.in homepage</a>.
                    </p>

                </div>
    
                <div className="checkout-right">

                    <div className='right-data'>
                        <div class="mt-2 mb-2">
                            <center><input type="submit" class="btn btn-warning" value="Use this payment method"/></center>
                        </div>

                        <p>Choose a payment method to continue checking out. You will still have a chance to review and edit your order before it is final.</p>
                        <hr />
                        <h5 className='heading'>Order Summary</h5> <br /><br /><br />

                        <hr />
                        <h5 className='heading'>Order Total:</h5>
                        <hr />

                        <a href="#">How are delivery costs calculated?</a>
                    </div>
                    

                </div>   
            </div>

                     

        </div>

    )
}