import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  fetchReportById,
  updateReport,
  deleteReport,
  clearError,
} from '../redux/slices/reportSlice';

const ReportDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentReport, loading, error } = useSelector((state) => state.reports);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchReportById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentReport) {
      setEditData({
        title: currentReport.title,
        description: currentReport.description,
        status: currentReport.status,
        priority: currentReport.priority,
        dueDate: currentReport.dueDate
          ? new Date(currentReport.dueDate).toISOString().split('T')[0]
          : '',
      });
    }
  }, [currentReport]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    dispatch(clearError());
    const result = await dispatch(updateReport({ id, data: editData }));
    if (result.payload) {
      setIsEditing(false);
    }
  };

  const handleDeleteConfirm = async () => {
    dispatch(clearError());
    const result = await dispatch(deleteReport(id));
    if (result.payload) {
      setOpenDeleteDialog(false);
      navigate('/reports');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      'in-progress': 'info',
      completed: 'success',
      'on-hold': 'default',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!currentReport) {
    return (
      <Box>
        <Alert severity="error">Report not found</Alert>
        <Button onClick={() => navigate('/reports')} sx={{ mt: 2 }}>
          Back to Reports
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/reports')}
        sx={{ mb: 2 }}
      >
        Back to Reports
      </Button>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Card sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {currentReport.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={currentReport.reportType} color="primary" size="small" />
              <Chip
                label={currentReport.status}
                color={getStatusColor(currentReport.status)}
                size="small"
              />
              <Chip label={currentReport.priority} variant="outlined" size="small" />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              startIcon={<DeleteIcon />}
              variant="outlined"
              color="error"
              onClick={() => setOpenDeleteDialog(true)}
            >
              Delete
            </Button>
          </Box>
        </Box>

        {isEditing ? (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={editData.status}
                    onChange={handleEditChange}
                    label="Status"
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="on-hold">On Hold</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    name="priority"
                    value={editData.priority}
                    onChange={handleEditChange}
                    label="Priority"
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="critical">Critical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Due Date"
                  name="dueDate"
                  type="date"
                  value={editData.dueDate}
                  onChange={handleEditChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveEdit}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Report Type
              </Typography>
              <Typography variant="body1">{currentReport.reportType}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Status
              </Typography>
              <Typography variant="body1">{currentReport.status}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Priority
              </Typography>
              <Typography variant="body1">{currentReport.priority}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Due Date
              </Typography>
              <Typography variant="body1">
                {currentReport.dueDate
                  ? new Date(currentReport.dueDate).toLocaleDateString()
                  : 'Not set'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary">
                Description
              </Typography>
              <Typography variant="body1">{currentReport.description || 'No description'}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Created
              </Typography>
              <Typography variant="body2">
                {new Date(currentReport.createdAt).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Last Updated
              </Typography>
              <Typography variant="body2">
                {new Date(currentReport.updatedAt).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Report</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this report? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={loading}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportDetail;
