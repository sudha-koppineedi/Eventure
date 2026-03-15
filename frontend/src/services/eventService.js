import axios from "axios";

const API = "http://localhost:8000/api/events";

/*
========================================
GET TOKEN
========================================
*/
const getAuthHeader = () => {

  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

};

/*
========================================
GET ALL EVENTS
========================================
*/
const getAllEvents = async () => {

  const res = await axios.get(API);

  return res.data.data;

};

/*
========================================
GET SINGLE EVENT
========================================
*/
const getEventById = async (id) => {

  const res = await axios.get(`${API}/${id}`);

  return res.data.data;

};

/*
========================================
GET EVENT PARTICIPANTS
========================================
*/
const getEventParticipants = async (eventId) => {

  const res = await axios.get(
    `${API}/${eventId}/participants`,
    getAuthHeader()
  );

  return res.data.participants;

};

/*
========================================
REGISTER FOR EVENT
========================================
*/
const registerForEvent = async (eventId) => {

  const res = await axios.post(
    `${API}/${eventId}/register`,
    {},
    getAuthHeader()
  );

  return res.data;

};

/*
========================================
CANCEL REGISTRATION
========================================
*/
const cancelRegistration = async (eventId) => {

  const res = await axios.post(
    `${API}/${eventId}/cancel`,
    {},
    getAuthHeader()
  );

  return res.data;

};

/*
========================================
CREATE EVENT
========================================
*/
const createEvent = async (data) => {

  const res = await axios.post(
    API,
    data,
    getAuthHeader()
  );

  return res.data;

};

/*
========================================
UPDATE EVENT
========================================
*/
const updateEvent = async (id, data) => {

  const res = await axios.put(
    `${API}/${id}`,
    data,
    getAuthHeader()
  );

  return res.data;

};

/*
========================================
DELETE EVENT
========================================
*/
const deleteEvent = async (id) => {

  const res = await axios.delete(
    `${API}/${id}`,
    getAuthHeader()
  );

  return res.data;

};

/*
========================================
GET EVENT STATS
========================================
*/
const getEventStats = async () => {

  const res = await axios.get(
    `${API}/stats`,
    getAuthHeader()
  );

  return res.data;

};

const eventService = {
  getAllEvents,
  getEventById,
  getEventParticipants,
  registerForEvent,
  cancelRegistration,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventStats
};

export default eventService;