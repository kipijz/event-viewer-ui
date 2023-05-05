import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Hero.css";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Hero = ({ events }) => {
  const navigate = useNavigate();

  function comments(eventId) {
    navigate(`/Comments/${eventId}`);
  }

  return (
    <div>
      <Carousel>
        {events?.map((event) => {
          return (
            <Paper key={event.eventId}>
              <div className="event-card-container">
                <div
                  className="event-card"
                  style={{ "--img": `url(${event.backdrop})` }}
                >
                  <div className="event-detail">
                    <div className="event-poster">
                      <img src={event.poster} alt="" />
                    </div>
                    <div className="event-title">
                      <h4>{event.title}</h4>
                    </div>
                    <div className="event-buttons-container">
                      <Link
                        to={`/Trailer/${event.promoLink.substring(
                          event.promoLink.length - 11
                        )}`}
                      >
                        <div className="play-button-icon-container">
                          <FontAwesomeIcon
                            className="play-button-icon"
                            icon={faCirclePlay}
                          />
                        </div>
                      </Link>
                      <div className="event-comment-button-container">
                        <Button
                          variant="outline-light"
                          onClick={() => comments(event.eventId)}
                        >
                          Comments
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Hero;
