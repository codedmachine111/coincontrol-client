import './ErrorPage.scss'
import { Link } from 'react-router-dom'
import errorpng from '../../assets/error.png'

export const ErrorPage=()=>{
    return(
        <>
        <div className="error-container">
            <h1 className="error-title">404</h1>
            <h2 className="error-subtitle">Oops! The page you searched for was not found.</h2>
            <img  src={errorpng} alt="" id='error-image'/>
            <p className='error-redirect'>Go back to <Link to="/">homepage</Link></p>
        </div>
        </>
    )
}