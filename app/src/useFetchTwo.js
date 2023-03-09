import { useState, useEffect } from "react";

const useFetchTwo = (url) => {
    const [dataTwo, setDataTwo] = useState([]); 

    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then((res) => {
                    if(!res.ok) {
                        throw Error('Could not fetch the data for that resource')            
                    } 
                    return res.json()
                })
                .then((data) => {
                    setDataTwo(data);
                    console.log(data)
                })
                .catch(error => {
                    console.log(error)
                })
        }, 1000)
    }, [url]);

    return {dataTwo}
}

export default useFetchTwo;