const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title:  {type: String, 
            required: true,
    },
    content:{type: String, 
            required: true,
    },
    author: {type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true,
    },
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},
{
    timestamps: true
});

// text indexing on title and content for searching notes
noteSchema.index({ title: 'text', content: 'text' });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;