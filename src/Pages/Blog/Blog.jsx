import { useNavigate } from "react-router-dom"
// import { blogs } from "../../constents"
import WithGuestMenu from "../../Hoc/WithGuestMenu"
import parse from 'html-react-parser'
import "./Blog.css"
import { useEffect, useState } from "react"
import { httpRequest } from "../../lib/API"
export const Blog = WithGuestMenu(() => {

    let [blogs, setBlogs] = useState(null)
    useEffect(() => {
        httpRequest("get", "allpost").then(({ posts }) => {
            console.log(posts);

            setBlogs(posts);
        })

    }, [])
    return (
        <div className="blogContainer">
            <div className="blogbanner">
                <h2>Blogs</h2>
                <p>Welcome to Making World Awesome: Discover Sustainable ways that help you live green and make a positive impact on our planet</p>
            </div>
            <div className="blogCards">
                {blogs && blogs.map((blog, key) => <BlogCard blog={blog} key={key} />)}
            </div>
        </div>
    )
})

// export const Blog 

const BlogCard = ({ blog: { slug, title, image, content } }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className="card" onClick={() => navigate(`${slug}`)}>

                <img src={image} className="blogImg" alt="" />
                <div className="textArea">
                    <h3 className="blogName">{title}</h3>
                    <p className="description">{parse(content.slice(0, 150))}</p>
                </div>
            </div>
        </>
    )
}

export default Blog