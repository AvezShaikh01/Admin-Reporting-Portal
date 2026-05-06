const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    reportType: {
      type: String,
      enum: ['visa', 'deployment', 'invoices', 'grievances'],
      required: [true, 'Please specify report type'],
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'on-hold', 'cancelled'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    dueDate: Date,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    attachments: [String],
    comments: [{
      userId: mongoose.Schema.Types.ObjectId,
      text: String,
      createdAt: { type: Date, default: Date.now },
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
