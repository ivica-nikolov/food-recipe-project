import React from 'react';
//import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
//import operations from './users/duck/operations';
import logo from '../images/logo_color.svg'
import './Nav.css'
import { useNavigate } from 'react-router-dom';

export const Nav = () => {
    let navigate = useNavigate()
    let token = localStorage.getItem('token')
    const logOut = () => {
        localStorage.removeItem ('token')
        localStorage.removeItem ('id')
        navigate('/')
    }

    return(<div id='nav'>
        
        <div><Link to="/" ><img src={logo} alt='logo'></img></Link></div>
        <div className='categories'>
        <div><Link className='catBtn' to="/breakfast" >BREAKFAST</Link></div><div className='ellipse'></div>
        <div><Link className='catBtn' to="/brunch" >BRUNCH</Link></div><div className='ellipse'></div>
        <div><Link className='catBtn' to="/lunch" >LUNCH</Link></div><div className='ellipse'></div>
        <div><Link className='catBtn' to="/dinner" >DINNER</Link></div>
        </div>
            
        {token === null ? <>
        <button className='loginButton'><Link className='logIn' to="/login" >LOG IN</Link> </button>
        <p className='or'>or</p>
       <button className='createAccButton'><Link className='createAccount' to="/create-account" >create account</Link></button>
        </> : <>
        <Link className='myRec' to="/my-recipes" >MY RECIPES</Link><div className='ellipse2'></div>
        <Link className='myProf' to="/my-profile" >MY PROFILE</Link><div className='ellipse2'></div>
        <button className='logOut' onClick={logOut}>LOG OUT</button>
        </>}
    </div>
    )
}