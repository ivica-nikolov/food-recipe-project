import React,{useEffect, useState,useReducer} from "react";
import './Recipes.css'
import trashcan from '../../images/icon_trashcan.svg'
import { Link } from "react-router-dom";

export const Recipes = () =>{
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    const [recipess, setRecipes] = useState([]);
    let token = localStorage.getItem('token')
    let id = localStorage.getItem('id')
    let data = {
        authorId : id
    }
    
    const fetchData = async () => {
        
        try{
            await fetch(`http://localhost:5001/api/v1/recipe/recipes-by-authorId`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify(data)}
                
            ).then((res) => res.json())
            .then((data) => {
                setRecipes(data)
            })
                
          
            } catch (err){
            console.log(err);   
        }
    }
    
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    },[ignored])


    const deleteRecipe = async (recipeId , image) =>{

        try{
            let deleteData = {
                id: recipeId,
                image: image
            }
            await fetch(`http://localhost:5001/api/v1/recipe/delete-recipe`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify(deleteData)}
                
            ).then((res) => res.json())
            // .then(fetchData());
                
            } catch (err){
            console.log(err);   
        }
        forceUpdate()
    }
    

    return(<div id="recipes">

    
        <div>
            <div className="headings">
                <div><h3>Recipe Name</h3></div>
                <div><h3>Category</h3></div>
                <div><h3>Created On</h3></div>
                <div className="delete"><h3>Delete</h3></div>
            </div>
            {recipess.length !== 0 ? <div className="e">
                {recipess && recipess.map(recipe =>(
                <div key={recipe._id}>
                    <div className="mm">
                        <Link to={`edit-recipe/${recipe._id}`} className="recipe"><div>{recipe.recipeTitle}</div>
                        <div className="recipeCategory"><div>{recipe.category}</div></div>
                        <div>{recipe.createdOn}</div></Link>
                        <div className="one"><img src={trashcan} alt="trashcanIcon" onClick={() => deleteRecipe(recipe._id , recipe.image)}/></div>
                    </div>
                </div>
                ))}
            </div> : <div className="noRecipes">There are no recipes saved!</div>}
            

        </div>
    

    </div>

)}