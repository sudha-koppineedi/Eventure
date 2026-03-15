import React, { useState, useEffect } from "react";
import leaderboardService from "../../services/leaderboardService";

import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert
} from "@mui/material";

const CollegeLeaderboard = () => {

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchColleges = async () => {

      try {

        const data = await leaderboardService.getCollegeLeaderboard();

        setColleges(data || []);

      } catch (err) {

        setError(
          err.response?.data?.message ||
          "Failed to load college rankings"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchColleges();

  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );

  if (error)
    return <Alert severity="error">{error}</Alert>;

  if (!colleges.length)
    return <Alert severity="info">No college rankings yet</Alert>;

  return (

    <Paper sx={{ p: 3 }}>

      <Typography variant="h5" gutterBottom>
        College Rankings
      </Typography>

      <List>

        {colleges.map((college, index) => (

          <ListItem key={index}>

            <ListItemText
              primary={`${index + 1}. ${college.college}`}
              secondary={`${college.totalScore} pts • ${college.participantCount} participants`}
            />

          </ListItem>

        ))}

      </List>

    </Paper>

  );

};

export default CollegeLeaderboard;