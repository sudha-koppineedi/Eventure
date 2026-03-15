import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { announcementService, eventService } from "../../services";
import { useAuth } from "../../context/AuthContext";

import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Autocomplete,
  FormControlLabel,
  Switch,
  Divider
} from "@mui/material";

const AnnouncementForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isEditMode = Boolean(id);

  const initialData =
    location.state?.announcement || {
      title: "",
      content: "",
      eventId: null,
      priority: "medium",
      isPublished: true
    };

  const [formData, setFormData] = useState(initialData);
  const [events, setEvents] = useState([]); // always array
  const [loading, setLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEditMode && !location.state?.announcement) {
      fetchAnnouncement();
    }

    fetchEvents();
  }, [id]);

  const fetchAnnouncement = async () => {
    setLoading(true);

    try {
      const response = await announcementService.getAnnouncementById(id);

      if (response?.data) {
        setFormData(response.data);
      }
    } catch (err) {
      setError(err?.message || "Failed to fetch announcement");
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    setEventsLoading(true);

    try {
      const response = await eventService.getAllEvents();

      if (response?.data) {
        setEvents(response.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "isPublished") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEventChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      eventId: newValue ? newValue._id : null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      if (isEditMode) {
        await announcementService.updateAnnouncement(id, formData);
      } else {
        await announcementService.createAnnouncement(formData);
      }

      setSuccess(true);

      setTimeout(() => {
        navigate("/announcements");
      }, 1500);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to save announcement");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={5}>
        <CircularProgress />
      </Box>
    );
  }

  const selectedEvent =
    events.find((event) => event._id === formData.eventId) || null;

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {isEditMode ? "Edit Announcement" : "Create Announcement"}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Announcement {isEditMode ? "updated" : "created"} successfully!
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              inputProps={{ maxLength: 100 }}
              helperText={`${formData.title.length}/100 characters`}
            />
          </Grid>

          <Grid xs={12}>
            <TextField
              fullWidth
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              multiline
              rows={6}
              required
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <Autocomplete
              options={events}
              loading={eventsLoading}
              getOptionLabel={(option) => option?.title || ""}
              value={selectedEvent}
              onChange={handleEventChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Related Event"
                  helperText="Optional"
                />
              )}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>

              <Select
                name="priority"
                value={formData.priority}
                label="Priority"
                onChange={handleChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>

              <FormHelperText>
                Set the importance level
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isPublished}
                  onChange={handleChange}
                  name="isPublished"
                />
              }
              label="Publish immediately"
            />
          </Grid>

          <Grid
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 2
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate("/announcements")}
              disabled={submitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
            >
              {submitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : isEditMode ? (
                "Update Announcement"
              ) : (
                "Create Announcement"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AnnouncementForm;