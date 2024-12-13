import Menu from "../../Components/Menu/Menu"
import WithGuestMenu from "../../Hoc/WithGuestMenu"
import "./Home.css"
const Home = WithGuestMenu(() => {
    return (
        <>

            <div className="home">
                <div className="banner">
                    <h1>Home</h1>
                </div>
                <div className="story">
                    <h4>Story</h4>
                    <p>Our journey began with a shared vision among people passionate about making the world better. We believe in the power of eco-friendly products and the innovative minds behind them. However, these innovations often lack the recognition and support they deserve. We wanted to make them accessible to everyone, no matter where they are.</p>
                    <p>
                        Driven by this goal, we created a platform to connect creators and providers worldwide. Our platform fosters collaboration, enabling the exchange of ideas and products that promote sustainability and environmental awareness.
                    </p>
                    <p>
                        We advocate change, progress, and a brighter future for generations to come. Join us, as we work towards more sustainable and harmonious world.</p>
                </div>
                <img src="/home_b_right.png" alt="" className="borderImageRight" />
                <img src="/home_b_left.png" alt="" className="borderImageLeft" />
            </div >
        </>
    )
})

export default Home