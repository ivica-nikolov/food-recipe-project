const recipeRepo = require('../../../pkg/repo/recipe/index');
const {validate, validateCreateNewRecipeRule} = require('../../../pkg/validators/validator');
var fs = require('fs');

const getAllRecipes = async (request, response) => {
    try {
        recipeData = await recipeRepo.getAllRecipes();
            
        return response.status(200).send(recipeData);

    } catch (err) {
        return response.status(err.status).send(err.message);
    }
};

const getAllRecipesByAuthorId = async (request, response) => {
    try {
        let recipeData = await recipeRepo.getRecipesByAuthorID(request.body.authorId)
        
        if (recipeData == null) {
            throw {
                status: 400,
                message: 'There is no recipe available'
            };
        };
        return response.status(200).send(recipeData);

    } catch (err) {
        return response.status(err.status).send(err.message);
    }
};

const getRecipeById = async (request, response) => {
    try {
        let recipeData = await recipeRepo.findRecipeByID(request.params.id)
        
        
        return response.status(200).send(recipeData);

    } catch (err) {
        return response.status(401).send(err.message);
    }
};

const DOCUMENTS_DIR = `${__dirname}/../../../../PROEKT - frontend/src/imageUploads`
const createNewRecipe = async (req, res) => {
    const data = {
        authorId: req.body.authorId,
		recipeTitle: req.body.recipeTitle,
		category: req.body.category,
		preparationTime: req.body.preparationTime,
		numberOfPeople: req.body.numberOfPeople,
        shortDescription: req.body.shortDescription,
        fullRecipe: req.body.fullRecipe,
        createdOn: req.body.createdOn,
        rating: req.body.rating,
		image: req.body.image
    }
    console.log(data)
    try {

        await validate(data, validateCreateNewRecipeRule)
        
        let recipe = await recipeRepo.findRecipeByTitle(req.body.recipeTitle);
        
        if (recipe != null) {
            throw {
                status: 400,
                message: 'Recipe title already exists'
            };
        };
        let result = await recipeRepo.createRecipe(data)
        

        return res.status(200).send('Recipe successfully saved');

    } catch (err) {
        return res.status(400).send('Recipe not saved');
    }
};


const deleteRecipe = async (request, response) => {
    try {
        let imagePath = `${DOCUMENTS_DIR}/${request.body.image}`
        fs.unlink(imagePath, function (err) {
            if (err) throw err;    
        });
        let result = await recipeRepo.deleteRecipe(request.body.id)

        return response.status(200).send("Recipe successfully deleted");

    } catch (err) {

        return response.status(err.status).send(err.message);
    }
};

const updateRecipe = async (request, response) => {
    try {
        
        await validate(request.body, validateCreateNewRecipeRule);
        let recipe = await recipeRepo.findRecipeByTitle(request.body.recipeTitle)
        if (recipe != null) {
            if (request.params.id != recipe._id) {
                throw {
                    status: 400,
                    message: 'Recipe title already exists'
                };
            };
        };
        
        
        let result = await recipeRepo.updateRecipe(request.params.id, request.body)
       

        return response.status(200).send('Recipe successfully updated');

    } catch (err) {
        
        return response.status(err.status).send(err.message);
    }
};

const updateRecipeRating = async (request, response) => {
    try {
        
        
        let result = await recipeRepo.updateRecipe(request.params.id, request.body)
       

        return response.status(200).send('Recipe successfully updated');

    } catch (err) {
        
        return response.status(err.status).send(err.message);
    }
};

const getRecipeByCategory = async (request, response) => {
    try {

        let recipeData = await recipeRepo.findRecipesByCategory(request.body.category)

        
        return response.status(200).send(recipeData);

    } catch (err) {

        return response.status(err.status).send(err.message);
    }
};

module.exports= {
    getAllRecipes,
    getAllRecipesByAuthorId,
    createNewRecipe,
    deleteRecipe,
    updateRecipe,
    getRecipeByCategory,
    getRecipeById,
    updateRecipeRating

}