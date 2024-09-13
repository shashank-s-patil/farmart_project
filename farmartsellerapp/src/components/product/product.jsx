import './product.css';

export function Product(props){
    return(

        <div className='card mt-3'>
            <div className='card-header'>
                <p>{props.ProductCategory}</p>
                {/* <p><i class="fa-solid fa-heart wishlist" onClick={() => addToWishlist(item.ProductId)}></i></p> */}
            </div>

            <div className='card-body'>   
                {/* <img src={props.ProductImage}/> */}
            </div>

            <div className='card-footer'>
                <h6> {props.ProductName}</h6>
                <p className='text-secondary'> <span>MRP:</span> {props.MRP}</p>
                <p className='text-primary'> <span>Offer Price:</span> {props.OfferPrice}</p>
                    
                <div>
                    <center>
                        {/* <button className='btn mb-2' onClick={() => addToCart(props.ProductId)}>Add to Cart</button> */}
                    </center>
                </div>
                
            </div> 
        
        </div>


    )
}