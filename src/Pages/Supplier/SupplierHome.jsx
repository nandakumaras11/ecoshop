import { FaCross, FaPlus, FaUser, FaX } from "react-icons/fa6"
import "./SupplierHome.css"
import { InputBox } from "../../Components/InputBox/Input"
import { useEffect, useRef, useState } from "react"
import SupplierDashBoardTemplate from "./SupplierDashBoardTemplate"
import { httpRequest } from "../../lib/API"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import Notification from "../../Components/Notofication/Notification"
const SupplierHome = () => {
    const [searchParams] = useSearchParams();

    const data = searchParams.get("data");
    // let data = useSearchParams();
    if (data) {
        const decodedData = JSON.parse(atob(data));
        let { original: { token, user } } = decodedData
        console.log(user);
        localStorage.setItem("GToken", token);
        localStorage.setItem('user_id', user.id)
        localStorage.setItem("user", JSON.stringify(user));
    }
    const [isModelHidden, handleModel] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [tearmAndConditions, setTermsAndCondition] = useState(false)
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    let [companyInfo, setCompanyInfo] = useState({ name: null, address: null, manufacturing_country: null, contact_person: null, country: null, email: null, phone: null, website: null });
    const handleCompanyState = (state) => {
        setCompanyInfo({ ...companyInfo, ...state })
    }
    let { name, address, manufacturing_country, contact_person, country, email, phone, website } = companyInfo;
    const saveCompanyDetails = () => {
        let formData = new FormData();
        for (let key in companyInfo) {
            formData.append(key, companyInfo[key])
        }
        httpRequest("post", "company", formData, { "Authorization": `Bearer ${localStorage.getItem("GToken")}` }).then(({ message }) => {
            // alert(message);
            setNotificationMessage(message);

        }).catch(({ response: { data: { errors } } }) => {

            setNotificationMessage("Some required fields are missing");
        })
        console.log(formData);
    }
    const deleteProduct = (id) => {
        httpRequest("post", `deleteproduct/${id}`, {}, { "Authorization": `Bearer ${localStorage.getItem("GToken")}` }).then(({ message }) => {
            setNotificationMessage(message);
            getSupplierHomeDetails();
        }).catch(({ response: { data: { errors } } }) => {

            setNotificationMessage("An error occurred.");
        })
    }
    const getSupplierHomeDetails = () => {
        httpRequest("get", `company/${localStorage.getItem('user_id')}`, null, { "Authorization": `Bearer ${localStorage.getItem("GToken")}` }).then((data) => {
            setCompanyInfo(data.company)
        })
        httpRequest("get", `company/${localStorage.getItem('user_id')}/products`, null, { "Authorization": `Bearer ${localStorage.getItem("GToken")}` }).then(({ products }) => {
            setProducts(products)
        })
    }
    useEffect(() => {
        getSupplierHomeDetails();
    }, [])
    return (
        <>
            {notificationMessage && <Notification message={notificationMessage} callBack={setNotificationMessage} />}
            <SupplierDashBoardTemplate>
                <div className="companyprofile">
                    <h3>Company Profile</h3>
                    <div className="row">
                        <div className="col"><InputBox name="Company name" icon="company.svg" placeholder="Alpha" value={name && name} on_change={(e) => handleCompanyState({ name: e.target.value })} /> </div>
                        <div className="col"> <InputBox name="Company Address" on_change={(e) => handleCompanyState({ address: e.target.value })} value={address} icon="address.svg" placeholder="John Doe 123 Maple Street Springfield, IL 62704" /> </div>
                        <div className="col"><InputBox name="Manufacturing Country" on_change={(e) => handleCompanyState({ manufacturing_country: e.target.value })} value={manufacturing_country} icon="glob.svg" placeholder="UAE" />   </div>
                    </div>
                </div>
                <div className="companyDetails">
                    <h3>Company Details</h3>
                    <div className="row">
                        <div className="col"><InputBox value={contact_person} on_change={(e) => handleCompanyState({ contact_person: e.target.value })} name="Contact Person" icon="name.svg" placeholder="John" /> </div>
                        <div className="col"> <InputBox value={country} on_change={(e) => handleCompanyState({ country: e.target.value })} name="Country" icon="glob.svg" placeholder="John Doe 123 Maple Street Springfield, IL 62704" /> </div>
                        <div className="col"><InputBox name="Email" on_change={(e) => handleCompanyState({ email: e.target.value })} value={email} icon="email.svg" placeholder="abc@gmail.com" />   </div>
                    </div>
                    <div className="row">
                        <div className="col"><InputBox name="Phone" on_change={(e) => handleCompanyState({ phone: e.target.value })} value={phone} icon="phone.svg" placeholder="+9845632101" /> </div>
                        <div className="col">
                            <InputBox name="Company website (optional)" on_change={(e) => handleCompanyState({ website: e.target.value })} value={website} icon="website.svg" placeholder="facebook.com" />
                        </div>
                        <div className="col">  </div>

                    </div>
                </div>
                <div className="addProductBtn" onClick={() => { navigate("/AddProducts") }}>
                    <div className="icon"><FaPlus /></div>
                    <div className="text">Add Product</div>
                </div>
                <div className="supplier-products">
                    {products.map(({ id, product_name, material, min_order_quantity }) => {
                        return <div className="productRow">
                            <div className="pcol">{id}</div>
                            <div className="pcol">{product_name}</div>
                            <div className="pcol">{material}</div>
                            <div className="pcol">{min_order_quantity}</div>
                            <div className="pcol pclose" onClick={() => deleteProduct(id)}> <FaX /> </div>
                        </div>
                    })}


                </div>
                <div className="footer">
                    <div className="terms">
                        <input type="checkbox" name="" value={tearmAndConditions} id="terms" onClick={(e) => { console.log(e); setTermsAndCondition(e.target.checked) }} />
                        <label htmlFor="terms"> I agree with <span onClick={() => handleModel(true)}>Terms of Service, Privacy Policy.</span></label>
                    </div>
                    {tearmAndConditions && <div className="buttons">
                        <div className="btn discard">Discard</div>
                        <div className="btn submit" onClick={() => saveCompanyDetails()}>Submit</div>
                    </div>}
                </div>

                <div className="supplierBg" />
                {isModelHidden && <div className="termsAndConditions">
                    <div className="modal">

                        <h3>Terms and Conditions</h3>
                        <h4>Your Agreement</h4>
                        <p>We take your privacy seriously and will only use your personal information to manage your account and provide the products and services you have requested from us.</p><p>

                            • These services include, but are not limited to, connecting you with international wholesale buyers, suppliers, manufacturers, and intermediaries for B2B trade.</p><p>

                            • From time to time, we would like to contact you with details about our promotions, updates, and to update our database. These communications may be sent via post, email, telephone, or text messages.
                        </p>
                        <p>
                            We would like to share information about your product with interested parties. While we never share your contact information with users, all inquiries from such users will be directed to you through our website.

                            You control the data we collect and how it is used.</p>
                        {/* <div className="closeBtn">
                        <FaX />
                    </div> */}
                        <img src="/leaf.png" className="leftImg" alt="" />

                        <img src="/leaf.png" className="rightImg" alt="" />
                        <div className="buttons">
                            <div className="btn closeBtn" onClick={() => handleModel(false)}>Close</div>
                        </div>

                    </div>
                </div>}
            </SupplierDashBoardTemplate>
        </>
    )
}

export default SupplierHome