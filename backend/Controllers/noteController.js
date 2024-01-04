const asyncHandler = require("express-async-handler");
const Note = require("../Models/notesModel");
const User = require("../Models/userModel");

// @desc: Get all notes for authorized user
// @route: /api/notes
// @ccess: private

const getNotes = asyncHandler( async (req,res) => {
    const notes = await Note.find({ author : req.user.id });
    
    if(!notes){
        res.status(404);
        throw new Error("No notes found !!")
    }
    res.status(200).json(notes);
});

// @desc: Create new note for authorized user
// @route: POST /api/notes
// @ccess: private

const createNote = asyncHandler( async (req,res) => {
    console.log('Request Body is:', req.body);
    const { title, content } = req.body;
    if(!title || !content){
        res.status(400);
        throw new Error("All fields not present!!");
    }

    const note = await Note.create({
        title,
        content,
        author: req.user.id,
    });

    res.status(201).json(note);
});

// @desc: Get a note by id for authorized user
// @route: GET /api/notes/:id
// @ccess: private

const getNoteId = asyncHandler( async (req,res) => {
    const note = await Note.findById(req.params.id);

    if(!note){
        res.status(404);
        throw new Error(`Note not found for ${req.params.id}`);
    }

    if(note.author.toString() !== req.user.id){
        res.status(403);
        throw new Error("Access not permitted to outside notes");
    }

    res.status(201).json(note);
});

// @desc: Update a note by id for authorized user
// @route: PUT /api/notes/:id
// @ccess: private

const updateNoteId = asyncHandler( async (req, res) => {
    const note = await Note.findById(req.params.id);

    if(!note){
        res.status(404);
        throw new Error(`Note not found for ${req.params.id}`);
    }

    if(note.author.toString() !== req.user.id){
        res.status(403);
        throw new Error("Access not permitted to outside notes");
    }

    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true}
    );

    res.status(200).json(updatedNote);
});

// @desc: Delete a note by id for authorized user
// @route: DELETE /api/notes/:id
// @ccess: private

const deleteNoteId = asyncHandler( async(req, res) => {
    const note = await Note.findById(req.params.id);

    if(!note){
        res.status(404);
        throw new Error(`Note not found for ${req.params.id}`);
    }

    if(note.author.toString() !== req.user.id){
        res.status(403);
        throw new Error("Access not permitted to outside notes");
    }

    const deletedNote = await Note.findByIdAndDelete(
        req.params.id
    );

    res.status(200).json(deletedNote);
});

// @desc: Share a note by id for authorized user with another user
// @route: POST /api/notes/:id/share
// @ccess: private

const shareNote = asyncHandler( async (req, res) => {
    const noteId = req.params.id;
    const { sharedUserId } = req.body;
    const userId = req.user.id;

    const note = await Note.findById(noteId);

    if(!note){
        res.status(404);
        throw new Error(`Note not found for ${noteId}`);
    }

    if(note.author.toString() !== userId){
        res.status(403);
        throw new Error("Access not permitted to outside notes");
    }

    const userToShareWith = await User.findById(sharedUserId);

    if(!userToShareWith){
        res.status(404);
        throw new Error(`User not found for ${sharedUserId}` );
    }

    if(note.sharedWith.includes(sharedUserId)){
        res.status(400);
        throw new Error(`Note is already shared with user ${sharedUserId}`);
    }

    note.sharedWith.push(sharedUserId);
    await note.save();

    let updatedNote = await Note.findById(noteId);

    res.status(200).json(updatedNote);
});

module.exports = { getNotes, createNote, getNoteId, updateNoteId, deleteNoteId, shareNote };