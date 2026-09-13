
const Note = require('../models/Note');

// @desc    Create a note
// @route   POST /api/notes
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Please add all fields' });
        }

        const note = await Note.create({
            title,
            content,
            owner: req.user.id // This comes from your auth middleware
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get notes
// @route   GET /api/notes
const getNotes = async (req, res) => {
    try {
        // Only get notes that belong to the logged-in user
        const notes = await Note.find({ owner: req.user.id });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Check for user ownership (This gives you the 403!)
        if (note.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to delete this note' });
        }

        await note.deleteOne();
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createNote,
    getNotes,
    deleteNote
};