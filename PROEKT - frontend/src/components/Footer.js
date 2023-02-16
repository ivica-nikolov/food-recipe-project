import React from 'react';
import './Footer.css'
import footerImg from '../images/logo_white.svg'
export const Footer = () => {
    

    return(<div id='footer'>
        <div className='footer'>
            <div className='footerImg'><img src={footerImg} alt='Footer img'/></div>
            <div className='footerCategories'>
                <div><h5>BREAKFAST</h5></div>
                <div className='footerCircle'></div>
                <div><h5>BRUNCH</h5></div>
                <div className='footerCircle'></div>
                <div><h5>LUNCH</h5></div>
                <div className='footerCircle'></div>
                <div><h5>DINNER</h5></div>
            </div>
            <div className='footerImg2'><h6>Baby's Food Place copyright 2021</h6></div>
            
        </div>
        
    </div>
    )
}