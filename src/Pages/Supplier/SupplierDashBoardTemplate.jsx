import { FaCross, FaPlus, FaUser, FaX } from "react-icons/fa6"
import "./SupplierHome.css"
import { InputBox } from "../../Components/InputBox/Input"
import { useState } from "react"
import { FaArrowCircleLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
// import Notification from "../../Components/Notofication/Notification"

export function BackButton() {
    const navigate = useNavigate();
    return (<div className="backBtn" onClick={() => navigate(-1)}><FaArrowCircleLeft /> Back</div>);
}


const SupplierDashBoardTemplate = (props) => {
    const { name } = JSON.parse(localStorage.getItem('user'))
    const { notificationMessage } = props;
    const navigate = useNavigate();
    return (
        <>
            {/* {notificationMessage && <Notification message={notificationMessage} callBack={setNotificationMessage} />} */}

            <div className="supplierContainer">
                <BackButton navigate={navigate}></BackButton>
                <div className="profile">
                    <div className="name">{name}</div>
                    <div className="icon"><FaUser /></div>
                </div>


                {props.children}

            </div>
            <div className="supplierBg" />

        </>
    )
}

export default SupplierDashBoardTemplate