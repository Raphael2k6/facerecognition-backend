const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '3501a3103fe64aa389e3942a6e3aa908'
});

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => {
            res.status(400).json('unable to get entries')
        })
}

//in ES6 if both key value pairs have the same name only one can be taken
module.exports = {
    handleImage,
    handleApiCall
}