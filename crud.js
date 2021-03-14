const express = require('express');

const defaults = {
    endpoint: '',
    middlewares: {
        get: null,
        post: null
    }
}

/**
 * 
 * @param {{endpoint: string, db: object, middlewares: {get: [{}], post: [{}]}}} settings 
 */
function crudFactory(settings) {
    const crud = express.Router();

    settings = Object.assign(defaults, settings);

    crud.get(settings.endpoint, function (req, res) {
        settings.db.read(function (err, data) {
            if (err) return res.status(500).send();

            res.json(data);
        });
    });


    crud.get(`${settings.endpoint}/:id`, function (req, res) {
        const prediction = e => e.id === +req.params.id;
        
        settings.db.filter(prediction, function (err, data) {
            if (err) return res.status(500).send();

            res.json(data);
        });
    });

    crud.post(settings.endpoint, function (req, res) {
        const postData = req.body;
        settings.db.create(postData, function (err, data) {
            if (err) return res.status(500).send(err);

            res.status(201).json(data);
        });
    });

    crud.put(settings.endpoint, function (req, res) {
        const postData = req.body;
        settings.db.update(postData, function (err, success) {
            if (err) return res.status(500).send();

            res.status(200).json(success);
        });
    });

    crud.delete(settings.endpoint, function (req, res) {
        const { id } = req.query;
        settings.db.remove(id, function (err, data) {
            if (err) return res.status(500).send();

            res.status(204).send();
        });
    });

    return crud;
}

module.exports = crudFactory;