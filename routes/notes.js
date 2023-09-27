//boiler plate code
const notes = require("express").Router()
const db = require("../db/db.json")
const fs = require("fs")
const {v4:uuidv4} = require("uuid")
// read all the notes from db json 
notes.get("/", (req, res)=>{
    res.status(200).json(db)
})
// set variable for what a note is and assigns an Id to note then rewrites the db.json file
notes.post("/", (req, res)=>{
    const {
        title, text
    } = req.body
    const newNote = {
        title, text, id:uuidv4()
    }
    const result = {
        status: "success",
        body: newNote
    } 
    db.push(newNote)
    fs.writeFile("/db/db.json", JSON.stringify(db), (err)=>{
        err? console.error(err): console.log("note saved")
    })
    res.json(result)
})
// deletes note from the database 
notes.delete("/:id", (req, res)=>{
    const noteId = req.params.id
    const noteToDelete = db.findIndex((note)=> note.id === noteId)
    db.splice(noteToDelete, 1)
    fs.writeFile("/db/db.json", JSON.stringify(db),(err)=>{
        err? console.error(err): console.log("note deleted")
    })
    res.status(200).json({message: "deleted the note"})
})
module.exports = notes;