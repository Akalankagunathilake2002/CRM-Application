const Lead = require("../models/Lead");
const Note = require("../models/Note");

const addNote = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Note content is required."
      });
    }

    const lead = await Lead.findById(req.params.leadId);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found."
      });
    }

    const note = await Note.create({
      lead: req.params.leadId,
      content,
      createdBy: req.user.name
    });

    return res.status(201).json({
      success: true,
      message: "Note added successfully.",
      note
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while adding note.",
      error: error.message
    });
  }
};

const getNotesByLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.leadId);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found."
      });
    }

    const notes = await Note.find({
      lead: req.params.leadId
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: notes.length,
      notes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching notes.",
      error: error.message
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found."
      });
    }

    await Note.findByIdAndDelete(req.params.noteId);

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully."
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting note.",
      error: error.message
    });
  }
};

module.exports = {
  addNote,
  getNotesByLead,
  deleteNote
};