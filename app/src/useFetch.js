import { useState, useEffect } from "react";


const useFetch = (url) => {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    setTimeout(() => {
      fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }, [url]);

  return { data };
};

export default useFetch;
