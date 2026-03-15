import React, { useState, useEffect } from 'react';
import { leaderboardService } from '../../services';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  Grid
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const TopPerformers = () => {

  const [topPerformers, setTopPerformers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchTopPerformers = async () => {

      try {

        setLoading(true);
        setError(null);

        const data = await leaderboardService.getTopPerformers();

        setTopPerformers(data || []);

      } catch (err) {

        console.error("Error fetching top performers:", err);

        setError(
          err.response?.data?.message ||
          "Failed to load top performers"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchTopPerformers();

  }, []);


  const getAvatarColor = (index) => {

    switch (index) {
      case 0: return "#FFD700";
      case 1: return "#C0C0C0";
      case 2: return "#CD7F32";
      default: return "#1976d2";
    }

  };


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!topPerformers.length) {
    return (
      <Alert severity="info" sx={{ my: 2 }}>
        No top performers data available yet.
      </Alert>
    );
  }

  return (

    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>

      <Box display="flex" alignItems="center" mb={2}>
        <EmojiEventsIcon sx={{ mr: 1, color: "#FFD700" }} />
        <Typography variant="h5">
          Top Performers
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" paragraph>
        Participants with the highest scores across all events
      </Typography>

      <List>

        {topPerformers.map((performer, index) => (

          <React.Fragment key={performer._id || index}>

            {index > 0 && <Divider variant="inset" component="li" />}

            <ListItem
              sx={{
                py: 2,
                "&:hover": { backgroundColor: "action.hover" }
              }}
            >

              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: getAvatarColor(index)
                  }}
                >
                  {index + 1}
                </Avatar>
              </ListItemAvatar>

              <ListItemText

                primary={
                  <Typography fontWeight="bold">
                    {performer.userName || "Participant"}
                  </Typography>
                }

                secondary={

                  <>
                  
                    <Grid container spacing={2} sx={{ mt: 1 }}>

                      <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center">
                          <SchoolIcon
                            fontSize="small"
                            sx={{ mr: 1 }}
                          />
                          <Typography variant="body2">
                            {performer.college || "N/A"}
                          </Typography>
                        </Box>
                      </Grid>

                    </Grid>

                    <Box mt={1}>

                      <Typography
                        variant="h6"
                        color="primary"
                        fontWeight="bold"
                      >
                        {performer.score || 0} pts
                      </Typography>

                    </Box>

                    {performer.achievements &&
                     performer.achievements.length > 0 && (

                      <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>

                        {performer.achievements.map((a, i) => (

                          <Chip
                            key={i}
                            label={a}
                            size="small"
                            variant="outlined"
                          />

                        ))}

                      </Box>

                    )}

                  </>

                }

              />

            </ListItem>

          </React.Fragment>

        ))}

      </List>

    </Paper>

  );

};

export default TopPerformers;