import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../shared/context/auth-context';

import './MainNavigation.css'
import cartImage from './../assets/cart.svg';
import homeImage from './../assets/home.svg';
import loginImage from './../assets/login.svg';
import logoutImage from './../assets/logout.svg';
import groupImage from './../assets/group.svg';
import addImage from './../assets/add.svg';
import editImage from './../assets/edit.svg';

//The navigation happens here
const MainNavigation = () => {

    const auth = useContext(AuthContext);

    return (
        <header>
            <nav>
                <ul className='ul_nav'>
                    <li className='li_nav'>
                        <Link to="/">
                            <img src={homeImage}></img>
                        </Link>
                    </li>
                    {auth.isLoggedIn && (
                        <li className='li_nav_about'>
                            <Link to="/">
                                <img src={logoutImage} onClick={auth.logout}></img>
                            </Link>
                        </li>
                    )}
                    {!auth.isLoggedIn && (
                        <li className='li_nav_about'>
                            <Link to="/auth">
                                <img src={loginImage}></img>
                            </Link>
                        </li>
                    )}
                    {auth.isLoggedIn && (
                        <li className='li_nav_about'>
                            <Link to="/edit">
                                <img src={editImage}></img>
                            </Link>
                        </li>
                    )}
                    {auth.isLoggedIn && (
                        <li className='li_nav_about'>
                            <Link to="/add">
                                <img src={addImage}></img>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}


export default MainNavigation;