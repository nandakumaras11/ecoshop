import "./input.css"
export const InputBox = ({ bg, placeholder, name = "Name", ref, icon, value, on_change }) => {
    return (
        <>
            <div className="inputContainer">
                <div className="name"> {name}  </div>
                <div className="control">  <input type="text" onChange={(e) => on_change(e)} placeholder={placeholder ? placeholder : `Enter ${name}`} ref={ref} className="input" value={value} />
                    <img src={`/${icon}`} className="ico" alt="" />
                </div>
            </div>
        </>
    )
}
