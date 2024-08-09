import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import "../App.css";

// dynamic funtions
function CreatorModeViewMore() {
  //  declare navigate function
  const navigate = useNavigate();
  const location = useLocation();

  // creating an array to store data
  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const [updatedEvent, setUpdatedEvent] = useState({});

  // this lines are copied from react-bootstrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // getting data from backend when this page is loaded
  // getting data from backend with axios

  useEffect(() => {
    const id = location.state; // Read values passed on state
    axios
      .get(`proxy/api/v1/events/${id}`)
      .then((res) => {
        setEvent(res.data.Event);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching event:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  }, [location.state]);

  //  function to update the setUpdatedPost array with data
  const handleChange = (e: { target: { name: any; value: any } }) => {
    // deconstruct the name and value from event.target
    const { name, value } = e.target;
    setUpdatedEvent((prev) => {
      return {
        // use prev to pre filled the input fields
        ...prev,
        [name]: value,
      };
    });
  };

  const updateEvent = (event) => {
    // when we click on update btn, populate the setUpdatedPost with data from post
    // console.log(post);
    setUpdatedEvent(event);

    // calls modal from bootstrap
    handleShow();
  };

  const saveUpdatedEvent = (updatedEvent) => {
    type Org = { [key: string]: string };
    const arr: Org = {};

    arr.location = updatedEvent.location;
    arr.eventDate = updatedEvent.eventDate;
    arr.eventTime = updatedEvent.eventTime;
    arr.reminder = updatedEvent.reminder;

    // axios to connect to API
    axios
      .patch(`proxy/api/v1/events/${updatedEvent._id}`, arr)
      .then((res) => console.log(res))
      .catch((err) => {
        console.error("Error updating event:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });

    // after onClick update button, the modal should close
    // the page should be reloaded
    handleClose();
    window.location.reload();
  };

  // delete function
  const deleteEvent = (_id) => {
    const id = _id;
    // console.log(id);
    // axios for backend
    axios
      .delete(`proxy/api/v1/events/${id}`)
      .then((res) => {
        console.log(res),
          // navigate(-1);
          navigate("/event_created");
      })
      .catch((err) => {
        console.error("Error deleting event:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  };


  if (errorCode == "401") {
    return (
      <div>
        <h4>Please Log in</h4>
        <>
          <Button
            variant="outline-info"
            className="buttonNav"
            onClick={() => navigate("/")}
          >
            HOME
          </Button>
        </>
      </div>
    ); // Display the error message
  }
  if (error) {
    return <div>Error: {error}</div>; // Display the error message
  }
  if (isLoading) {
    return <div>Loading events...</div>;
  }

  return (
    <div className="post-header">
      <Button
        variant="outline-info"
        className="buttonNav"
        onClick={() => navigate("/")}
      >
        HOME
      </Button>
      <Button
        variant="outline-primary"
        className="buttonNav"
        onClick={() => navigate("/events")}
      >
        ALL EVENTS
      </Button>
      <Button
        variant="outline-primary"
        className="buttonNav"
        onClick={() => navigate("/profile")}
      >
        PROFILE
      </Button>
      <h1>MORE ACTIONS FOR YOUR EVENT</h1>

      {/* modal lines are copied from react-bootstrap */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update an event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Title:
                </label>
                <div className="formInput col-sm-10">
                  <Form.Control
                    placeholder="title"
                    name="title"
                    readOnly
                    className="form-control-plaintext"
                    // check for data in updatedPost or return null
                    value={updatedEvent.title ? updatedEvent.title : ""}
                    // function to pre fill the input field
                    // onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Host:
                </label>
                <div className="formInput col-sm-10">
                  <Form.Control
                    placeholder="host"
                    name="host"
                    readOnly
                    className="form-control-plaintext"
                    // check for data in updatedPost or return null
                    value={updatedEvent.host ? updatedEvent.host : ""}
                    // function to pre fill the input field
                    // onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Tags:
                </label>
                <div className="formInput col-sm-10">
                  <Form.Control
                    placeholder="tags"
                    name="tags"
                    readOnly
                    className="form-control-plaintext"
                    // check for data in updatedPost or return null
                    value={updatedEvent.tags ? updatedEvent.tags : ""}
                    // function to pre fill the input field
                    // onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Description:
                </label>
                <div className="formInput">
                  <Form.Control
                    placeholder="description"
                    name="description"
                    readOnly
                    className="form-control-plaintext"
                    // check for data in updatedPost or return null
                    value={
                      updatedEvent.description ? updatedEvent.description : ""
                    }
                    // function to pre fill the input field
                    // onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Location:
                </label>
                <div className="formInput col-sm-10">
                  <Form.Control
                    placeholder="location"
                    name="location"
                    // check for data in updatedPost or return null
                    value={updatedEvent.location ? updatedEvent.location : ""}
                    // function to pre fill the input field
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Ticket Price:
                </label>
                <div className="formInput col-sm-10">
                  <Form.Control
                    placeholder="Ticket Price"
                    name="ticketPrice"
                    readOnly
                    className="form-control-plaintext"
                    // check for data in updatedPost or return null
                    value={
                      updatedEvent.ticketPrice ? updatedEvent.ticketPrice : ""
                    }
                    // function to pre fill the input field
                    // onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Ticket Style:
                </label>
                <div className="formInput col-sm-10">
                  <Form.Control
                    placeholder="Ticket Style"
                    name="ticketStyle"
                    readOnly
                    className="form-control-plaintext"
                    // check for data in updatedPost or return null
                    value={
                      updatedEvent.ticketStyle ? updatedEvent.ticketStyle : ""
                    }
                    // function to pre fill the input field
                    // onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Ticket Sold:
                </label>
                <div className="formInput col-sm-10">
                  <Form.Control
                    placeholder="Ticket Sold"
                    name="ticketSold"
                    readOnly
                    className="form-control-plaintext"
                    // check for data in updatedPost or return null
                    value={
                      updatedEvent.ticketSold ? updatedEvent.ticketSold : 0
                    }
                    // function to pre fill the input field
                    // onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Event Date:
                </label>
                <div className="formInput col-sm-10">
                  <Form.Control
                    placeholder="Event Date"
                    name="eventDate"
                    // check for data in updatedPost or return null
                    value={updatedEvent.eventDate ? updatedEvent.eventDate : ""}
                    // function to pre fill the input field
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Event Time:
                </label>
                <div className="formInput col-sm-10">
                  <Form.Control
                    placeholder="Event Time"
                    name="eventTime"
                    // check for data in updatedPost or return null
                    value={updatedEvent.eventTime ? updatedEvent.eventTime : ""}
                    // function to pre fill the input field
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Reminder:
                </label>
                <div className="formInput col-sm-10">
                  <Form.Control
                    placeholder="Reminder"
                    name="reminder"
                    // check for data in updatedPost or return null
                    value={updatedEvent.reminder ? updatedEvent.reminder : ""}
                    // function to pre fill the input field
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  RSVP:
                </label>
                <div className="formInput col-sm-10">
                  <Form.Control
                    placeholder="RSVP"
                    name="rsvp"
                    // check for data in updatedPost or return null
                    value={updatedEvent.rsvp ? updatedEvent.rsvp : ""}
                    // function to pre fill the input field
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => saveUpdatedEvent(updatedEvent)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/*  */}

      <div>
        {event ? (
          <div key={event._id} className="mappedPost">
            <h4>{event.title}</h4>
            <p>{event.description}</p>

            <div className="createBtnWrapper">
              {/* onClick calls a function for both btn */}
              <Button
                onClick={() => updateEvent(event)}
                variant="outline-success"
                className="createBtn"
              >
                UPDATE EVENT
              </Button>
              <Button
                onClick={() => deleteEvent(event._id)}
                variant="outline-danger"
                className="createBtn"
              >
                DELETE EVENT
              </Button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <Button
        variant="outline-dark"
        className="buttonNav"
        onClick={() =>
          navigate("/view_event_created", { state: event._id })
        }
      >
        BACK
      </Button>
    </div>
  );
}

export default CreatorModeViewMore;
