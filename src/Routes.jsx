import { useRoutes } from "react-router-dom";
import Home from "./Pages/Home/Home";

import { Blog } from './Pages/Blog/Blog'
import { BlogDetails } from './Pages/Blog/BlogDetails'
import Enquiry from './Pages/Enquiry/Enquiry'

import Product from './Pages/Product/Product'
import AddProducts from './Pages/Supplier/AddProducts/AddProducts'
import SupplierHome from './Pages/Supplier/SupplierHome'
import About from "./Pages/About/About";
import SignIn from "./Pages/SignIn/SignIn";
import LandingPage from "./Pages/LandingPage/LandingPage";


export const AllRoutes = () => {
    let element = useRoutes([
        {
            path: "/",
            element: <LandingPage />
        },
        {
            path: "/Home",
            element: <Home />
        },
        {
            path: "/About",
            element: <About />
        },
        {
            path: "/Blogs",
            element: <Blog />
        },
        {
            path: "/Enquiry",
            element: <Enquiry />
        },
        {
            path: "/Product",
            element: <Product />
        },
        {
            path: "/SignIn",
            element: <SignIn />
        },
        {
            path: "/Product/:productName",
            element: <Enquiry />
        },
        {
            path: "/AddProducts",
            element: <AddProducts />
        },
        {
            path: "/SupplierHome",
            element: <SupplierHome />
        },

        {
            path: "/Blogs/:blogSlug",
            element: <BlogDetails />
        },

    ]);

    return element;
}
