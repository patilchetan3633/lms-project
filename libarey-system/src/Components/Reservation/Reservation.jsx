import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Row, Col, Form, Modal } from "react-bootstrap";

function Reservation() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/books");
      setBooks(res.data || []);
    } catch (err) {
      console.log("Books fetch error");
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

  // Reserve Book
  const handleReserve = async () => {
    if (!selectedBook || !selectedMember) return;

    await axios.put(`http://localhost:3000/books/${selectedBook.id}`, {
      ...selectedBook,
      reserved: true,
      reservedBy: selectedMember,
      reservedDate: new Date().toISOString().slice(0, 10),
    });

    setShowModal(false);
    setSelectedBook(null);
    setSelectedMember("");
    fetchBooks();
  };

  // Cancel Reservation
  const handleCancel = async (book) => {
    await axios.put(`http://localhost:3000/books/${book.id}`, {
      ...book,
      reserved: false,
      reservedBy: "",
      reservedDate: "",
    });

    fetchBooks();
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-primary mb-4">📌 Book Reservations</h2>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {books.map((book) => (
          <Col key={book.id}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={book.cover || "/images/placeholder.png"}
                style={{ height: "220px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="fw-bold">{book.title}</Card.Title>
                <Card.Text>✍️ {book.author}</Card.Text>
                <Card.Text>📖 {book.genre}</Card.Text>

                {book.reserved ? (
                  <>
                    <Card.Text className="text-danger fw-bold">
                      Reserved by: {book.reservedBy}
                    </Card.Text>
                    <Card.Text>📅 {book.reservedDate}</Card.Text>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleCancel(book)}
                    >
                      ❌ Cancel Reservation
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSelectedBook(book);
                      setShowModal(true);
                    }}
                  >
                    📌 Reserve
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Reservation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reserve Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Select Member</Form.Label>
              <Form.Select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
              >
                <option value="">-- Select Member --</option>
                {members.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button
              variant="success"
              className="mt-3 w-100"
              onClick={handleReserve}
            >
              ✅ Confirm Reservation
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Reservation;
