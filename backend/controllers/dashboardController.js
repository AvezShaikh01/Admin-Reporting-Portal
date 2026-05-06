const Report = require('../models/Report');
const mongoose = require('mongoose');

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    const objectId = mongoose.Types.ObjectId(userId);

    // Total reports
    const totalReports = await Report.countDocuments({ userId });

    // By status
    const byStatus = await Report.aggregate([
      { $match: { userId: objectId } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // By type
    const byType = await Report.aggregate([
      { $match: { userId: objectId } },
      { $group: { _id: '$reportType', count: { $sum: 1 } } },
    ]);

    // Overdue reports
    const overdueReports = await Report.countDocuments({
      userId,
      dueDate: { $lt: new Date() },
      status: { $ne: 'completed' },
    });

    // Pending reports
    const pendingReports = await Report.countDocuments({
      userId,
      status: 'pending',
    });

    // Recent reports
    const recentReports = await Report.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name email');

    // Format data
    const formattedByStatus = {};
    byStatus.forEach((item) => {
      formattedByStatus[item._id] = item.count;
    });

    const formattedByType = {};
    byType.forEach((item) => {
      formattedByType[item._id] = item.count;
    });

    res.json({
      success: true,
      data: {
        totalReports,
        overdueReports,
        pendingReports,
        byStatus: formattedByStatus,
        byType: formattedByType,
        recentReports,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };
