import React,{useState} from "react";
import './NewRecipe.css'
import image from '../../images/no-profile-pic-icon-27.jpg'


export const NewRecipe = () =>{

    const [recipeTitle, setRecipeTitle] = useState("")
    const [category, setCategory] = useState("Breakfast")
    const [preparationTime, setPreparationTime] = useState("")
    const [numberOfPeople, setNumOfPeople] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [fullRecipe, setFullRecipe] = useState("");
    const [imageName, setImageName] = useState('')
    const rating = '0'

    var today = new Date();
    var year = today.getFullYear();
    var mon = today.getMonth()+1;
    var day = today.getDate();
    const time =day+"-"+mon+"-"+year;
    const createdOn = time.toString();
    const [message, setMessage] = useState("");
    
    const handlePhoto = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('image', e.target.files[0])
        
        try{
            let res = await fetch(`http://localhost:5001/api/v1/storage`, {
            method: "POST",
            headers: {
                
            },
            body: formData}
            
            );
            console.log(res)
            // eslint-disable-next-line
            let response = await res.json();
            console.log(response)
        } catch {

        }
        setImageName(e.target.files[0].name)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token")
        let id = localStorage.getItem('id')
        const formData = new FormData();
        formData.append('authorId', id);
        formData.append('recipeTitle', recipeTitle);
        formData.append('category', category);
        formData.append('preparationTime', preparationTime);
        formData.append('numberOfPeople', numberOfPeople);
        formData.append('shortDescription', shortDescription);
        formData.append('fullRecipe', fullRecipe);
        formData.append('createdOn', createdOn);
        formData.append('image', imageName);
        formData.append('rating', rating);
        for (const value of formData.values()) {
            console.log(value);
        }
        
        try{
            let res = await fetch(`http://localhost:5001/api/v1/recipe/create-recipe`, {
            method: "POST",
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: formData}
            
      );
      if (res.ok) {
        setMessage("Recipe successfully saved!!!");
      }else {
        setMessage("Some error ocured");
      }
      // eslint-disable-next-line
      let response = await res.json();
      
      
        } catch (err){
            console.log(err);   
        }
    }




    
    return(<div id="new-recipe">


     <form  className="newRecipeForm" onSubmit={handleSubmit}>
        
        
            <div className="imagePlace">
                <h4>Recipe Image</h4>
                <div className="recipeImg">{imageName ? <img src={`http://localhost:5001/api/v1/storage/${imageName}`} alt='profile-pic'></img> : <img src={image} alt='profile-pic'></img>}</div>
                <div ><label className="recImgUploadBtn">UPLOAD IMAGE<input
                type='file'
                accept="image/*"
                name='recipeImg'
                onChange={handlePhoto}/>
                </label>
                </div>
            </div>
            <div>
                <h4>Recipe Title</h4>
                <input type='text' className="recipeTitleInput recipeInput" placeholder="Homemade Pizza "
                value={recipeTitle}
                onChange={(e)=>setRecipeTitle(e.target.value)}/>
                <div className="aboutRecipe">
                    <div >
                        <h4>Category</h4>
                        <select className="categorySelect"
                        value={category}
                        onChange={(e)=>setCategory(e.target.value)}>
                            <option>Breakfast</option>
                            <option>Brunch</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                        </select>
                    </div>
                    <div>
                        <h4>Preparation Time</h4>
                        <input type='text' className="prepAndNomPeople " placeholder="45" value={preparationTime}
                        onChange={(e)=>setPreparationTime(e.target.value)}/>
                    </div>
                    <div>
                        <h4>No. People</h4>
                        <input type='text' className="prepAndNomPeople" placeholder="4" 
                        value={numberOfPeople}
                        onChange={(e)=>setNumOfPeople(e.target.value)}/>                    
                    </div>
                </div>
                <h4>Short Description</h4>
                <textarea className="shortDescription" placeholder="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable. If you are going to use a passage"
                value={shortDescription}
                onChange={(e)=>setShortDescription(e.target.value)}/>
                <div className="message">{message ? <p>{message}</p> : null}</div>
                <div className="btn"><button type="submit">Save</button></div>
            </div>
            <div>
                <h4>Recipe</h4>
                <textarea className="recipee" placeholder="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn’t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures"
                value={fullRecipe}
                onChange={(e)=>setFullRecipe(e.target.value)}/>
            </div>
        




    </form>
    
    

</div>

)}