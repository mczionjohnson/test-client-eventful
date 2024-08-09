import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function UserTickets() {
  // navigate for going back to homepage
  const navigate = useNavigate();

  // useState() to track the input in forms
  const [tickets, setTickets] = useState([]);
  const [meta, setMeta] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");

  useEffect(() => {
    axios
      .get("proxy/api/v1/user/profile/tickets")
      .then((res) => {
        setTickets(res.data.eventTickets);
        setMeta(res.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  }, []);

  const viewTicket = (ticket: string) => {
    const id = ticket;
    // console.log(id);

    navigate("/user_ticket", { state: id });
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
    return <div>Loading tickets...</div>;
  }

  return (
    <div className="createPost">
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
        onClick={() => navigate("/profile")}
      >
        PROFILE
      </Button>
      <h1>ALL TICKET</h1>

      <div>{meta != null ? <p>Total: {meta}</p> : ""}</div>

      <div>
        {tickets
          ? tickets.map((ticket) => (
              // present the unique key for each child in the div
              <div key={ticket} className="mappedPost">
                <h4>{ticket}</h4>

                <Button
                  variant="outline-success"
                  className="buttonNav"
                  onClick={() => viewTicket(ticket)}
                >
                  VIEW
                </Button>
              </div>
            ))
          : ""}
      </div>

      <Button
        variant="outline-dark"
        className="buttonNav"
        onClick={() => navigate(-1)}
      >
        BACK
      </Button>
    </div>
  );
}

export default UserTickets;
