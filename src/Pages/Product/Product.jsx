import { FaArrowRightLong } from "react-icons/fa6"
import "./Product.css"
import WithGuestMenu from "../../Hoc/WithGuestMenu"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { httpRequest } from "../../lib/API"
const Product = WithGuestMenu(() => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        httpRequest("get", "products").then(({ products }) => {
            setProducts(products);
        }
        );


    }, [])

    return (
        <section className="products">
            <h2>Products</h2>
            <div className="productContainer">
                {products && products.map((product => <ProductCards productDetails={product} />))}
            </div>
        </section>
    )
})

export default Product


export const ProductCards = ({ productDetails }) => {
    const { product_name, image } = productDetails;
    const navigate = useNavigate();
    // console.log(image);
    // productDetails
    return (
        <div className="product">
            {/* <img src="/productsample.png" alt="" /> */}
            <img src={`https://eco.makingworldawesome.com/${image}`} alt="" />
            <div className="textDetails">
                <h5>{product_name}</h5>
                <div className="enquiryBtn" onClick={() => { navigate(product_name, { state: productDetails }) }}>Enquiry <FaArrowRightLong /> </div>
            </div>
        </div>
    )
}
