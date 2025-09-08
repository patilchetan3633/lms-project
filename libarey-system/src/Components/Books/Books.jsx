import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Form, Card, Row, Col } from "react-bootstrap";
import "./Books.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/books");
      setBooks(res.data || []);
    } catch (error) {
      console.log("Server Down");
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Member");
      setMembers(res.data || []);
    } catch (err) {
      console.log("Members fetch error");
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchMembers();
  }, []);

  const handleAdd = () => {
    setCurrentBook({ title: "", author: "", genre: "", rent: false, memberId: "", dueDate: "" });
    setShowModal(true);
  };

  const handleEdit = (book) => {
    setCurrentBook({ ...book });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await axios.delete(`http://localhost:3000/books/${id}`);
      fetchBooks();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (currentBook.id) {
      await axios.put(`http://localhost:3000/books/${currentBook.id}`, currentBook);
    } else {
      await axios.post("http://localhost:3000/books", {
        ...currentBook,
        id: Date.now().toString(),
      });
    }
    setShowModal(false);
    fetchBooks();
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">📚 Book Collection</h2>
        <Button variant="success" onClick={handleAdd}>➕ Add Book</Button>
      </div>

      {books.length === 0 && <div className="alert alert-light border text-center">No books found.</div>}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {books.map((book) => (
          <Col key={book.id}>
            <Card className="book-card h-100">
              <Card.Img variant="top" src={book.cover || "/images/placeholder.png"} className="book-img" />
              <Card.Body>
                <Card.Title className="fw-bold text-truncate">{book.title}</Card.Title>
                <Card.Text className="mb-1">✍️ {book.author}</Card.Text>
                <Card.Text className="mb-1">📖 {book.genre}</Card.Text>
                <Card.Text className="text-muted">{book.rent ? "Rented" : "Available"}</Card.Text>
                <div className="d-flex gap-2 mt-2">
                  <Button size="sm" variant="warning" onClick={() => handleEdit(book)}>✏️ Edit</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(book.id)}>🗑️ Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentBook?.id ? "Edit Book" : "Add Book"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={currentBook?.title || ""} onChange={e => setCurrentBook({ ...currentBook, title: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" value={currentBook?.author || ""} onChange={e => setCurrentBook({ ...currentBook, author: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Genre</Form.Label>
              <Form.Control type="text" value={currentBook?.genre || ""} onChange={e => setCurrentBook({ ...currentBook, genre: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Assign Member</Form.Label>
              <Form.Select value={currentBook?.memberId || ""} onChange={e => setCurrentBook({ ...currentBook, memberId: e.target.value })}>
                <option value="">-- None --</option>
                {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" value={currentBook?.dueDate || ""} onChange={e => setCurrentBook({ ...currentBook, dueDate: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="Rented" checked={currentBook?.rent || false} onChange={e => setCurrentBook({ ...currentBook, rent: e.target.checked })} />
            </Form.Group>
            <Button type="submit" className="mt-3 w-100" variant="success">{currentBook?.id ? "Update" : "Add"} Book</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Books;
