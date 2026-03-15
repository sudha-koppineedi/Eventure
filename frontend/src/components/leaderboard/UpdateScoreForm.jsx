// import React, { useState, useEffect } from "react";
// import {
//   Paper,
//   Typography,
//   Box,
//   TextField,
//   Button,
//   MenuItem,
//   Alert,
//   CircularProgress,
//   Chip
// } from "@mui/material";

// import leaderboardService from "../../services/leaderboardService";
// import eventService from "../../services/eventService";

// const predefinedAchievements = [
//   "Best Innovation",
//   "Best Presentation",
//   "Winner",
//   "Runner Up",
//   "Participation"
// ];

// const UpdateScoreForm = ({ eventId, onScoreUpdated }) => {

//   const [participants, setParticipants] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState("");
//   const [score, setScore] = useState("");

//   const [selectedAchievements, setSelectedAchievements] = useState([]);
//   const [customAchievement, setCustomAchievement] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [participantsLoading, setParticipantsLoading] = useState(true);
//   const [error, setError] = useState(null);


//   /*
//   =========================================
//   FETCH PARTICIPANTS
//   =========================================
//   */

//   useEffect(() => {

//     const fetchParticipants = async () => {

//       if (!eventId) return;

//       try {

//         setParticipantsLoading(true);

//         const response = await eventService.getEventParticipants(eventId);

//         console.log("Participants API response:", response);

//         let list = [];

//         if (Array.isArray(response)) {
//           list = response;
//         } else if (Array.isArray(response?.participants)) {
//           list = response.participants;
//         } else if (Array.isArray(response?.data?.participants)) {
//           list = response.data.participants;
//         } else if (Array.isArray(response?.data)) {
//           list = response.data;
//         }

//         setParticipants(list);

//       } catch (err) {

//         console.error("Participants load error:", err);
//         setParticipants([]);

//       } finally {

//         setParticipantsLoading(false);

//       }

//     };

//     fetchParticipants();

//   }, [eventId]);


//   /*
//   =========================================
//   ADD CUSTOM ACHIEVEMENT
//   =========================================
//   */

//   const handleAddCustomAchievement = () => {

//     const trimmed = customAchievement.trim();

//     if (trimmed && !selectedAchievements.includes(trimmed)) {

//       setSelectedAchievements([
//         ...selectedAchievements,
//         trimmed
//       ]);

//       setCustomAchievement("");

//     }

//   };


//   /*
//   =========================================
//   REMOVE ACHIEVEMENT
//   =========================================
//   */

//   const handleRemoveAchievement = (ach) => {

//     setSelectedAchievements(
//       selectedAchievements.filter(a => a !== ach)
//     );

//   };


//   /*
//   =========================================
//   SUBMIT SCORE
//   =========================================
//   */

//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     if (!selectedUserId || score === "") {

//       setError("Please select participant and enter score");
//       return;

//     }

//     try {

//       setLoading(true);
//       setError(null);

//       const selectedParticipant = participants.find(
//         p => String(p.userId) === String(selectedUserId)
//       );

//       await leaderboardService.updateParticipantScore(
//         eventId,
//         selectedUserId,
//         {
//           score: Number(score),
//           achievements: selectedAchievements,
//           userName: selectedParticipant?.name,
//           college: selectedParticipant?.college
//         }
//       );

//       setScore("");
//       setSelectedAchievements([]);
//       setCustomAchievement("");
//       setSelectedUserId("");

//       if (onScoreUpdated) onScoreUpdated();

//     } catch (err) {

//       setError(
//         err.response?.data?.message ||
//         "Failed to update score"
//       );

//     } finally {

//       setLoading(false);

//     }

//   };


//   return (

//     <Paper sx={{ p: 3 }}>

//       <Typography variant="h6" gutterBottom>
//         Update Participant Score
//       </Typography>

//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>
//       )}

//       <Box component="form" onSubmit={handleSubmit}>

//         {/* PARTICIPANT DROPDOWN */}

//         <TextField
//           select
//           fullWidth
//           label="Participant"
//           value={selectedUserId}
//           onChange={(e) => setSelectedUserId(e.target.value)}
//           margin="normal"
//           required
//         >

//           {participantsLoading ? (

//             <MenuItem disabled>
//               Loading participants...
//             </MenuItem>

//           ) : participants.length === 0 ? (

//             <MenuItem disabled>
//               No participants found
//             </MenuItem>

//           ) : (

//             participants.map((p) => (
//               <MenuItem key={p.userId} value={p.userId}>
//                 {p.name} ({p.college || "N/A"})
//               </MenuItem>
//             ))

//           )}

//         </TextField>


//         {/* SCORE */}

//         <TextField
//           fullWidth
//           label="Score"
//           type="number"
//           value={score}
//           onChange={(e) => setScore(e.target.value)}
//           margin="normal"
//           required
//         />


//         {/* ACHIEVEMENTS */}

//         <TextField
//           select
//           fullWidth
//           label="Achievements"
//           SelectProps={{ multiple: true }}
//           value={selectedAchievements}
//           onChange={(e) => setSelectedAchievements(e.target.value)}
//           margin="normal"
//         >

//           {predefinedAchievements.map((option) => (
//             <MenuItem key={option} value={option}>
//               {option}
//             </MenuItem>
//           ))}

//         </TextField>


//         {/* CUSTOM ACHIEVEMENT */}

//         <Box display="flex" gap={2} mt={2}>

//           <TextField
//             fullWidth
//             label="Custom Achievement"
//             value={customAchievement}
//             onChange={(e) =>
//               setCustomAchievement(e.target.value)
//             }
//           />

//           <Button
//             variant="outlined"
//             onClick={handleAddCustomAchievement}
//           >
//             ADD
//           </Button>

//         </Box>


//         {/* ACHIEVEMENT CHIPS */}

//         <Box mt={2}>

//           {selectedAchievements.map((ach) => (

//             <Chip
//               key={ach}
//               label={ach}
//               onDelete={() => handleRemoveAchievement(ach)}
//               sx={{ mr: 1, mb: 1 }}
//             />

//           ))}

//         </Box>


//         {/* SUBMIT BUTTON */}

//         <Box mt={3}>

//           <Button
//             type="submit"
//             variant="contained"
//             disabled={loading}
//           >

//             {loading
//               ? <CircularProgress size={24} />
//               : "UPDATE SCORE"}

//           </Button>

//         </Box>

//       </Box>

//     </Paper>

//   );

// };

// export default UpdateScoreForm;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { leaderboardService, eventService } from "../../services";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const achievementOptions = [
  "First Place",
  "Second Place",
  "Third Place",
  "Best Presenter",
  "Best Innovation",
  "Best Design",
  "Best Technical Implementation",
  "Best Team Player",
  "Most Creative",
  "Audience Choice",
  "Perfect Attendance",
  "Early Bird",
  "Problem Solver",
  "Quick Learner",
  "Outstanding Contribution",
];

const UpdateScoreForm = ({ eventId, onScoreUpdated }) => {
  const { user } = useSelector((state) => state.auth);

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [newAchievement, setNewAchievement] = useState("");

  const [formData, setFormData] = useState({
    userId: "",
    score: "",
    achievements: [],
  });

  /*
  ===============================
  FETCH PARTICIPANTS
  ===============================
  */

  useEffect(() => {
    const fetchParticipants = async () => {
      if (!eventId) return;

      try {
        setLoading(true);

        let data = [];

        try {
          data = await eventService.getEventParticipants(eventId);
        } catch {
          const eventData = await eventService.getEventById(eventId);
          data = eventData?.participants || [];
        }

        const formatted = data.map((p) => {
          if (typeof p === "string") {
            return {
              _id: p,
              name: "Unknown",
              email: "Unknown",
              college: "Unknown",
            };
          }

          if (p.userId) {
            return {
              _id: p.userId,
              name: p.name || "Unknown",
              email: p.email || "Unknown",
              college: p.college || "Unknown",
            };
          }

          return {
            _id: p._id || p.id,
            name:
              p.name ||
              `${p.firstName || ""} ${p.lastName || ""}`.trim() ||
              "Unknown",
            email: p.email || "Unknown",
            college: p.college || "Unknown",
          };
        });

        setParticipants(formatted);
      } catch (err) {
        console.error("Participant fetch error:", err);
        setError("Failed to load participants.");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [eventId]);

  /*
  ===============================
  INPUT CHANGE
  ===============================
  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  ===============================
  ACHIEVEMENT CHANGE
  ===============================
  */

  const handleAchievementsChange = (event) => {
    const { value } = event.target;

    setFormData((prev) => ({
      ...prev,
      achievements: typeof value === "string" ? value.split(",") : value,
    }));
  };

  /*
  ===============================
  CUSTOM ACHIEVEMENT
  ===============================
  */

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;

    setFormData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement.trim()],
    }));

    setNewAchievement("");
    setOpenDialog(false);
  };

  /*
  ===============================
  SUBMIT SCORE
  ===============================
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userId) {
      setError("Please select a participant");
      return;
    }

    if (formData.score === "" || Number(formData.score) < 0) {
      setError("Enter a valid score");
      return;
    }

    const selected = participants.find((p) => p._id === formData.userId);

    if (!selected) {
      setError("Participant not found");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const scoreData = {
        score: Number(formData.score), // FIXED
        achievements: formData.achievements,
        userName: selected.name,
        college: selected.college || "Unknown",
      };

      await leaderboardService.updateParticipantScore(
        eventId,
        formData.userId,
        scoreData
      );

      setSuccess("Score updated successfully");

      setFormData({
        userId: "",
        score: "",
        achievements: [],
      });

      if (onScoreUpdated) {
        setTimeout(() => onScoreUpdated(), 400);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update score");
    } finally {
      setSubmitting(false);
    }
  };

  /*
  ===============================
  PERMISSION CHECK
  ===============================
  */

  if (!user || (user.role !== "admin" && user.role !== "organizer")) {
    return (
      <Alert severity="warning">
        You do not have permission to update scores.
      </Alert>
    );
  }

  /*
  ===============================
  UI
  ===============================
  */

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Update Participant Score</Typography>

      <Divider sx={{ my: 2 }} />

      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}

      {loading ? (
        <CircularProgress />
      ) : (
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Participant</InputLabel>

            <Select
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              label="Participant"
            >
              {participants.length === 0 ? (
                <MenuItem disabled>No participants</MenuItem>
              ) : (
                participants.map((p) => (
                  <MenuItem key={p._id} value={p._id}>
                    {p.name} ({p.college})
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Score"
            name="score"
            type="number"
            margin="normal"
            value={formData.score}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Achievements</InputLabel>

            <Select
              multiple
              value={formData.achievements}
              onChange={handleAchievementsChange}
              input={<OutlinedInput label="Achievements" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {achievementOptions.map((a) => (
                <MenuItem key={a} value={a}>
                  {a}
                </MenuItem>
              ))}

              <Divider />

              <MenuItem
                onClick={() => setOpenDialog(true)}
                sx={{ color: "primary.main" }}
              >
                <AddCircleOutlineIcon sx={{ mr: 1 }} />
                Add Custom Achievement
              </MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={submitting}
            sx={{ mt: 3 }}
          >
            {submitting ? "Updating..." : "Update Score"}
          </Button>
        </Box>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add Custom Achievement</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Enter a custom achievement.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            label="Achievement Name"
            fullWidth
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddAchievement}>Add</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UpdateScoreForm;