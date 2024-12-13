import axios from "axios";
export const commonHeaders = {
    'Content-Type': 'application/json',
    'accessToken': localStorage.getItem("accessToken")
}

export const httpRequest = (method = 'get', url, data = null, headers = commonHeaders) => {
    return new Promise((resolve, reject) => {
        let options = {
            method: method,
            url: url == "allpost" || 'post/blog-title' ? `https://crm.makingworldawesome.com/api/${url}` : import.meta.env.VITE_APIENDPOINT + url,
            headers: { ...commonHeaders, ...headers }
        }
        if (method == "post")
            options.data = data;
        axios(options).then(function (response) {
            if (response?.data?.status == 401) {
                localStorage.clear("accessToken");
                window.location = "/"
                // window.location = "/signIn"
            }
            resolve(response.data);
        }).catch(function (error) {
            console.log(error)
            if (error.status == 401)
                window.location = "/signin";
            reject(error);
        });
    });
};
