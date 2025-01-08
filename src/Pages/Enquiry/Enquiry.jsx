import { useLocation, useNavigate } from "react-router-dom";
import { InputBox } from "../../Components/InputBox/Input"
import WithGuestMenu from "../../Hoc/WithGuestMenu"
import "./Enquiry.css"
import { httpRequest } from "../../lib/API";
import { useState } from "react";
import Notification from "../../Components/Notofication/Notification";
import { BackButton } from "../Supplier/SupplierDashBoardTemplate";
const Enquiry = WithGuestMenu(() => {
    const { state: { id, product_name, material, product_details, min_order_quantity, image } } = useLocation();
    const [notificationMessage, setNotificationMessage] = useState(null);
    console.log(product_details);

    const enquiryInitialState = {
        "name": "",
        "company_name": "",
        "company_address": "",
        "email": "",
        "phone": "",
        "quantity": "",
        "requirement": ""
    }
    const [enquiryInfo, setEnquiryState] = useState(enquiryInitialState);
    const handleEnquiryState = (state) => {
        console.log({ ...enquiryInfo, ...state })
        setEnquiryState({ ...enquiryInfo, ...state })
    }
    const { name, company_name, company_address, email, phone, quantity, requirement
    } = enquiryInfo;

    const navigate = useNavigate();
    product_name == null && navigate('/product');
    // console.log(state);
    let sendEnquiry = () => {
        // alert("aa")
        let formData = new FormData();
        for (let key in enquiryInfo) {
            formData.append(key, enquiryInfo[key])
        }

        httpRequest("post", `product/${id}/inquiry`, formData, {
            "Authorization": `Bearer ${localStorage.getItem("GToken")} `
        }).then(({ message }) => {
            // alert(message);
            setNotificationMessage(message);
            setEnquiryState(enquiryInitialState);
            // setNotificationMessage(message);

        }).catch(({ response: { data: { errors } } }) => {
            // let msg = "";
            // for (let key in errors) {
            //     msg = msg + errors[key];
            // }

            // setNotificationMessage(msg);
            setNotificationMessage("Some required fields are missing");
        })
    }
    return (
        <>
            {notificationMessage && <Notification message={notificationMessage} callBack={setNotificationMessage} />}
            <section className="enquiryContainer">
                <BackButton />
                <img src="/leaft.png" alt="" className="leftBg" />
                <img src="/leaft.png" alt="" className="rightBg" />
                <h2>PRODUCT</h2>
                <div className="productDetails">
                    <div className="left">
                        <img src={`https://eco.makingworldawesome.com/${image}`} height="220" className="pImage" alt="" />
                        <div className="pdetails">  <div className="pname">{product_name}</div>
                            <div className="Material"><b>Material</b> : {material} </div>
                            <div className="minOrderQuantity"><b>Minimum order quantity :</b> <span>{min_order_quantity}</span></div>
                            <span><p>{product_details}</p>
                            </span>
                        </div>
                    </div>
                    <div className="right">
                        <div className="row">
                            <div className="col">
                                <InputBox name="Name" icon="name.svg"
                                    value={name}
                                    on_change={(e) => handleEnquiryState({ name: e.target.value })} />
                            </div>
                            <div className="col">
                                <InputBox name="Company Name" icon="company.svg"
                                    value={company_name}
                                    on_change={(e) => handleEnquiryState({ company_name: e.target.value })}

                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <InputBox name="Company Address "
                                    value={company_address}
                                    on_change={(e) => handleEnquiryState({ company_address: e.target.value })}
                                    icon="address.svg" />
                            </div>
                            <div className="col">
                                <InputBox
                                    value={email}
                                    name="Email"
                                    on_change={(e) => handleEnquiryState({ email: e.target.value })}
                                    icon="email.svg" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <InputBox name="Phone Number"
                                    value={phone}
                                    on_change={(e) => handleEnquiryState({ phone: e.target.value })}
                                    icon="phone.svg" />
                            </div>
                            <div className="col">
                                <InputBox name="Quantity"
                                    value={quantity}
                                    on_change={(e) => handleEnquiryState({ quantity: e.target.value })}
                                    icon="quantity.svg" />
                            </div>
                        </div>
                        <div className="requirement">
                            <textarea className="requirementInput" placeholder="Enter your requirement "
                                value={requirement}
                                name="" id="" rows={6}
                                onChange={(e) => handleEnquiryState({ requirement: e.target.value })}
                            ></textarea>
                        </div>
                        <div className="enquiryBtn" onClick={() => sendEnquiry()} >Enquiry</div>
                    </div>
                </div>
            </section>
        </>
    )
})

export default Enquiry



