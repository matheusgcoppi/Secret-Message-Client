import { useState, useEffect } from "react";

import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  console.log(localStorage)
  const refreshToken = async () => {
    try {
      console.log(localStorage.getItem("refreshToken"))
      console.log(localStorage.getItem("accessToken"))
      const response = await axios.post("http://localhost:8000/refresh", {
        token: localStorage.getItem("refreshToken"),
      });
      console.log(response)
      if(response.status === 200) {
      console.log(response.data)
 
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      console.log(localStorage)
      
      }
      else {
        console.log("erro")
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    let timerId;
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
        setData(newData)
        console.log(data)
        console.log(newData)

      } catch (error) {
        console.log(error);
        console.log(localStorage.getItem("accessToken"));
      }
      timerId = setTimeout(refreshToken, 25000);
    };
    fetchData();
    timerId = setTimeout(refreshToken, 25000);

    return () => {
      clearTimeout(timerId)
    }
  }, [url]);

  return { data };
};

export default useFetch;