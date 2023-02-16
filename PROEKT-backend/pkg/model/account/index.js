const mongoose = require("mongoose");

const Account = mongoose.model(
	"accounts",
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		birthday: { type: String, required: true },
		password: { type: String, required: true },
		image: {type: String}
		
	},
	"accounts"
);

module.exports = Account;
