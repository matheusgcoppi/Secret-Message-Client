import { useState, useEffect } from "react";
import axiosAuth from "./util/interceptors";
import jwt_decode from 'jwt-decode'


import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  console.log(localStorage)

  const refreshToken = async () => {
    try {
      console.log(localStorage.getItem("refreshToken"));
      console.log(localStorage.getItem("accessToken"));
      const response = await axios.post("http://localhost:8000/refresh", {
        token: localStorage.getItem("refreshToken"),
      });
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);

        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        console.log(localStorage);
      } else {
        console.log("erro");
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  axiosAuth.interceptors.request.use(
    async (config) => {
      try {
        console.log("try");
        let currentDate = new Date();
        const decodedToken = jwt_decode(localStorage.getItem("accessToken"));
        console.log(decodedToken);
        const ifTokenExpired = decodedToken.exp * 1000 < currentDate.getTime();
        if (ifTokenExpired) {
          console.log("expired");
          const data = await refreshToken();
          console.log(data.accessToken)
          config.headers["Authorization"] = "Bearer " + data.accessToken;
        }
      } catch (error) {
        console.log(error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const axiosTest = async () => {
    let getPin = JSON.parse(localStorage.getItem("user-info"));
    let pin = getPin.pin;
    try {
      console.log(url);
      const res = await axiosAuth.get('http://localhost:8000/user/' + pin,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      console.log(pin);
    }
  };

  useEffect(() => {
    axiosTest();
  }, []);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(localStorage.getItem("accessToken"));
        if (!response.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        const newData = await response.json();
        setData(newData);
        console.log(data);
        console.log(newData);
      } catch (error) {
        console.log(error);
        console.log(localStorage.getItem("accessToken"));
      }
    };
    fetchData();
  }, [url]);


  return { data };
};

export default useFetch;