const Note = require('../models/Note');

const createNote = async (req, res) => {
  const { title, description } = req.body;
  const note = await Note.create({
    title,
    description,
    userId: req.user._id,
  });
  res.status(201).json(note);
};

const getNotes = async (req, res) => {
  const { search, filter } = req.query;
  let query = { userId: req.user._id };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (filter === 'recent') {
    const notes = await Note.find(query).sort({ createdAt: -1 });
    return res.json(notes);
  }

  if (filter === 'updated') {
    const notes = await Note.find(query).sort({ updatedAt: -1, createdAt: -1 });
    return res.json(notes);
  }

  const notes = await Note.find(query).sort({ updatedAt: -1, createdAt: -1 });
  res.json(notes);
};

const getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note || note.userId.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Note not found');
  }
  res.json(note);
};

const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note || note.userId.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Note not found');
  }

  note.title = req.body.title || note.title;
  note.description = req.body.description || note.description;
  const updatedNote = await note.save();
  res.json(updatedNote);
};

const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note || note.userId.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Note not found');
  }
  await note.remove();
  res.json({ message: 'Note deleted successfully' });
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
