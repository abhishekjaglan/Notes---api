const asyncHandler = require("express-async-handler");
const Note = require("../Models/notesModel");

// @desc: Search notes based on keyword for auth user
// @route: GET /api/search?q=:query

const searchNote = asyncHandler( async(req, res) => {

    try {
        const { q } = req.query;
        const userId = req.user.id;
    
        const resultNotes = await Note.find({
          $or: [
            { $text: { $search: q } },
            { author: userId },
            // { sharedWith: userId },
          ],
        });
    
        res.status(200).json(resultNotes);
      } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

});

module.exports = searchNote;