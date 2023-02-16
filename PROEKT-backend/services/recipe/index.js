const config = require("../../pkg/config");
const connectDB = require("../../pkg/database");
const morgan = require("morgan");
const recipeHandler = require("./handlers");
const cors = require('cors');
connectDB();

const {recipes: { port } } = config.getConfigPropertyValue("services");
const { jwt_secret_key: JWT_SECRET } = config.getConfigPropertyValue("security");

const express = require("express");
const { expressjwt } = require("express-jwt");
const app = express();
app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());

const fileUpload = require('express-fileupload')
app.use(fileUpload())
app.use(
	expressjwt({ secret: JWT_SECRET, algorithms: ["HS256"] })
		
		.unless({
			path: [
				"/api/v1/recipe/recipes",
				"/api/v1/recipe/recipes-by-category",
				 /^\/api\/v1\/recipe\/edit-recipe-rating\/.*/
			],
		})
);


app.get("/api/v1/recipe/recipes", recipeHandler.getAllRecipes);

app.get("/api/v1/recipe/get-recipe/:id", recipeHandler.getRecipeById);

app.post("/api/v1/recipe/recipes-by-authorId", recipeHandler.getAllRecipesByAuthorId);

app.post("/api/v1/recipe/create-recipe", recipeHandler.createNewRecipe);

app.post("/api/v1/recipe/edit_recipe/:id", recipeHandler.updateRecipe);

app.post("/api/v1/recipe/edit-recipe-rating/:id", recipeHandler.updateRecipeRating);

app.post("/api/v1/recipe/recipes-by-category", recipeHandler.getRecipeByCategory);

app.delete("/api/v1/recipe/delete-recipe", recipeHandler.deleteRecipe);


app.listen(port, (err) => {
	if (err) {
		throw new Error(
			`Cannot start server running on http://localhost:${port}`,
			err
		);
	}
	console.log(`Recipe server running on http://localhost:${port}`);
});