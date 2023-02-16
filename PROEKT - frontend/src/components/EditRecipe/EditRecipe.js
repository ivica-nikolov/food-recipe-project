import React,{useState , useEffect} from "react";
import { useParams } from 'react-router';

export const EditRecipe = () =>{
    const { id } = useParams()
    const [recipeTitle, setRecipeTitle] = useState('')
    const [category, setCategory] = useState("")
    const [preparationTime, setPreparationTime] = useState("")
    const [numberOfPeople, setNumOfPeople] = useState("")
    const [shortDescription, setShortDescription] = useState("")
    const [fullRecipe, setFullRecipe] = useState("");
    const [imageName, setImageName] = useState('')
    const [imageUrl, setImageUrl] = useState(``);

    var today = new Date();
    var year = today.getFullYear();
    var mon = today.getMonth()+1;
    var day = today.getDate();
    const time =day+"-"+mon+"-"+year;
    const createdOn = time.toString();
    const [message, setMessage] = useState("");

    
    const fetchData = async () => {
        
        const token = localStorage.getItem('token')

        try{
            await fetch(`http://localhost:5001/api/v1/recipe/get-recipe/${id}`, {
            method: "get",
            headers: {
                "Content-Type" : "application/json",
                'Authorization': token ? `Bearer ${token}` : ''
            }}
            ).then((res) => res.json())
            .then((data) => {
                setRecipeTitle(data.recipeTitle);
                setCategory(data.category)
                setPreparationTime(data.preparationTime);
                setNumOfPeople(data.numberOfPeople);
                setShortDescription(data.shortDescription);
                setFullRecipe(data.fullRecipe);
                setImageName(data.image);
                setImageUrl(`http://localhost:5001/api/v1/storage/${data.image}`)

            })
            
          
            } catch (err){
            console.log(err);   
        }
    }
    
    useEffect(() => {
        
        fetchData()
        // eslint-disable-next-line
    },[])
    
    
    
    const handlePhoto = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('image', e.target.files[0])
        setImageName(e.target.files[0].name)
        try{
            let res = await fetch(`http://localhost:5001/api/v1/storage`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: formData}
            
            );
           
            // eslint-disable-next-line
            let response = await res.json();
       
        } catch {

        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token")
        let authorId = localStorage.getItem('id')
        const formData = new FormData();
        formData.append('authorId', authorId);
        formData.append('recipeTitle', recipeTitle);
        formData.append('category', category);
        formData.append('preparationTime', preparationTime);
        formData.append('numberOfPeople', numberOfPeople);
        formData.append('shortDescription', shortDescription);
        formData.append('fullRecipe', fullRecipe);
        formData.append('createdOn', createdOn);
        formData.append('image', imageName)
        for (const value of formData.values()) {
            console.log(value);
        }
        
        try{
            let res = await fetch(`http://localhost:5001/api/v1/recipe/edit_recipe/${id}`, {
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
                <img src={imageUrl} alt="Recipe Img" className="recipeImg"/>
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
                <input type='text' className="recipeTitleInput recipeInput" placeholder={recipeTitle}
                value={recipeTitle}
                onChange={(e)=>setRecipeTitle(e.target.value)}/>
                <div className="aboutRecipe">
                    <div >
                        <h4>Category</h4>
                        <select className="categorySelect" placeholder={category}
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
                        <input type='text' className="prepAndNomPeople " placeholder={preparationTime} value={preparationTime}
                        onChange={(e)=>setPreparationTime(e.target.value)}/>
                    </div>
                    <div>
                        <h4>No. People</h4>
                        <input type='text' className="prepAndNomPeople" placeholder={numberOfPeople} 
                        value={numberOfPeople}
                        onChange={(e)=>setNumOfPeople(e.target.value)}/>                    
                    </div>
                </div>
                <h4>Short Description</h4>
                <textarea className="shortDescription" placeholder={shortDescription}
                value={shortDescription}
                onChange={(e)=>setShortDescription(e.target.value)}/>
                <div className="message">{message ? <p>{message}</p> : null}</div>
                <div className="btn"><button type="submit">Save</button></div>
            </div>
            <div>
                <h4>Recipe</h4>
                <textarea className="recipee" placeholder={fullRecipe}
                value={fullRecipe}
                onChange={(e)=>setFullRecipe(e.target.value)}/>
            </div>
        




    </form>
    
    

</div>

)}