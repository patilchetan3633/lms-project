import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchFines } from "../Slice/FineSlice";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import "../css/Fines.css"; 

export default function Fines() {
  const dispatch = useDispatch();
  const { fines } = useSelector((state) => state.fines);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberName: "",
    bookName: "",
    dueDate: "",
    returnDate: "",
    fineAmount: "",
  });

  const [localSearch, setLocalSearch] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    dispatch(FetchFines());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const filteredFines = fines.filter(
    (fine) =>
      fine.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fine.bookName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    console.log("New Fine Data:", formData);
    setShowForm(false);
    setFormData({
      memberName: "",
      bookName: "",
      dueDate: "",
      returnDate: "",
      fineAmount: "",
    });
  };

  return (
    <div className="fines-page">
      <div className="fines-container">
        <div className="fines-header">
          <h2>💰 Fines Records</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by member or book"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            <button
              className="btn-search"
              onClick={() => setSearchQuery(localSearch)} 
            >
              Search
            </button>
          </div>
        </div>

        <table className="fines-table">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Member Name</th>
              <th>Book Name</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Fine Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {filteredFines.length > 0 ? (
              filteredFines.map((fine) => (
                <tr key={fine.id}>
                  {/* <td>{fine.id}</td> */}
                  <td>{fine.memberName}</td>
                  <td>{fine.bookName}</td>
                  <td>{fine.dueDate}</td>
                  <td>{fine.returnDate}</td>
                  <td>{fine.fineAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-fines">
                  No fines found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button className="add-fine-btn" onClick={() => setShowForm(true)}>
          + Add New Fine
        </button>
      </div>

      {/* Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Fine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Member Name</Form.Label>
              <Form.Control
                type="text"
                name="memberName"
                value={formData.memberName}
                onChange={handleChange}
                placeholder="Enter member name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type="text"
                name="bookName"
                value={formData.bookName}
                onChange={handleChange}
                placeholder="Enter book name"
              />
            </Form.Group>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Return Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Fine Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                name="fineAmount"
                value={formData.fineAmount}
                onChange={handleChange}
                placeholder="Enter fine amount"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Add New Fine
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}






