const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/db.json');
const api = require('./helpers/notes')
const app = express();
const PORT = 3001;

// middleware
app.use(express.json());
app.use('/api', api);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
    res.json(noteData);
});

app.post('/api/notes', (req, res) => {
    res.json(noteData);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);