const express = require('express');
const path = require('path');
const fs = require('fs');
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
  const noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(noteData);
});

// post api/notes reads the existing database, adds a new note with id, and rewrites the db
app.post('/api/notes', (req, res) => {
  const noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  const note = req.body;
  note.id =  Math.floor((Math.random()) * 1000000).toString();
  noteData.push(note);
  fs.writeFileSync("./db/db.json", JSON.stringify(noteData), function(err) {
    if (err) throw (err);        
  }); 
  res.json(noteData); 
});

app.delete('/api/notes/:id', (req, res) => {
  const noteData = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
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