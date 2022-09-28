const express = require("express");
require("dotenv").config();
const { Client } = require("@googlemaps/google-maps-services-js");

const { geocodeRequest } = require("./api/geocode");
const { placesRequest } = require("./api/places");

const app = express();

const client = new Client({});

const PORT = process.env.PORT || 5000;

app.get("/geocode", (req, res) => {
  geocodeRequest(req, res, client);
});

app.get("/placesNearby", (req, res) => {
  placesRequest(req, res, client);
});

app.listen(PORT, () => {
  console.log("Server running on port ", +PORT);
});
