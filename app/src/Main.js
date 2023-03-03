import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const Main = () => {
    const { pin } = useParams();
    const { data } = useFetch('http://localhost:8000/user/' + pin)

   
    return ( 

        <div className="main">      
            {Object.entries(data).map(([key, user], i) => (
    <li className="travelcompany-input" key={i}>
        <span className="input-label"> Name: {user.name}</span>
        <span className="input-label"> ID: {user.id}</span>
        <span className="input-label"> pin: {user.pin}</span>
        <span className="input-label"> PINTWO: {user.pintwo}</span>
        
    </li>
))}
              
        </div>      
        
     );
}
 
export default Main;