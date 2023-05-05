const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');
const app = express();
var PORT = process.env.PORT || 8080;

// this runs the Date.now and generates a timestamp ID that I'll use to DELETE notes (thanks to the id alocated to each note)
//function uuid() {
//   return Date.now();
//}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const root = path.join(__dirname, './public');
app.use(express.static(root));

app.get('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    const newNotes = req.body;
    newNotes.id = uuid();
    notes.push(newNotes);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
});


app.get('/notes', (req, res) => {
    res.sendFile('index.html', {root});
});

// Sets routing to 'notes.html' as the endpoint when wanting to add notes 
app.get('/notes', function (req, res) {
    res.sendFile('notes.html', {root});
});

// This function will start the server and follow the configuration to listen to the PORT 8080 which is by default the most commonly used for this kinda app 
app.listen(PORT, function () {
    console.log(`App listening at http://localhost:${PORT}`);
});