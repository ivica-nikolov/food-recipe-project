const path = require('path');
const config = require("../../pkg/config");
const morgan = require("morgan");
const express = require("express");
const expressProxy = require("express-http-proxy");
const app = express();

const {
	proxy: { port },
	authentication: { port: authPort },
	recipes: {port: recipePort},
	storage: {port: storagePort}
} = config.getConfigPropertyValue("services");

app.use(morgan("tiny"));

app.use(
	"/api/v1/auth",
	expressProxy(`http://localhost:${authPort}`, {
		proxyReqPathResolver: (request) =>
			`http://localhost:${authPort}/api/v1/auth${request.url}`,
	})
);

app.use(
	"/api/v1/recipe",
	expressProxy(`http://localhost:${recipePort}`, {
		proxyReqPathResolver: (request) =>
			`http://localhost:${recipePort}/api/v1/recipe${request.url}`,
	})
);

app.use(
	"/api/v1/storage",
	expressProxy(`http://localhost:${storagePort}`, {
		proxyReqPathResolver: (request) =>
			`http://localhost:${storagePort}/api/v1/storage${request.url}`,
	})
);


app.listen(port, (err) => {
	if (err) {
		throw new Error(
			`Cannot start proxy running on http://localhost:${port}`,
			err
		);
	}
	console.log(`Proxy on http://localhost:${port}`);
});
