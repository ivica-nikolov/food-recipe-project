import React from "react";
import Close from '../../../images/icon_close.svg'
import Clock from '../../../images/icon_time.svg'
import Plate from '../../../images/icon_plate.svg'
import Star from '../../../images/icon_star.svg'

export const Popup = (props) => {
    
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <div><img className="close-btn" onClick={() => props.setTrigger(false)} alt='close' src={Close}></img></div>
                { props.children}

                <div className='popup-head'>
                    <h1 className='popup-title'>{props.recipe.recipeTitle}</h1> 
                    </div>
                    <div className='popup-columns'>
                        <div>
                            <img className='popup-img' alt='' src={`http://localhost:5001/api/v1/storage/${props.recipe.image}`}></img>
                            <div className='popup-recipeTitle'>
                                <h1>Best Server For</h1>
                                <div className='popup-category'>{props.recipe.category}</div>
                            </div>
                            <div>
                                <p className='popup-recipeDes'>{props.recipe.shortDescription}</p>
                            </div>
                            <div className='popup-icons'>
                                <div><img src={Clock} alt='img'/></div><div>{props.recipe.preparationTime}</div>

                                <div className="ico"><img src={Plate} alt='img'/></div><div>{props.recipe.numberOfPeople}</div>

                                <div className="ico"><img src={Star} alt='img'/></div><div>{props.recipe.rating}</div>
                            </div>

                        
                        </div>

                            <div>
                                <div className='popup-recipeDet'>Recipe Details</div>
                                <div className='popup-fullRecipe'>{props.recipe.fullRecipe}</div>
                            </div>
                        </div>
            </div>
        </div>
    ) : '';
}