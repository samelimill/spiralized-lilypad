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
  console.log(`${req.method} request received`);
  res.status(200).json(noteData);
});

// post api/notes reads the existing database and adds the new entry
app.post('/api/notes', (req, res) => {
  const note = req.body;
  const idNum =  Math.floor((Math.random()) * 1000000);
  //  const idArray = { id : `${idNum}`};
 // console.log(idArray);
  //note.push(idArray);
  note.id = `${idNum}`;
  
  console.log(note);
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    const notes = JSON.parse(data);
    notes.push(note);
    const updatedNotes = JSON.stringify(notes);
    fs.writeFile('./db/db.json', updatedNotes, (err, data) =>
    err ? console.error(err) : console.log('Notes updated')
    )
  });
});

app.delete('/api/notes', (req, res) => {
  console.log('')
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);