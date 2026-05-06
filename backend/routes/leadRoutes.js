const express = require("express");

const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
  getDashboardStats
} = require("../controllers/leadController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard/stats", protect, getDashboardStats);

router
  .route("/")
  .post(protect, createLead)
  .get(protect, getLeads);

router
  .route("/:id")
  .get(protect, getLeadById)
  .put(protect, updateLead)
  .delete(protect, deleteLead);

router.patch("/:id/status", protect, updateLeadStatus);

module.exports = router;