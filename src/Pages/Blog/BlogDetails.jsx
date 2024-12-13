import { useParams } from "react-router-dom";
import { blogs, SocialMediaLinks } from "../../constents"
import "./BlogDetails.css"
import WithGuestMenu from "../../Hoc/WithGuestMenu";
import { useEffect, useState } from "react";
import parse from 'html-react-parser'
import { httpRequest } from "../../lib/API";
export const BlogDetails = WithGuestMenu(() => {
    // console.log);
    const { blogSlug } = useParams();
    let [blog, setBlog] = useState({ heading: null, subheading: null, img: null, description: null })
    useEffect(() => {
        httpRequest("get", `post/${blogSlug}`).then(({ post }) => {
            setBlog(post);
            console.log(post);

        })

    }, [])
    const { title, created_at, image, content } = blog;
    return (
        <div className="blogDetailsContainer">
            {/* <div className="blogTitleBar"> */}
            <h6> <span>Blog ---</span>{title}</h6>
            <h2>{title}</h2>
            <img src={`${image}`} className="blogImg" width="100%" alt="" />
            <h3>{created_at}</h3>
            <p>{content && parse(content)}</p>
            {/* </div> */}
            <div className="socialMediaBar">    {SocialMediaLinks.map(({ icon, link }) => {
                return <div className="socialMediaLink">
                    {icon}
                </div>
            })}</div>
        </div>
    )
})
