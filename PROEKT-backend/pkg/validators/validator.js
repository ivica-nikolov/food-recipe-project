const { Validator } = require("node-input-validator");

const validateCreateNewAccountRule = {
	firstName: "required|string",
	lastName: "required|string",
	email: "required|email",
	birthday: "required|string",
	password: "required|string"
};
const validateLoginRule = {
	email: "required|email",
	password: "required|string|minLength:3",
};

const validateCreateNewRecipeRule = {
	authorId:"string",
	recipeTitle: "required|string",
	category: "required|string",
	preparationTime: "required|string",
	numberOfPeople: "required|string",
	shortDescription: "required|string",
	fullRecipe: "required|string"
};


const validateUpdateNewRecipeForAccountRule = {
	recipeId: "required",
	accountId: "required"
};


const validate = async (requestBody, ruleToValidateBy) => {
	const v = new Validator(requestBody, ruleToValidateBy);
	const matched = await v.check();
	if (!matched) {
		throw {
			status: 400,
			message: 'error validate'
		};
	}
};

module.exports = {
	validate,
	validateCreateNewAccountRule,
	validateLoginRule,
	validateCreateNewRecipeRule,
	validateUpdateNewRecipeForAccountRule
};
