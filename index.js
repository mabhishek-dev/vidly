import express from "express";
import routes from "./startup/routes.js";
import db from "./startup/db.js";
import config from "./startup/config.js";
import logging from "./startup/logging.js";
import validation from "./startup/validation.js";
import prod from "./startup/prod.js";

const app = express();

logging(); // Initialize logging (handle exceptions & rejections)
config(); // Ensure required configuration (i.e JWT key) exists
validation(); // Extend Joi with custom validators (i.e objectId)
db(); // Establish database connection
prod(app); // Enable production middleware (helmet, compression)
routes(app); // Register middleware and application routes

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
