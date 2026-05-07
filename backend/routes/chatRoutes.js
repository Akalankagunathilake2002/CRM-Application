const express = require("express");
const { chatWithGroq } = require("../controllers/chatController");

const router = express.Router();

router.post("/", chatWithGroq);

module.exports = router;