const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/db.json');
const api = require('./public/routes/notes.js')
const app = express();
const PORT = 3001;

// middleware
app.use(express.json());
app.use('/api', api);
app.use(express.static('public'));
// may need urlencoded here

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/assets/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/assets/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);