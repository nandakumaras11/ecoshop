import "./AddProduct.css"
import SupplierDashBoardTemplate from '../SupplierDashBoardTemplate'
import { InputBox } from "../../../Components/InputBox/Input"
import { useRef } from "react"
import { useState } from "react"
import { httpRequest } from "../../../lib/API"
import Notification from "../../../Components/Notofication/Notification"

const AddProducts = () => {
    const productFileRef = useRef(null);
    const [productInfo, handlerProductDetails] = useState({ product_name: "", material: "", min_order_quantity: "", seller_product_code: "", product_details: "" });
    let { product_name, material, min_order_quantity, seller_product_code, product_details } = productInfo;
    const handleProductState = (state) => {
        console.log({ ...productInfo, ...state })
        handlerProductDetails({ ...productInfo, ...state })
    }
    const [notificationMessage, setNotificationMessage] = useState(null);
    const saveProductDetails = () => {
        console.log("aa")
        let formData = new FormData();
        for (let key in productInfo) {
            formData.append(key, productInfo[key])
        }

        console.log(productFileRef.current.files[0]);

        formData.append("image", productFileRef.current.files[0])
        httpRequest("post", `company/${localStorage.getItem('user_id')}/product`, formData, { "Authorization": `Bearer ${localStorage.getItem("GToken")}`, 'Content-Type': 'multipart/form-data', }).then(({ message }) => {

            setNotificationMessage(message);
        }).catch(({ response: { data: { errors } } }) => {
            setNotificationMessage("Some required fields are missing");
        })
    }
    return (
        <SupplierDashBoardTemplate >
            {notificationMessage && <Notification message={notificationMessage} callBack={setNotificationMessage} />}
            <img src="/addProductLeftBg.png" className="leftBottomBg" alt="" />
            <div className="addProductsContainer">
                <div className="imgContainer" onClick={() => productFileRef.current.click()}>
                    <img src="/uploadIcon.svg" alt="" />
                    <input type="file" name="upload_product" ref={productFileRef} hidden id="upload_product" />
                    <label >Upload Image </label>
                </div>
                <div className="form">
                    <div className="row">
                        <div className="col"><InputBox name="Name" on_change={(e) => handleProductState({ product_name: e.target.value })} value={product_name} icon="name.svg" placeholder="Chair" /> </div>
                        <div className="col"> <InputBox name="Material" on_change={(e) => handleProductState({ material: e.target.value })} value={material} icon="glob.svg" placeholder="Teak Wood" /> </div>
                        {/* <div className="col"><InputBox name="Email" icon="email.svg" placeholder="abc@gmail.com" />   </div> */}
                    </div>
                    <div className="row">
                        <div className="col"><InputBox name="Min Order Quantity" icon="name.svg" placeholder="450" value={min_order_quantity} on_change={(e) => handleProductState({ min_order_quantity: e.target.value })} /> </div>
                        <div className="col"> <InputBox name="Seller product code" value={seller_product_code} on_change={(e) => handleProductState({ seller_product_code: e.target.value })} icon="glob.svg" placeholder="S1244" /> </div>
                        {/* <div className="col"><InputBox name="Email" icon="email.svg" placeholder="abc@gmail.com" />   </div> */}
                    </div>
                    <div className="requirement">
                        <div className="name"> Product Details </div>
                        <textarea className="requirementInput" onChange={(e) => handleProductState({ product_details: e.target.value })} placeholder="Enter your requirement " name="" id="" rows={6} value={product_details} > </textarea>
                    </div>
                    <div className="uploadBtn" onClick={() => saveProductDetails()}>UPLOAD</div>
                </div>


            </div>
        </SupplierDashBoardTemplate >
    )
}

export default AddProducts