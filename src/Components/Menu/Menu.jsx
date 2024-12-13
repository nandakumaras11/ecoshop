
import { FaBars, FaHome, FaInfoCircle, FaShoppingBag } from "react-icons/fa"
import "./Menu.css"
import { FaBook, FaInfo, FaUser, FaX } from "react-icons/fa6"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Menu = () => {
    const menus = [
        {
            icon: <FaHome />,
            name: "Home",
            link: "/Home"
        },
        {
            icon: <FaInfoCircle />,
            name: "About",
            link: "/About"
        },
        {
            icon: <FaBook />,
            name: "Blogs",
            link: "/Blogs"
        },
        {
            icon: <FaShoppingBag />,
            name: "Products",
            link: "/Product"
        },
        {
            icon: <FaUser />,
            name: "Seller",
            link: "/signin"
        }
    ];
    const navigate = useNavigate();
    const [isMenuOpened, handleMenu] = useState(false);
    return (
        <div className="links">
            {(window.location.pathname == "/" || window.screen.width < 990) && <>
                <div className="menuControls">{isMenuOpened ? <FaX onClick={() => handleMenu(false)} /> : <FaBars onClick={() => handleMenu(true)} />}</div>
                {<nav className={isMenuOpened ? 'visible' : 'hidden'}>
                    {menus.map(({ icon, name, link }) => {
                        return <div className="menuItem" onClick={() => { navigate(link); handleMenu(false) }}>
                            <div className="icon">{icon}</div>
                            <div className="name">{name}</div>
                            {/* <div className="link">{link}</div> */}
                        </div>
                    })}

                </nav>}
            </>}
            {window.location.pathname != "/" &&
                <div className="logo" onClick={() => { navigate("/") }}>
                    {/* landing */}
                    <img src="/logo.png" width="80px" alt="" srcset="" />
                </div>

            }
        </div>
    )
}

export default Menu