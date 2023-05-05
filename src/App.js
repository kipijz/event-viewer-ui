import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Comments from "./components/comments/Comments";

function App() {
  const [events, setEvents] = useState();
  const [event, setEvent] = useState();
  const [comments, setComments] = useState([]);

  const getEvents = async () => {
    try {
      const response = await api.get("/api/v1/events");
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEventData = async (eventId) => {
    try {
      const response = await api.get(`/api/v1/events/${eventId}`);

      const singleEvent = response.data;

      setEvent(singleEvent);

      setComments(singleEvent.comments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEvents();
  });

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home events={events} />}></Route>
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />}></Route>
          <Route
            path="/Comments/:eventId"
            element={
              <Comments
                getEventData={getEventData}
                event={event}
                comments={comments}
                setComments={setComments}
              />
            }
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
