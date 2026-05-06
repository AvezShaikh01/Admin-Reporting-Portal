const Report = require('../models/Report');

const getAllReports = async (req, res) => {
  try {
    const { reportType, status, priority } = req.query;
    const filter = { userId: req.user.userId };

    if (reportType) filter.reportType = reportType;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const reports = await Report.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('comments.userId', 'name email');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    if (report.userId._id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReport = async (req, res) => {
  try {
    const { title, description, reportType, status, priority, dueDate } = req.body;

    if (!title || !reportType) {
      return res.status(400).json({ message: 'Title and reportType are required' });
    }

    const report = await Report.create({
      title,
      description,
      reportType,
      status,
      priority,
      dueDate,
      userId: req.user.userId,
    });

    res.status(201).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReport = async (req, res) => {
  try {
    let report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    if (report.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    if (report.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Report.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Report deleted',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};
