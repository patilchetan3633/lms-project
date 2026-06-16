import { useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  FetchData,
  AddBooks,
  DeleteData,
} from "../Slice/BooksSlice";

function Books() {
  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    rent: "",
  });

  const [localSearch, setLocalSearch] = useState(""); // live search input

  const { books, status, error } = useSelector(
    (state) => state.books
  );

  const dispatch = useDispatch();
  const { isLoggedIn, role, showToast, requireLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(FetchData());
  }, [dispatch]);

  const handleChange = (e) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  // ✅ Add new book
  const handleAddBook = () => {
    const { title, author, genre, rent } = newBook;
    if (!title || !author || !genre || !rent) {
      return showToast("warn", "⚠️ Please fill all fields!");
    }

    dispatch(AddBooks({ ...newBook, id: Date.now() }));
    setShowModal(false);
    setNewBook({ title: "", author: "", genre: "", rent: "" });
    showToast("info", "📘 Book added successfully!");
  };

  // ✅ Delete book
  const deleteBook = (id) => {
    dispatch(DeleteData(id));
    showToast("error", "❌ Book deleted!");
  };

  // 🔹 Filter books for live search
  const filteredBooks = books.filter(
    (data) =>
      data.title.toLowerCase().includes(localSearch.toLowerCase()) ||
      data.author.toLowerCase().includes(localSearch.toLowerCase())
  );

  return (
    <Container
      fluid
      className="books-wrap py-3"

    >
      {/* ==== HEADER ==== */}
      <header className="books-header d-flex justify-content-between align-items-center mb-3">
        <h1 >Library Books</h1>

        <div className="d-flex" style={{ gap: "10px" }}>
          <Form.Control
            type="text"
            placeholder="Search by Title or Author"

            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          <Button className="navbar-btn"
            variant="primary"

            onClick={() => { }}
          >
            Search
          </Button>
        </div>
      </header>

      {status === "loading" && <p>⏳ Loading books...</p>}
      {status === "error" && <p>❌ {error}</p>}

      <Row className="g-3">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((data) => (
            <Col key={data.id} xs={12} sm={6} md={4} lg={3}>
              <article
                className="book-card p-3 h-100"

              >
                <div className="book-body">
                  <span className="badge-genre">{data.genre}</span>
                  <h2 className="book-title">{data.title}</h2>
                  <p className="book-author">by {data.author}</p>

                  <div className="book-footer d-flex justify-content-between align-items-center mt-3">
                    <span>
                      Rent ₹<strong>{data.rent}</strong>
                    </span>

                    <div className="d-flex gap-2">
                      <Button

                        onClick={() => {
                          if (requireLogin()) {
                            showToast("success", `✅ Opening ${data.title}`);
                            navigate(`/Description/${data.id}`);
                          }
                        }}
                      >
                        View
                      </Button>

                      {isLoggedIn && role === "admin" && (
                        <Button className="delete-btn"
                          onClick={() => deleteBook(data.id)}

                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </Col>
          ))
        ) : (
          <p>No books found</p>
        )}
      </Row>

      {isLoggedIn && role === "admin" && (
        <div className="d-flex justify-content-center mt-4">
          <Button className="navbar-btn"
            onClick={() => setShowModal(true)}

          >
            + Add Book
          </Button>
        </div>
      )}

      {showModal && isLoggedIn && role === "admin" && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h4 style={{ color: "black" }}>Add New Book</h4>
              <button
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            <div className="modal-body">
              <Form>
                {["title", "author", "genre", "rent", "imageUrl", "description"].map(
                  (field) => (
                    <Form.Group className="mb-3" key={field}>
                      <Form.Label>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Form.Label>
                      <Form.Control
                        type={
                          field === "rent"
                            ? "number"
                            : field === "imageUrl"
                              ? "url"
                              : "text"
                        }
                        as={field === "description" ? "textarea" : "input"}
                        rows={field === "description" ? 3 : undefined}
                        placeholder={`Enter ${field}`}
                        name={field}
                        value={newBook[field]}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  )
                )}
              </Form>
            </div>

            <div className="modal-footer d-flex justify-content-end gap-2">
              <Button onClick={() => setShowModal(false)} className="btn btn-danger">Close</Button>
              <Button onClick={handleAddBook} className="btn btn-success" >Save Book</Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Books;
