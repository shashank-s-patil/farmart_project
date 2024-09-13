import './view-products.css';

import React from 'react';
import { Product } from '../../components/product/product';
import { getProducts } from '../../services/product.service';


export class ViewProducts extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount(){
        this.getProducts();
        
    }

    async getProducts(){
        let response = await getProducts();
        this.setState({
            products: response.data
        });
        
    }


    render(){
        return(

            <div>
                <div>
                    {
                        this.state.products && this.state.products.map((product) => {
                            <Product ProductCategory={product.ProductCategory} ProductName={product.ProductName} MRP={product.MRP} OfferPrice={product.OfferPrice}></Product>
                        })
                    }
                </div>
            </div>



        )
    }
}















