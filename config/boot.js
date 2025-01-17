// Set the environment to development if not already set
const environment = process.env.NODE_ENV || "development";

// Import the database configuration based on the current environment
const knexConfig = require("./database")[environment];

// Initialize Knex with the configuration
const knex = require("knex")(knexConfig);

// Bind the Knex instance to the Objection.js Model
const { Model } = require('objection');
Model.knex(knex);

