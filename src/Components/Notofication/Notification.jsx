import "./Notification.css"
const Notification = ({ message, success = true, callBack }) => {
    console.log(callBack)
    setTimeout(() => {
        callBack && callBack(null);
    }, 4000);
    return (
        <>
            <div className="notificationContainer">
                <div className="close" onClick={() => callBack(null)}>X</div>
                <div className="icon">{success && <img src="/info.png" width="30px" alt="" />}</div>
                <div className="message">{message}</div>
            </div>
        </>
    )
}

export default Notification