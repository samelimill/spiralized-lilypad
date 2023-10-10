const express = require('express');
const app = express();

        app.get('/', (req, res) => {
            readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
        });
        
        // POST Route for a new UX/UI tip
        tips.post('/', (req, res) => {
            console.log(req.body);
        
            const { username, topic, tip } = req.body;
        
            if (req.body) {
            const newTip = {
                username,
                tip,
                topic,
                tip_id: uuid(),
            };
        
            readAndAppend(newTip, './db/tips.json');
            res.json(`Tip added successfully`);
            } else {
            res.error('Error in adding tip');
            }
        });
        
        module.exports = tips;