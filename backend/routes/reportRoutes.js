const express = require('express');
const {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
} = require('../controllers/reportController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllReports);
router.post('/', createReport);
router.get('/:id', getReportById);
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);

module.exports = router;
