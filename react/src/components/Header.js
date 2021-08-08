import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import './Header.css'
function Header (props) {

    const [isLoggedIn, setIsLoggedIn] = useState([]) // it was null at firstload 

    useEffect(() => {
        if (props) {
            setIsLoggedIn(props.connectedUser)
        }
    }, [props])

    function click () {
        props.resetSearch(true)
    }

    const onLogout = (e) => {
        setIsLoggedIn(false);
        localStorage.removeItem("cart")
        localStorage.removeItem('user')
    }
    // const checkCart = () = {

    // }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
            <div className="container">
                <Link to='/' className="navbar-brand" onClick={click}><img className="logoImage" src="images/logo.png" alt="img"></img>SmartShop</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    {
                        isLoggedIn ?
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to='/smartphones' onClick={click} className="nav-link">Smartphones</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/ordersHistory' className="nav-link">Orders History</Link>
                                </li>
                            </ul> : <div></div>
                    }
                    {
                        !isLoggedIn ? <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to='/register' className="nav-link">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/login' className="nav-link">Login</Link>
                            </li></ul>
                            : <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to='/' className="nav-link" onClick={onLogout}>Logout</Link>
                                </li>
                                <li>
                                    <Link to='/order' className="nav-link"><i class="fas fa-shopping-cart"></i></Link>
                                </li>
                            </ul>
                    }
                </div>
            </div>
        </nav >
    )
}
export default Header;