const config = require("../../pkg/config");
const connectDB = require("../../pkg/database");
const morgan = require("morgan");
const imageHandler = require("./handlers");
const cors = require('cors');
connectDB();

const {storage: { port } } = config.getConfigPropertyValue("services");


const express = require("express");
const app = express();
app.use(cors());
app.use(morgan("tiny"));

app.use(express.json());

const fileUpload = require('express-fileupload')
app.use(fileUpload())


app.get("/api/v1/storage/:file", imageHandler.downlaodImg);

app.post("/api/v1/storage", imageHandler.uploadImg);



app.listen(port, (err) => {
	if (err) {
		throw new Error(
			`Cannot start server running on http://localhost:${port}`,
			err
		);
	}
	console.log(`Storage server running on http://localhost:${port}`);
});