import { Route, Routes } from "react-router-dom"
import { Menu } from "./components/layout/menu/menu"
import { Login } from "./components/registration/login/login"
import { Home } from "./components/home/home"
import { Signup } from "./components/registration/signup/signup"
import { Footer } from "./components/layout/footer/footer"
import { Layout } from "./components/layout/layout"
import { ViewWishlist } from "./components/wishlist/view-wishlist/view-wishlist"
import { ViewCart } from "./components/cart/view-cart/view-cart"
import { Product } from "./components/product/product"
import { Checkout } from "./components/checkout/checkout"


export const AppRouter = () => {
    return(
        <div>
            <Menu></Menu>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/signup' element={<Signup></Signup>}></Route>
                <Route path='/view-cart' element={<ViewCart></ViewCart>}></Route>
                <Route path='/view-wishlist' element={<ViewWishlist></ViewWishlist>}></Route>
                <Route path='/checkout' element={<Checkout></Checkout>}></Route>
                
            </Routes>
            <Footer/>

        </div>

    )
}


