const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");
var cors = require("cors");

const app = express();
const router = express.Router();

app.use(cors());

router.get("/details/", (req, res) => {

	let endpoint =
		"https://jobs.github.com/positions/" + req.params.endpoint + ".json";
	axios
		.get(endpoint)
		.then((response) => {
			res.json(response.data);
		})
		.catch((error) => {
			res.json(error);
		});
});

router.get("/:endpoint([\\/\\w\\.-]*)", (req, res) => {
	let endpoint =
		"https://jobs.github.com/positions.json?" + req.params.endpoint;
	axios
		.get(endpoint)
		.then((response) => {
			res.json(response.data);
		})
		.catch((error) => {
			res.json(error);
		});
});

// http://localhost:9000/.netlify/functions/api/description=ruby&page=1



app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
