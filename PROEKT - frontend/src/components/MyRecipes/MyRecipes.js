import React,{useState} from "react";
import { Link, Outlet } from "react-router-dom";
import addRecipeImg from '../../images/icon_plus_white.svg'
import backIcon from '../../images/icon_back_white.svg'
import './MyRecipes.css'


export const MyRecipes = () =>{
    let location = '/my-recipes'
    const [isActive, setIsActive] = useState(true)
    const handleClick = () => {
        if(window.location.pathname !== location){
            
            setIsActive(false);
        }else {
            setIsActive(true)
        } 
    }
    
    return(<div id="my-recipes">

    <div >
        <div className="myRecipes-top">
            <div className="myRecipes-title"><h1>My Recipes</h1></div>
            <div className="myRecipes-linetop"/>
            <button className="newRecipe-button" onClick={handleClick}>{isActive ? 
            <Link to='new-recipe'> <img src={addRecipeImg} alt='addRecipe'/></Link> : 
            <Link to='/my-recipes'> <img src={backIcon} alt='addRecipe'/></Link>}</button>
        </div>
        
        <div onClick={handleClick}>
            <Outlet/>
        </div>
    </div>


    </div>

)}