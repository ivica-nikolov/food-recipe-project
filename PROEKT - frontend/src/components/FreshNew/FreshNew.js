import React,{useState, useEffect, useReducer} from 'react';
import { Popup } from './Popup/Popup';
import Clock from '../../images/icon_time.svg'
import Plate from '../../images/icon_plate.svg'
import Star from '../../images/icon_star.svg'
import Arrows from '../../images/icon_arrows_white.svg'

import './FreshNew.css'

export const FreshNew = () => {
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    const [recipes, setRecipes] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false)
    const [rec, setRecipe] = useState()
    const [last3Rec, setLast3Rec] = useState([])
    

    const fetchData = async () => {
        
        try{
            await fetch(`http://localhost:5001/api/v1/recipe/recipes`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }}
            ).then((res) => res.json())
            .then((data) => {
                setRecipes(data);
                setLast3Rec(data.slice(-3))
            })
            
          
            } catch (err){
            console.log(err);   
        }
    }
   
    useEffect(() => {
        
        fetchData();
        // eslint-disable-next-line
    },[ignored])

    
    let sortedRecipes = recipes.sort(
    (p1, p2) => (+p1.rating < +p2.rating) ? 1 : (+p1.rating > +p2.rating) ? -1 : 0);
    const slicedRecipes = sortedRecipes.slice(0, 6);
    

    const handleStarButton = async (singleRecipe) => {
        
        const formData = new FormData();
        let curentRating = (+singleRecipe.rating + 1);
        let curentStarRating = curentRating.toString();
        formData.append('rating', curentStarRating);
        
        
        try{
            let res = await fetch(`http://localhost:5001/api/v1/recipe/edit-recipe-rating/${singleRecipe._id}`, {
            method: "POST",
            headers: {
                
            },
            body: formData
        })
            await res.json();

      
        } catch (err){
            console.log(err);   
        }
        
        forceUpdate();

    };


    return(<div id='fresh'>
        <div className='top'><div className='heading'><h1>Fresh & New</h1></div>
        <div className='line'></div></div>

        <div className='cards' >
        {recipes ? <div className="a">
                
                {last3Rec && last3Rec.map((recipe, key) =>(
                    <div  key={key} className="single_item">
                        <div className="asd" onClick={() => {setButtonPopup(!buttonPopup); setRecipe(recipe)}}>
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
                            
                        </section>
                        
                        </div>
                        <div className='botttom'>
                                <div className="tagss">
                                    <div><img src={Clock} alt='img'/></div><div>{recipe.preparationTime}</div>

                                    <div><img src={Plate} alt='img'/></div><div>{recipe.numberOfPeople}</div>

                                    <div className='starBtn' onClick= {() => {handleStarButton(recipe)}}><img src={Star} alt='img' /></div>
                                    <div>{recipe.rating}</div>
                                </div>
                                <div className="right" onClick={() => {setButtonPopup(!buttonPopup); setRecipe(recipe)}}>
                                    <img src={Arrows} alt='img'/>
                                </div>
        
                            </div>
                        <Popup trigger = {buttonPopup} setTrigger={setButtonPopup} recipe = {rec}/>
                    
                    </div> ))}
            </div> : <div></div>}

        </div>


        
        <div className='mostPopular'>
        <div className='top'><div className='heading'><h1>Most Popular Recipes</h1></div>
        <div className='linee'></div></div>

        <div className='cards'>
        {recipes ? <div className="a">
                
                {slicedRecipes && slicedRecipes.map((recipe, key) =>(
                    <div  key={key} className="single_item">
                        <div className="asd" onClick={() => {setButtonPopup(!buttonPopup); setRecipe(recipe)}}>
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
                            
                        </section>
                        
                        </div>
                        <div className='botttom'>
                                <div className="tagss">
                                    <div><img src={Clock} alt='img'/></div><div>{recipe.preparationTime}</div>

                                    <div><img src={Plate} alt='img'/></div><div>{recipe.numberOfPeople}</div>

                                    <div className='starBtn' onClick= {() => {handleStarButton(recipe)}}><img src={Star} alt='img' /></div>
                                    <div>{recipe.rating}</div>
                                </div>
                                <div className="right" onClick={() => {setButtonPopup(!buttonPopup); setRecipe(recipe);}}>
                                    <img src={Arrows} alt='img'/>
                                </div>
        
                            </div>
                        <Popup trigger = {buttonPopup} setTrigger={setButtonPopup} recipe = {rec}/>
                    
                    </div> ))}
            </div> : <div></div>}


            
      
    
            </div>
        </div>
    </div>
    )
}