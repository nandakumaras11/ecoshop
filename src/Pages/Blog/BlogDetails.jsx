import { useParams } from "react-router-dom";
import { blogs, SocialMediaLinks } from "../../constents"
import "./BlogDetails.css"
import WithGuestMenu from "../../Hoc/WithGuestMenu";
import { useEffect, useState } from "react";
import parse from 'html-react-parser'
import { httpRequest } from "../../lib/API";
import { BackButton } from "../Supplier/SupplierDashBoardTemplate";
export const BlogDetails = WithGuestMenu(() => {
    // console.log);
    const { blogSlug } = useParams();
    let [blog, setBlog] = useState({ heading: null, subheading: null, img: null, description: null })
    useEffect(() => {
        httpRequest("get", `posts/${blogSlug}`).then(({ data }) => {
            setBlog(data && data.data);
            // console.log(post);

        })

    }, [])
    const { title, created_at, image, content } = blog;
    return (
        <div className="blogDetailsContainer">
            {/* <div className="blogTitleBar"> */}
            <BackButton />
            <h6> <span>Blog ---</span>{title}</h6>
            <h2>{title}</h2>
            <img src={`${image}`} className="blogImg" width="100%" alt="" />
            <h3>{title}</h3>
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
