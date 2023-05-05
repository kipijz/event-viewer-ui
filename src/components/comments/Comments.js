import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CommentForm from "../commentForm/CommentForm";

import React from "react";

const Comments = ({ getEventData, event, comments, setComments }) => {
  const revText = useRef();
  let params = useParams();
  const eventId = params.eventId;

  useEffect(() => {
    getEventData(eventId);
  }, []);

  const addComment = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      const response = await api.post("/api/v1/comments", {
        body: rev.value,
        eventId: eventId,
      });

      const updatedComments = [...(comments || []), { body: rev.value }];

      rev.value = "";

      setComments(updatedComments);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Comments</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={event?.poster} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <CommentForm
                    handleSubmit={addComment}
                    revText={revText}
                    labelText="Write a comment"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {comments?.map((r) => {
            return (
              <>
                <Row>
                  <Col>{r.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Comments;
