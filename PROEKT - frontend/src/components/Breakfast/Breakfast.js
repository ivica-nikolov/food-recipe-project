import React,{useState, useEffect} from 'react';
import Clock from '../../images/icon_time.svg'
import Plate from '../../images/icon_plate.svg'
import Star from '../../images/icon_star.svg'
import Arrows from '../../images/icon_arrows_white.svg'
import './Breakfast.css' 
import { useLocation } from 'react-router-dom';
import { Popup } from '../FreshNew/Popup/Popup';

export const Breakfast = () => {
    const [buttonPopup , setButtonPopup] = useState(false)
    const [rec , setRecipe] = useState()
    const [recipes , setRecipes] = useState([]);
    const location = useLocation();
    let component = location.pathname.slice(1)
    let category = component.charAt(0).toUpperCase() + component.slice(1)
    let data = {
        category: category
    }
    
    const fetchData = async () => {
        
        
        try{
            await fetch(`http://localhost:5001/api/v1/recipe/recipes-by-category`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(data)}
                
            ).then((res) => res.json())
            .then((response) => {
                setRecipes(response)
            })
                
            } catch (err){
            console.log(err);   
        }
    }
    
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    },[location.pathname])
    // let imgPath = '../../imageUploads/recipeImg/'


    return(<div id='breakfast'>
        <div className='top'><div className='heading'><h1>{category}</h1></div>
        <div className='lline'></div></div>
        <div className='cards'>
            {recipes.length !== 0 ? <div className="a">
                
                {recipes && recipes.map((recipe, key) =>(
                    <div  key={key} >
                        <div className="single_item" onClick={() => {setButtonPopup(!buttonPopup) ; setRecipe(recipe);}}>
                        <section className="single_item_top">
                            <img src={`http://localhost:5001/api/v1/storage/${recipe.image}`} alt='img'></img>
                            <div className='cattegoryDiv'><div>{recipe.category}</div></div>
                        </section>
                        <section className="single_item_bottom">
                            <div className="title_description">
                                
                                <h2>{recipe.recipeTitle}</h2>
                                <div className='shortDesc'><p>{recipe.shortDescription}</p></div>
                                
                            </div>
                            <br/>
                            <div className='bottomm'>
                                <div className="tagss">
                                    <div><img src={Clock} alt='img'/></div><div>{recipe.preparationTime}</div>

                                    <div><img src={Plate} alt='img'/></div><div>{recipe.numberOfPeople}</div>

                                    <div><img src={Star} alt='img'/></div><div>{recipe.rating}</div>
                                </div>
                                <div className="right">
                                    <img src={Arrows} alt='img'/>
                                </div>
        
                            </div>
                        </section>
                        
                        </div>
                        <Popup trigger = {buttonPopup} setTrigger={setButtonPopup} recipe = {rec}/>
                    
                    </div> ))}
            </div> : <div className='noRecCat'>There are no recipes in this category!</div>}


                
                





            
        </div>
    </div>
    )
}