import { Route, Routes } from "react-router-dom"
import { Menu } from "./components/layout/menu/menu"
import { Login } from "./components/registration/login/login"
import { Home } from "./components/home/home"
import { Signup } from "./components/registration/signup/signup"
import { Footer } from "./components/layout/footer/footer"
import { SellProduct } from "./components/sell-product/sell-product"
import { Checkout } from "./components/checkout/checkout"
import { ViewSellerProducts } from "./components/view-seller-products/view-seller-products"


export const AppRouter = () => {
    return(
        <div>
            <Menu></Menu>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/signup' element={<Signup></Signup>}></Route>
                <Route path='/view-seller-products' element={<ViewSellerProducts></ViewSellerProducts>}></Route>
                <Route path='/sell-product' element={<SellProduct></SellProduct>}></Route>
                <Route path='/checkout' element={<Checkout></Checkout>}></Route>
                
            </Routes>
            <Footer/>

        </div>

    )
}


