const Lead = require("../models/Lead");
const Note = require("../models/Note");

const createLead = async (req, res) => {
  try {
    const {
      leadName,
      companyName,
      email,
      phoneNumber,
      leadSource,
      assignedSalesperson,
      status,
      estimatedDealValue
    } = req.body;

    if (
      !leadName ||
      !companyName ||
      !email ||
      !phoneNumber ||
      !leadSource ||
      !assignedSalesperson ||
      estimatedDealValue === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required lead fields."
      });
    }

    const lead = await Lead.create({
      leadName,
      companyName,
      email,
      phoneNumber,
      leadSource,
      assignedSalesperson,
      status,
      estimatedDealValue
    });

    return res.status(201).json({
      success: true,
      message: "Lead created successfully.",
      lead
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while creating lead.",
      error: error.message
    });
  }
};

const getLeads = async (req, res) => {
  try {
    const { status, leadSource, assignedSalesperson, search } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (leadSource) {
      filter.leadSource = leadSource;
    }

    if (assignedSalesperson) {
      filter.assignedSalesperson = {
        $regex: assignedSalesperson,
        $options: "i"
      };
    }

    if (search) {
      filter.$or = [
        {
          leadName: {
            $regex: search,
            $options: "i"
          }
        },
        {
          companyName: {
            $regex: search,
            $options: "i"
          }
        },
        {
          email: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leads.length,
      leads
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching leads.",
      error: error.message
    });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found."
      });
    }

    const notes = await Note.find({
      lead: lead._id
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      lead,
      notes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching lead details.",
      error: error.message
    });
  }
};

const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found."
      });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully.",
      lead: updatedLead
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while updating lead.",
      error: error.message
    });
  }
};

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found."
      });
    }

    await Note.deleteMany({
      lead: req.params.id
    });

    await Lead.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Lead and related notes deleted successfully."
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while deleting lead.",
      error: error.message
    });
  }
};

const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "New",
      "Contacted",
      "Qualified",
      "Proposal Sent",
      "Won",
      "Lost"
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead status."
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lead status updated successfully.",
      lead
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while updating lead status.",
      error: error.message
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();

    const newLeads = await Lead.countDocuments({
      status: "New"
    });

    const qualifiedLeads = await Lead.countDocuments({
      status: "Qualified"
    });

    const wonLeads = await Lead.countDocuments({
      status: "Won"
    });

    const lostLeads = await Lead.countDocuments({
      status: "Lost"
    });

    const totalEstimatedResult = await Lead.aggregate([
      {
        $group: {
          _id: null,
          totalEstimatedDealValue: {
            $sum: "$estimatedDealValue"
          }
        }
      }
    ]);

    const totalWonResult = await Lead.aggregate([
      {
        $match: {
          status: "Won"
        }
      },
      {
        $group: {
          _id: null,
          totalWonDealValue: {
            $sum: "$estimatedDealValue"
          }
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalLeads,
        newLeads,
        qualifiedLeads,
        wonLeads,
        lostLeads,
        totalEstimatedDealValue:
          totalEstimatedResult[0]?.totalEstimatedDealValue || 0,
        totalWonDealValue:
          totalWonResult[0]?.totalWonDealValue || 0
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching dashboard stats.",
      error: error.message
    });
  }
};

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
  getDashboardStats
};