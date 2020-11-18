// ===============================================================================
// LOAD DATA
// ===============================================================================
const fs = require("fs");
// const db = require("../db/db.json")

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  const db = "./db/db.json";

  let arrayNotesNew = [];

  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    let arrayNotesCurrent = JSON.parse(fs.readFileSync(db));
    res.send(arrayNotesCurrent);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function (req, res) {
    let objNewNote = req.body;
    // let arrayNotesCurrent = [];

    let arrayNotesCurrent = JSON.parse(fs.readFileSync(db));
    let nextId = arrayNotesCurrent.length + 1;
    objNewNote.id = nextId;

    // let arrayNotesNew = arrayNotesCurrent.push(objNewNote);
    //   if (err) throw err;

    //   arrayNotesCurrent = data;
    let arrayNotesNew = arrayNotesCurrent;

    arrayNotesNew.push(objNewNote);

    //   let newData = data.replace(/.*/, arrayNotesNew);

    fs.writeFileSync(db, JSON.stringify(arrayNotesNew, null, "\t"));
    // });

    // console.log(objNewNote);
    // console.log(arrayNotesCurrent);
    console.log(arrayNotesNew);

    res.send(objNewNote);
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.delete("/api/notes/?id", function (req, res) {
    res.send("Got a Delete Request at /:id");

    // res.json({ ok: true });
  });
};
