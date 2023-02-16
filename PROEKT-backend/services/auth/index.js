const config = require("../../pkg/config");
const connectDB = require("../../pkg/database");
const morgan = require("morgan");
const auth = require("./handlers");
const cors = require('cors');
connectDB();

const { authentication: { port } } = config.getConfigPropertyValue("services");
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
				"/api/v1/auth/login",
				"/api/v1/auth/create-user"
			],
		})
);


app.post("/api/v1/auth/login", auth.login);

app.post("/api/v1/auth/create-user", auth.register);

app.get("/api/v1/auth/get-profile/:id", auth.getProfileById);

app.post("/api/v1/auth/edit-profile/:id", auth.updateProfile);

app.listen(port, (err) => {
	if (err) {
		throw new Error(
			`Cannot start server running on http://localhost:${port}`,
			err
		);
	}
	console.log(`Auth server running on http://localhost:${port}`);
});
