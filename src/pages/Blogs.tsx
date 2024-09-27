import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../App.css";


// dynamic funtions
function Blogs() {
  //  declare navigate function
  const navigate = useNavigate();


  // creating an array to store data
  const [blogs, setBlogs] = useState([]);
  const [meta, setMeta] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState("");
  const [errorCode, setErrorCode] = useState("");

  // useState() to track the input in forms
  const [post, setPost] = useState({
    value: "",
  });

  // getting data from backend when this page is loaded
  // getting data from backend with axios
  useEffect(() => {
    axios
      .get("proxy/api/v1/blogs")
      .then((res) => {
        setBlogs(res.data.data);
        setMeta(res.data.meta);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  }, []);

  const handleChange = (event: {
    target: { name: unknown; value: unknown };
  }) => {
    // grab data from event.target
    // track the data with useState
    // spread the prev data before new ones
    const { name, value } = event.target;

    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const search = async (event: { preventDefault: () => void }) => {
    // prevent it from reloading the page
    // add proxy in react package so /create can work
    // sending the post array state
    // redirecting to /create/post afterwards
    event.preventDefault();

    const value = post.value;

    await axios
      .get(`proxy/api/v1/blogs?q=${value}`)
      .then((res) => {
        setBlogs(res.data.data);
        setMeta(res.data.meta);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  };
  const incPage = () => {
    const current = Number(`${meta.page}`);
    const page = current + 1;

    axios
      .get(`proxy/api/v1/events?page=${page}`)
      .then((res) => {
        // console.log(res.data.data);
        setBlogs(res.data.data);
        setMeta(res.data.meta);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  };
  const decPage = () => {
    const current = Number(`${meta.page}`);
    const page = current - 1;
    axios
      .get(`proxy/api/v1/events?page=${page}`)
      .then((res) => {
        // console.log(res.data.data);
        setBlogs(res.data.data);
        setMeta(res.data.meta);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setErrorCode(err.response.status);
        setError(err.message);
      });
  };

  const viewEvent = (event_id: string) => {
    const id = event_id;
    // console.log(id);

    navigate("/one_event", { state: id });
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
    return <div>Loading blogs...</div>;
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
        onClick={() => navigate("/profile")}
      >
        PROFILE
      </Button>
      <Form>
        <Form.Group>
          <div className="formInput">
            <Form.Control
              name="value"
              value={post.value}
              placeholder="search events by title || author || tags"
              onChange={handleChange}
            />
          </div>
        </Form.Group>
        <Button
          variant="outline-warning"
          className="buttonSuccess"
          onClick={search}
        >
          search Blogs
        </Button>
      </Form>
      <h1> Blogs</h1>

      <div>
        {blogs
          ? blogs.map((blog) => (
              // present the unique key for each child in the div
              <div key={blog._id} className="mappedPost">
                <h4>{blog.title}</h4>
                <p>{blog.description}</p>
                <Button
                  variant="outline-success"
                  className="buttonNav"
                  onClick={() => viewEvent(blog._id)}
                >
                  VIEW
                </Button>
              </div>
            ))
          : ""}
      </div>

      <div>{meta != null ? <p>Page: {meta.page}</p> : ""}</div>

      {meta && meta.page && meta.page ? (
        <>
          <Button
            variant="outline-success"
            className="buttonNav"
            onClick={() => incPage()}
          >
            NEXT
          </Button>
        </>
      ) : (
        ""
      )}

      {meta && meta.page && meta.page > 1 ? (
        <>
          <Button
            variant="outline-dark"
            className="buttonNav"
            onClick={() => decPage()}
          >
            BACK
          </Button>
        </>
      ) : (
        ""
      )}
      <>
        <Button
          variant="outline-success"
          className="buttonNav"
          onClick={() => navigate("/create")}
        >
          CREATE EVENT
        </Button>
      </>
    </div>
  );
}

export default Blogs;
