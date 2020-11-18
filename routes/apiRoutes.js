// ===============================================================================
// LOAD DATA
// ===============================================================================
const fs = require("fs");
const db = "./db/db.json";
const arrayNotesCurrent = JSON.parse(fs.readFileSync(db));

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // let arrayNotesNew = [];

  // API GET Requests
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    // let arrayNotesCurrent = JSON.parse(fs.readFileSync(db));
    res.send(arrayNotesCurrent);
  });

  // API POST Requests
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function (req, res) {
    let objNewNote = req.body;
    let nextId = arrayNotesCurrent.length + 1;
    objNewNote.id = nextId;

    let arrayNotesNew = arrayNotesCurrent;

    arrayNotesNew.push(objNewNote);

    fs.writeFileSync(db, JSON.stringify(arrayNotesNew, null, "\t"));

    console.log(arrayNotesNew);

    res.send(objNewNote);
  });

  // ---------------------------------------------------------------------------
  // API Delete Route

  app.delete("/api/notes/:id", function (req, res) {
    let newNotesArray = arrayNotesCurrent.filter(function (value, index, arr) {
      return value.id != req.params.id;
    });

    fs.writeFileSync(db, JSON.stringify(newNotesArray, null, "\t"));

    console.log(arrayNotesCurrent);
    console.log(newNotesArray);
    console.log(req.params.id);

    //res.send("received a delete request");
    res.json({ ok: true });
  });
};
