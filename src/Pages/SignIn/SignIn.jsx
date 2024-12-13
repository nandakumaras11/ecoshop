import { useEffect } from "react";
import { InputBox } from "../../Components/InputBox/Input";
import WithGuestMenu from "../../Hoc/WithGuestMenu";
import "./SignIn.css"
import { GoogleLogin } from '@react-oauth/google';
import { httpRequest } from "../../lib/API";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaX, FaXTwitter } from "react-icons/fa6";

const SignIn = () => {
    let googleURL = null;
    const navigate = useNavigate();
    useEffect(() => {
        httpRequest("get", 'auth/google').then(({ url }) => {
            googleURL = url;
            console.log(url);
            // httpRequest("POST", url).then((data) => {
            //     console.log(data);

            // });
        });

    }, [])

    return (
        <div className="signInContainer">
            <div className="left">
                <h2>Join us, in our cause towards making the world an awesome place..!</h2>
            </div>
            <div className="right">
                <div className="form">
                    <h2>Sign In</h2>
                    {/* <div className="customLogin">
                        <div className="email">
                            <InputBox name="email" placeholder="Email" />
                        </div>
                        <div className="password">
                            <InputBox name="password" placeholder="Password" />
                        </div>
                        <div className="signInBtn">Sign In</div>
                    </div> */}
                    <div className="gLoginBtn">
                        <div className="signInBtn" onClick={() => window.open(googleURL, "_self")}>
                            <img src="/google_icon.svg" alt="" />
                            Sign up with Google</div>
                        {/* <GoogleLogin
                            width="500"

                            onSuccess={credentialResponse => {
                                console.log(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />; */}
                    </div>
                    <p>By creating an account you agree with our,Terms of Service, Privacy Policy and default Notification Settings.</p>
                    <SocialMediaBar />
                </div>
            </div>
        </div>
    )
}


export const SocialMediaBar = ({ color = "white" }) => {
    return (
        <div className="socialMediaBar" style={{ color: color }}>
            <a className="socialMedia" href="https://www.instagram.com/makingworldawesome/" >
                <div className="icon">
                    <FaInstagram />
                </div>
            </a>

            <a href="mailto:info@makingworldawesome.com" className="socialMedia">
                <div className="icon">
                    <FaEnvelope />
                </div>
            </a>
            <a href="https://youtube.com/@makingworldawesome?feature=shared" className="socialMedia">
                <div className="icon">
                    <FaYoutube />
                </div>
            </a>
            <a href="https://x.com/makeworldawes?s=11&t=-sX7ad468_RpwPPeVUufMA " className="socialMedia">
                <div className="icon">
                    <FaXTwitter />
                </div>
            </a>
            <a href="http://www.linkedin.com/in/making-world-awesome-882212338" className="socialMedia">
                <div className="icon">
                    <FaLinkedinIn />
                </div>
            </a>
        </div >

    )
}

export default WithGuestMenu(SignIn)