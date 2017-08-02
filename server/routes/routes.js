var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
// Remote server for testing
var db = mongojs('mongodb://admin:admin@ds129333.mlab.com:29333/transformer-db', ['factions', 'transformers', 'vehicles']);


// Get filtered transformers
router.get('/transformers', (req, res, next) => {

    var name = req.query.name;

    if(name){

        var regexValue = '\.*' + name + '\.*';

        db.transformers
            .find({ name: new RegExp(regexValue, 'i') })
            .sort({ name: 1 }, (err, transformer) => {
                if(err) {
                    res.send(err);
                }

                res.json(transformer);
            }); 

    } else {

        db.transformers
            .find()
            .sort({ name : 1}, (err, transformer) => {
                if(err) {
                    res.send(err);
                }

                res.json(transformer);
            });

    }
});

// Get transformer by id
router.get('/transformer/:id', (req, res, next) => {

    db.transformers.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, transformer) => {
        if(err) {
            res.send(err);
        }

        res.json(transformer);
    });
});

// Update transformer
router.put('/transformer/:id', (req, res, next) => {

    var transformer = req.body;

    if(transformer._id){
        // Update
        transformer._id = mongojs.ObjectId(req.params.id);
    } else {
        // Insert
        transformer._id = null;
    }

    db.transformers.save(transformer, {}, (err, transformer) => {
        if(err) {
            res.send(err);
        }

        res.json(transformer);
    }); 
});

// Delete transformer
router.delete('/transformer/:id', (req, res, next) => {

    db.transformers.remove({_id: mongojs.ObjectId(req.params.id)}, (err, transformer) => {
        if(err) {
            res.send(err);
        }

        res.json(transformer);
    });
});


// Get vehicles
router.get('/vehicles', (req, res, next) => {
    db.vehicles.find((err, vehicles) => {
        if(err) {
            res.send(err);
        }

        res.json(vehicles);
    });
    
});

// Get all factions
router.get('/factions', (req, res, next) => {
    db.factions.find((err, tasks) => {
        if(err) {
            res.send(err);
        }

        res.json(tasks);
    });
});

// Get signle faction
router.get('/faction/:id', (req, res, next) => {
    db.factions.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if(err) {
            res.send(err);
        }

        res.json(task);
    });
});

module.exports = router;