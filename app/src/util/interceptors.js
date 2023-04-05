import axios from 'axios'
import jwt_decode from 'jwt-decode'

const axiosAuth = axios.create()

axiosAuth.interceptors.request.use((request) => {
    console.log(request.headers)
        console.log("request sent");
        let currentDate = new Date();
        const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
        console.log(decodedToken);
        const ifTokenExpired = decodedToken.exp * 1000 < currentDate.getTime()
        if(ifTokenExpired) {
          console.log("expired")
        } 
              
        
        return request;
    },
    (error) => {
        return Promise.reject(error)
    })

    // axiosAuth.interceptors.request.use(async (config) => {
    //     try {
    //       console.log("try")
    //       let currentDate = new Date();
    //       const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
    //       console.log(decodedToken);
    //       if (decodedToken.exp * 1000 < currentDate.getTime()) {
    //         const data = await refreshToken();
    //         config.headers["Authorization"] = "Bearer " + data.accessToken;
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     return config;
    //   });
    


export default axiosAuth