const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/db.json');
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))

//paths for url
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// get api/notes returns existing database
app.get('/api/notes', (req, res) => {
  res.status(200).json(noteData);
});

// post api/notes reads the existing database and adds the new entry
app.post('/api/notes', (req, res) => {
  const note = req.body;
  note.id =  Math.floor((Math.random()) * 1000000).toString();
  noteData.push(note);
  fs.writeFileSync("./db/db.json", JSON.stringify(noteData), function(err) {
    if (err) throw (err);        
  }); 
  res.json(noteData); 
});

app.delete('/api/notes/:id', (req, res) => {
  const deleteId = req.params.id;
  const filteredData = noteData.filter((note) => note.id != deleteId);
  console.log(filteredData);
  fs.writeFileSync("./db/db.json", JSON.stringify(filteredData), function(err) {
    if (err) throw (err);        
  });
  res.json(filteredData); 
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);