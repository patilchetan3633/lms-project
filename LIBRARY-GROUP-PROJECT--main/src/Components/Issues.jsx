import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddIssues, FetchIssues, DeleteIssues } from "../Slice/IssuesSlice";
import {
  Button,
  Modal,
  Form,
  Table,
  Spinner,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { useAuth } from "./AuthContext";

function Issues() {
  const dispatch = useDispatch();
  const { issues, loading, error } = useSelector((state) => state.issues);
  const { showToast } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    memberName: "",
    bookName: "",
    issueDate: "",
    dueDate: "",
  });

  const [localSearch, setLocalSearch] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    dispatch(FetchIssues());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = (id) => {
    dispatch(DeleteIssues(id));
    showToast("error", "❌ Issue deleted!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.memberName ||
      !formData.bookName ||
      !formData.issueDate ||
      !formData.dueDate
    ) {
      showToast("warning", "⚠️ All fields are required!");
      return;
    }

    dispatch(AddIssues({ ...formData, id: Date.now() }));
    setFormData({ memberName: "", bookName: "", issueDate: "", dueDate: "" });
    setShowForm(false);
    showToast("success", "✅ Issue added successfully!");
  };

  
  const filteredIssues = issues.filter(
    (issue) =>
      issue.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.bookName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="container py-4"
      style={{ backgroundColor: "#E0E0E0", marginTop: "30px", width: "100%" }}
    >
    
      <header
        className="d-flex justify-content-between align-items-center mb-4 flex-wrap"
        style={{
          gap: "15px",
          background: "whitesmoke",
          height: "70px",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.35)",
          padding: "10px",
        }}
      >
        <h2 style={{ color: "black" }}>📚 Issues List</h2>
        <InputGroup style={{ maxWidth: "300px" }}>
          <Form.Control
            placeholder="Search by Member or Book"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          />
          <Button
            onClick={() => setSearchQuery(localSearch)} 
            style={{
              backgroundColor: "black",
              border: "1px solid gray",
              margin: "2px",
            }}
          >
            Search
          </Button>
        </InputGroup>
      </header>


      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
          <p className="mt-2">Loading issues...</p>
        </div>
      )}
      {error && (
        <Alert variant="danger" className="my-3">
          ❌ {error}
        </Alert>
      )}


      <div className="table-responsive">
        <Table bordered hover striped className="align-middle text-center">
          <thead className="table-dark">
            <tr>
              {/* <th>ID</th> */}
              <th>Member Name</th>
              <th>Book Name</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Delete Issues</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredIssues) && filteredIssues.length > 0 ? (
              filteredIssues.map((issue) => (
                <tr key={issue.id}>
                  {/* <td>{issue.id}</td> */}
                  <td>{issue.memberName}</td>
                  <td>{issue.bookName}</td>
                  <td>{issue.issueDate}</td>
                  <td>{issue.dueDate}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(issue.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-muted fst-italic">
                  No issues found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      
      <div className="d-flex justify-content-center mt-4">
        <Button
          onClick={() => setShowForm(true)}
          style={{
            backgroundColor: "black",
            border: "2px solid gray",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            padding: "10px 25px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "700" }}>+</span> Add New
          Issue
        </Button>
      </div>

   
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Member Name</Form.Label>
              <Form.Control
                type="text"
                name="memberName"
                placeholder="Enter member name"
                value={formData.memberName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Book Name</Form.Label>
              <Form.Control
                type="text"
                name="bookName"
                placeholder="Enter book name"
                value={formData.bookName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Issue Date</Form.Label>
              <Form.Control
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              Add Issue
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Issues;
