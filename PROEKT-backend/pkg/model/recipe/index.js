const mongoose = require("mongoose");

const Recipe = mongoose.model(
	"recipes",
	{
		authorId : {type: String},
		recipeTitle: { type: String, required: true },
        category: {type: String, required: true },
		preparationTime: { type: String, required: true },
		numberOfPeople: { type: String, required: true },
		shortDescription: {type: String, required: true },
        fullRecipe: { type: String, required: true },
		rating: { type: String },
		createdOn: {type: String},
		image : {type: String}
	},
	"recipes"
);

module.exports = Recipe;
