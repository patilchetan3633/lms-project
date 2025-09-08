import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

function FinesPage() {
  const [fines, setFines] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentFine, setCurrentFine] = useState(null);

  // 🔹 Fetch fines from backend
  const fetchFines = async () => {
    try {
      const res = await axios.get("http://localhost:3000/fines");
      setFines(res.data || []);
    } catch (error) {
      console.error("Error fetching fines:", error);
    }
  };

  useEffect(() => {
    fetchFines();
  }, []);

  // 🔹 Open Add Fine form
  const handleAdd = () => {
    setCurrentFine({
      FineID: "",
      MemberID: "",
      IssueID: "",
      Amount: "",
      PaidStatus: "Unpaid",
      PaymentDate: "",
    });
    setShowModal(true);
  };

  // 🔹 Open Edit Fine form
  const handleEdit = (fine) => {
    setCurrentFine({ ...fine });
    setShowModal(true);
  };

  // 🔹 Delete Fine
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this fine?")) {
      await axios.delete(`http://localhost:3000/fines/${id}`);
      fetchFines();
    }
  };

  // 🔹 Save Fine (Add / Update)
  const handleSave = async (e) => {
    e.preventDefault();
    if (currentFine.id) {
      // Update
      await axios.put(
        `http://localhost:3000/fines/${currentFine.id}`,
        currentFine
      );
    } else {
      // Add
      await axios.post("http://localhost:3000/fines", {
        ...currentFine,
        id: Date.now().toString(), // unique id
      });
    }
    setShowModal(false);
    fetchFines();
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">💰 Fines Management</h2>
        <Button variant="success" onClick={handleAdd}>
          ➕ Add Fine
        </Button>
      </div>

      {fines.length === 0 ? (
        <div className="alert alert-light border text-center">
          No fines found.
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Fine ID</th>
              <th>Member ID</th>
              <th>Issue ID</th>
              <th>Amount (₹)</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fines.map((fine) => (
              <tr key={fine.id}>
                <td>{fine.FineID}</td>
                <td>{fine.MemberID}</td>
                <td>{fine.IssueID}</td>
                <td>₹ {fine.Amount}</td>
                <td>
                  {fine.PaidStatus === "Paid" ? (
                    <span className="badge bg-success">Paid</span>
                  ) : (
                    <span className="badge bg-danger">Unpaid</span>
                  )}
                </td>
                <td>
                  {fine.PaymentDate ? fine.PaymentDate : "—"}
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEdit(fine)}
                    className="me-2"
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(fine.id)}
                  >
                    🗑️ Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* 🔹 Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentFine?.id ? "Edit Fine" : "Add Fine"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-2">
              <Form.Label>Fine ID</Form.Label>
              <Form.Control
                type="number"
                value={currentFine?.FineID || ""}
                onChange={(e) =>
                  setCurrentFine({ ...currentFine, FineID: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Member ID</Form.Label>
              <Form.Control
                type="number"
                value={currentFine?.MemberID || ""}
                onChange={(e) =>
                  setCurrentFine({ ...currentFine, MemberID: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Issue ID</Form.Label>
              <Form.Control
                type="number"
                value={currentFine?.IssueID || ""}
                onChange={(e) =>
                  setCurrentFine({ ...currentFine, IssueID: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                value={currentFine?.Amount || ""}
                onChange={(e) =>
                  setCurrentFine({ ...currentFine, Amount: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={currentFine?.PaidStatus || "Unpaid"}
                onChange={(e) =>
                  setCurrentFine({ ...currentFine, PaidStatus: e.target.value })
                }
              >
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Payment Date</Form.Label>
              <Form.Control
                type="date"
                value={currentFine?.PaymentDate || ""}
                onChange={(e) =>
                  setCurrentFine({
                    ...currentFine,
                    PaymentDate: e.target.value,
                  })
                }
                disabled={currentFine?.PaidStatus !== "Paid"}
              />
            </Form.Group>
            <Button type="submit" className="mt-3 w-100" variant="success">
              {currentFine?.id ? "Update" : "Add"} Fine
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FinesPage;
