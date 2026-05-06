const express = require("express");

const {
  addNote,
  getNotesByLead,
  deleteNote
} = require("../controllers/noteController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:leadId", protect, addNote);
router.get("/:leadId", protect, getNotesByLead);
router.delete("/:noteId", protect, deleteNote);

module.exports = router;