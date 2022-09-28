const url = require("url");
const { mocks, addMockImage } = require("./mock");

const addGoogleImage = (restaurant) => {
  const ref = restaurant.photos[0].photo_reference;
  if (!ref) {
    restaurant.photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ];
    return restaurant;
  }
  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref}&key=${process.env.GOOGLE_KEY}`,
  ];
  return restaurant;
};

module.exports.placesRequest = (req, res, client) => {
  const { location, mock } = url.parse(req.url, true).query;

  if (mock === "true") {
    const data = mocks[location];

    if (data) {
      data.results.map(addMockImage);
      return res.jsondata();
    }
  }

  client
    .placesNearby({
      params: {
        location,
        type: "restaurant",
        radius: 1500,
        key: process.env.GOOGLE_KEY,
      },
      tmeout: 1000,
    })
    .then((resp) => {
      resp.data.results = resp.data.results.map(addGoogleImage);

      res.json(resp.data);
    })
    .catch((e) => {
      res.status(400);
      return res.send("Something went wrong");
    });
};
