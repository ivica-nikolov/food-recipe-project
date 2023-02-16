import React from "react";
import {Routes,Route} from 'react-router-dom'
import { Nav } from "./Nav";
import './App.css'
import { FreshNew } from "./FreshNew/FreshNew";
import { Breakfast } from "./Breakfast/Breakfast";
import { Login } from "./auth/Login";
import { CreateAccount } from "./CreateAccount/CreateAccount";
import { MyProfile } from "./MyProfile/MyProfile";
import "@fontsource/roboto-slab"
import { MyRecipes } from "./MyRecipes/MyRecipes";
import { NewRecipe } from "./NewRecipe/NewRecipe";
import { EditRecipe } from "./EditRecipe/EditRecipe";
import { Recipes } from "./Recipes/Recipes";
import { Footer } from "./Footer";


function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<FreshNew/>}/>
        <Route path='/breakfast' element={<Breakfast/>}/>
        <Route path='/brunch' element={<Breakfast/>}/>
        <Route path='/lunch' element={<Breakfast/>}/>
        <Route path='/dinner' element={<Breakfast/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create-account' element={<CreateAccount/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/my-recipes' element={<MyRecipes/>}>
            <Route index element={<Recipes/>}/>
            <Route path='new-recipe' element={<NewRecipe/>}/>
            <Route path='edit-recipe/:id' element={<EditRecipe/>}/>
        </Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;