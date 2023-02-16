const RecipeModel = require('../../model/recipe/index')

const deleteRecipe = async (id) => { 
    return await RecipeModel.deleteOne({_id: id});
};
const updateRecipe = async (id, newRecipe) => { 
    return await RecipeModel.updateOne({_id: id }, newRecipe);
};
const findRecipeByID = async (id) => { 
    return await RecipeModel.findById({_id: id});
};
const getRecipesByAuthorID = async (id) => { 
    return await RecipeModel.find({
		authorId: id 
	})
};
const findRecipeByTitle = async (recipeTitle) => { 
    return await RecipeModel.findOne({ recipeTitle: recipeTitle });
};

const getAllRecipes = async () => { 
    return await RecipeModel.find({})
};
const createRecipe = async (RecipeToBeSaved) => { 
    const newRecipe = new RecipeModel(RecipeToBeSaved); 
    return await newRecipe.save();
};
const findRecipesByCategory = async (categoryToFilterBy) => {
	return await RecipeModel.find({
		category: categoryToFilterBy
	});
};
const getRecipesWithHigherRatingThan = async (rating) => {
	return await RecipeModel.find({ rating: { $gt: rating } }).toArray();
};

module.exports = {
    deleteRecipe,
    updateRecipe,
    findRecipeByID,
    findRecipeByTitle,
    getAllRecipes,
    createRecipe,
    findRecipesByCategory,
    getRecipesWithHigherRatingThan,
    // addRecipeToAccount,
    getRecipesByAuthorID
}