const url = require("url");
const { locations: locationsMock } = require("./geocode.mock");

module.exports.geocodeRequest = (req, res, client) => {
  const { city, mock } = url.parse(req.url, true).query;
  if (mock === "true") {
    const locationMock = locationsMock[city.toLowerCase()];
    return res.json(locationMock);
  }
  client
    .geocode({
      params: {
        address: city,
        key: process.env.GOOGLE_KEY,
      },
      tmeout: 1000,
    })
    .then((result) => res.json(result.data))
    .catch((e) => {
      res.status(400);
      return res.send("Something went wrong");
    });
};
