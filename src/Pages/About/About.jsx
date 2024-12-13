import "./About.css"
import WithGuestMenu from "../../Hoc/WithGuestMenu"
const About = () => {
    return (
        <section className="about">
            <h1>ABOUT US</h1>
            <div className="aboutContainer">
                <div className="whatWeDo card">
                    <img src="/whatwedo.png" className="aboutCardIcon" alt="" />
                    <h4>What We Do</h4>
                    <p>To inspire you to live life to the full, promoting a healthy lifestyle, encouraging our customers to enjoy the beautiful world around us and letting you rest easy knowing you’ve made the positive choices for people and the planet</p>
                </div>
                <div className="visionMission">
                    <div className="mission card">
                        <h4>Our Mission</h4>
                        <p>The income generated from our Movement will be utilised to make a city awesome as the first step in making the world awesome</p>
                    </div>
                    <div className="vision card">
                        <h4>Our Vision</h4>
                        <h4>Making  World  Awesome</h4>
                    </div>
                </div>
                <div className="whyWeDo card">
                    <img src="/whywedo.png" className="aboutCardIcon" alt="" />
                    <h4>Why We Do</h4>
                    <p>We strive to protect our planet, and make efforts to find eco-friendly alternatives to everyday items such as fashion, food, stationary and cleaners that do as little harm to the environment as possible -we want to give you the choice to use environment friendly products that suit your lifestyle.</p>
                </div>
            </div>
        </section>
    )
}

export default WithGuestMenu(About)