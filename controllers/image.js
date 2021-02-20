// IMAGE ROUTE
// This is for increasing the user entries number when they use the application.
// Gets the id from the body and uses Knex for incrementing entries.

const Clarifai = require('clarifai');

// API KEY
const app = new Clarifai.App({
  apiKey: '9bac07b2130a445db2f7a551388bfa95',
});

// Clarifai's face detection
const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json('unable to work with API'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id) // not === since this is sql
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json('unable to get entries'));
};

module.exports = {
  handleImage,
  handleApiCall,
};
