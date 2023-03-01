import { Link } from 'react-router-dom'
const NotFound = () => {
    return ( 
        <div className="not-found">
            <h2>Sorry</h2>
            <p>This Page was not Found</p>
            <Link to = "/"> Back to the home Page... </Link>
        </div>
     );
}
 
export default NotFound;