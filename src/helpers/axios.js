import axios from "axios";

function axiosInstance() {
    const auth = localStorage.getItem("auth")

    const authParsed = JSON.parse(auth)

    return axios.create({
        baseURL: 'http://localhost:3000/',
        timeout: 1000,
        headers: {
            Authorization: authParsed  ? `Bearer ${authParsed.token}` : undefined
        }
    });
}

export default axiosInstance
