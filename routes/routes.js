const fs = require('fs');
const path = require('path');

module.exports = app => {

    // Here initialize notes variable
    fs.readFile("db/db.json","utf8", (err, data) => {

        if (err) throw err;

        var notes = JSON.parse(data);

        // Setup API ROUTES HERE
        // ========================================================
    
        // Here we setup the /api/notes (get) route
        app.get("/api/notes", (req, res) => {
            // Here read the db.json file and retrieve all saved notes in JSON data formate.
            res.json(notes);
        });

        // Here we setup the /api/notes (post) route
        app.post("/api/notes", (req, res) => {
            // Receives a new note, adds it to db.json, then returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: "+newNote.title);
        });

        // Gets a note with specific id
        app.get("/api/notes/:id", (req, res) => {
            // Show json for the notes array indices of the provided id
            res.json(notes[req.params.id]);
        });

        // App deletes a note with specific id
        app.delete("/api/notes/:id", (req, res) => {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id "+req.params.id);
        });

        // HERE VIEW ROUTES
        // ========================================================

        // Show notes.html when /notes is retrieved
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });
        
        // Show index.html when all other routes are retrieved
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        // Here app updates the db.json file in db by the time a new note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
                if (err) throw err;
                return true;
            });
        }

    });

}