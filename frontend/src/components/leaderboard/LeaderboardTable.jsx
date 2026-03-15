import React, { useState, useEffect } from "react";
import leaderboardService from "../../services/leaderboardService";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Chip,
  Alert
} from "@mui/material";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const LeaderboardTable = ({ eventId }) => {

  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchLeaderboard = async () => {

      try {

        setLoading(true);
        setError(null);

        const data = await leaderboardService.getEventLeaderboard(eventId);

        console.log("Leaderboard API:", data);

        setLeaderboard(data || []);

      } catch (err) {

        console.error("Error fetching leaderboard:", err);

        setError(
          err.response?.data?.message ||
          "Failed to load leaderboard"
        );

      } finally {

        setLoading(false);

      }

    };

    if (eventId) {
      fetchLeaderboard();
    }

  }, [eventId]);

  const getMedalColor = (rank) => {

    switch (rank) {
      case 1: return "#FFD700";
      case 2: return "#C0C0C0";
      case 3: return "#CD7F32";
      default: return "transparent";
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

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <Alert severity="info" sx={{ my: 2 }}>
        No leaderboard data available for this event yet.
      </Alert>
    );
  }

  return (

    <Box sx={{ width: "100%", mb: 4 }}>

      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Event Leaderboard
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>

        <Table>

          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Rank
              </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Participant
              </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                College
              </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">
                Score
              </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Achievements
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>

            {leaderboard.map((entry, index) => (

              <TableRow
                key={entry._id || index}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: "action.hover" },
                  "&:hover": { backgroundColor: "action.selected" },
                  ...(entry.rank <= 3 && {
                    backgroundColor: `${getMedalColor(entry.rank)}20`
                  })
                }}
              >

                <TableCell>

                  <Box display="flex" alignItems="center">

                    {entry.rank <= 3 && (

                      <EmojiEventsIcon
                        sx={{ color: getMedalColor(entry.rank), mr: 1 }}
                      />

                    )}

                    {entry.rank || index + 1}

                  </Box>

                </TableCell>

                <TableCell>
                  {entry.userName || entry.userId}
                </TableCell>

                <TableCell>
                  {entry.college || "N/A"}
                </TableCell>

                <TableCell align="right">
                  <Typography fontWeight="bold">
                    {entry.score || 0}
                  </Typography>
                </TableCell>

                <TableCell>

                  <Box display="flex" flexWrap="wrap" gap={0.5}>

                    {entry.achievements?.length ? (

                      entry.achievements.map((ach, i) => (
                        <Chip
                          key={i}
                          label={ach}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                      ))

                    ) : (

                      <Typography variant="body2" color="text.secondary">
                        None
                      </Typography>

                    )}

                  </Box>

                </TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </TableContainer>

    </Box>

  );

};

export default LeaderboardTable;