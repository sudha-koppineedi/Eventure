import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { eventService } from "../services";
import { useAuth } from "../context/AuthContext";
import EventRegistrationForm from "../components/events/EventRegistrationForm";
import EventAnnouncements from "../components/events/EventAnnouncements";

const EventDetailPage = () => {

  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [participants, setParticipants] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const isParticipant = user?.role === "participant";

  const isOrganizerOrAdmin =
    user?.role === "organizer" ||
    user?.role === "admin";

  const canManageEvent =
    user &&
    (
      user.role === "admin" ||
      (
        user.role === "organizer" &&
        event &&
        String(event.createdBy) === String(user.id)
      )
    );



  /*
  ==========================================
  FETCH EVENT DETAILS
  ==========================================
  */
  const fetchEventDetails = async () => {

    try {

      setLoading(true);
      setError(null);

      const response =
        await eventService.getEventById(eventId);

      console.log("Event API:", response);

      const eventData =
        response?.data?.data ||
        response?.data ||
        response;

      setEvent(eventData);

      await fetchParticipants();

    } catch (err) {

      console.error("Event load error:", err);
      setError("Failed to load event details");

    } finally {

      setLoading(false);

    }

  };



  /*
  ==========================================
  FETCH PARTICIPANTS
  ==========================================
  */
  const fetchParticipants = async () => {

    try {

      const response =
        await eventService.getEventParticipants(eventId);

      console.log("Participants API:", response);

      const list =
        response?.data?.participants ||
        response?.data?.data ||
        response?.participants ||
        response?.data ||
        response ||
        [];

      const participantsArray =
        Array.isArray(list) ? list : [];

      setParticipants(participantsArray);

      setIsRegistered(

        participantsArray.some(
          (p) =>
            String(p.userId) === String(user?.id)
        )

      );

    } catch (err) {

      console.error("Participants error:", err);
      setParticipants([]);

    }

  };



  useEffect(() => {

    if (eventId) {
      fetchEventDetails();
    }

  }, [eventId, user]);



  /*
  ==========================================
  ACTIONS
  ==========================================
  */
  const handleRegister = () => {

    if (!user) {
      navigate("/login");
      return;
    }

    if (!isParticipant) return;

    setShowRegistrationForm(true);

  };



  const handleCancelRegistration = async () => {

    try {

      await eventService.cancelRegistration(eventId);

      setIsRegistered(false);
      fetchParticipants();

    } catch (err) {

      console.error("Cancel failed:", err);

    }

  };



  const handleDelete = async () => {

    if (!window.confirm("Delete this event?")) return;

    try {

      await eventService.deleteEvent(eventId);

      navigate("/events");

    } catch (err) {

      console.error("Delete failed:", err);

    }

  };



  /*
  ==========================================
  UTIL
  ==========================================
  */
  const formatDate = (dateString) => {

    if (!dateString) return "Invalid Date";

    const d = new Date(dateString);

    return isNaN(d.getTime())
      ? "Invalid Date"
      : d.toLocaleString();

  };



  /*
  ==========================================
  UI STATES
  ==========================================
  */
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );



  if (error)
    return (
      <div className="text-center mt-10">
        <p>{error}</p>
        <Link to="/events">Back</Link>
      </div>
    );



  if (!event)
    return (
      <div className="text-center mt-10">
        <p>Event not found</p>
        <Link to="/events">Back</Link>
      </div>
    );



  /*
  ==========================================
  RENDER
  ==========================================
  */
  return (

    <div className="min-h-screen bg-gray-100 py-8 px-6">

      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">

        <Link to="/events" className="text-indigo-600">
          ← Back to Events
        </Link>



        <h1 className="text-3xl font-bold mt-4">
          {event.title}
        </h1>



        <p className="text-gray-600 mt-1">
          Organized by {event.organizerName || "Event Organizer"}
        </p>



        <div className="mt-6 space-y-3">

          <p>
            <strong>Date:</strong>{" "}
            {formatDate(
              event.date ||
              event.startDate ||
              event.eventDate
            )}
          </p>



          <p>
            <strong>Location:</strong>{" "}
            {event.location || "N/A"}
          </p>



          <p>
            <strong>Description:</strong>{" "}
            {event.description || "No description"}
          </p>



          <p>
            <strong>Capacity:</strong>{" "}
            {participants.length} /
            {event.capacity || 0}
          </p>

        </div>



        {/* EDIT DELETE */}

        {canManageEvent && (

          <div className="mt-6 space-x-3">

            <Link
              to={`/events/${eventId}/edit`}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </Link>



            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

          </div>

        )}



        {/* REGISTRATION */}

        {isParticipant && (

          <div className="mt-8 border-t pt-6">

            <h2 className="text-xl font-semibold">
              Event Registration
            </h2>



            {isRegistered ? (

              <button
                onClick={handleCancelRegistration}
                className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel Registration
              </button>

            ) : (

              <button
                onClick={handleRegister}
                disabled={
                  participants.length >=
                  (event.capacity || 0)
                }
                className={`mt-4 px-4 py-2 rounded text-white ${
                  participants.length >=
                  (event.capacity || 0)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                Register Now
              </button>

            )}

          </div>

        )}



        {/* PARTICIPANTS */}

        {isOrganizerOrAdmin && (

          <div className="mt-8 border-t pt-6">

            <h2 className="text-xl font-semibold">
              Participants ({participants.length})
            </h2>



            {participants.length === 0 ? (

              <p className="text-gray-500 mt-3">
                No participants yet.
              </p>

            ) : (

              <ul className="mt-4 space-y-2">

                {participants.map((p) => (

                  <li
                    key={p.userId}
                    className="border p-3 rounded"
                  >

                    <p>{p.name}</p>

                    <p className="text-sm text-gray-500">
                      {p.email}
                    </p>

                  </li>

                ))}

              </ul>

            )}

          </div>

        )}



        {/* ANNOUNCEMENTS */}

        <div className="mt-10">

          <EventAnnouncements
            eventId={eventId}
            eventTitle={event.title}
          />

        </div>

      </div>



      {showRegistrationForm && (

        <EventRegistrationForm
          event={event}
          onClose={() => setShowRegistrationForm(false)}
          onSuccess={() => {

            setIsRegistered(true);
            setShowRegistrationForm(false);

            fetchParticipants();

          }}
        />

      )}

    </div>

  );

};

export default EventDetailPage;