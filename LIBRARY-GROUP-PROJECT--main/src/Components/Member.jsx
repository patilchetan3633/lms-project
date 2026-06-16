import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Modal,
  Form,
  Table,
  Badge,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";

function Members() {
  const [membershow, setmembershow] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Track whether editing or adding
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "Male",
    available: true,
  });

  const [localSearch, setLocalSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Fetch members
  const BooksMember = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://library-json-ufk5.onrender.com/members");
      setmembershow(res.data);
    } catch (error) {
      console.log("Server-Down");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    BooksMember();
  }, []);

  // ✅ Delete
  const deletarrary = async (id) => {
    await axios.delete(`https://libraryjson-production.up.railway.app/members/${id}`);
    const deletarrarys = membershow.filter((member) => member.id !== id);
    setmembershow(deletarrarys);
  };

  // ✅ Handle Form Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "available" ? value === "true" : value,
    });
  };

  // ✅ Add / Update Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Name and Email are required!");
      return;
    }

    try {
      if (editId) {
        // Update
        const res = await axios.put(
          `https://library-json-ufk5.onrender.com/members/${editId}`,
          formData
        );
        setmembershow(
          membershow.map((member) =>
            member.id === editId ? res.data : member
          )
        );
        setEditId(null);
      } else {
        // Add new
        const res = await axios.post("https://library-json-ufk5.onrender.com/members", formData);
        setmembershow([...membershow, res.data]);
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "Male",
        available: true,
      });
      setShowForm(false);
    } catch (error) {
      console.log("Error saving member");
    }
  };

  // ✅ Edit Function
  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      address: member.address,
      gender: member.gender,
      available: member.available,
    });
    setEditId(member.id);
    setShowForm(true);
  };

  // ✅ Filter members
  const filteredMembers = membershow.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-4">
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center mb-3 flex-wrap"
        style={{
          gap: "15px",
          background: "white",
          height: "70px",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.35)",
          padding: "10px",
        }}
      >
        <h2 style={{ color: "black" }}>👤 Members</h2>

        <InputGroup style={{ maxWidth: "300px" }}>
          <Form.Control
            placeholder="Search by Name or Email"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
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
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
          <p className="mt-2">Loading members...</p>
        </div>
      )}

      {/* No Members Found */}
      {!loading && filteredMembers.length === 0 && (
        <Alert variant="secondary">No members found.</Alert>
      )}

      {/* Table */}
      {filteredMembers.length > 0 && (
        <div className="table-responsive">
          <Table bordered hover striped className="align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name & Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr key={member?.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="d-flex flex-column">
                      <span className="fw-bold">{member?.name}</span>
                      <small className="text-muted">{member?.email}</small>
                    </div>
                  </td>
                  <td>📞 {member?.phone}</td>
                  <td>📍 {member?.address}</td>
                  <td>
                    <Badge bg="info">{member?.gender}</Badge>
                  </td>
                  <td>
                    <Badge bg={member?.available ? "success" : "secondary"}>
                      {member?.available ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEdit(member)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deletarrary(member.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Add Button */}
      <div className="d-flex justify-content-center mt-4">
        <Button
          onClick={() => {
            setShowForm(true);
            setEditId(null); // Reset edit state for new member
            setFormData({
              name: "",
              email: "",
              phone: "",
              address: "",
              gender: "Male",
              available: true,
            });
          }}
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
          <span style={{ fontSize: "20px", fontWeight: "700" }}>+</span> Add Member
        </Button>
      </div>

      {/* Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Member" : "Add Member"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="available"
                value={formData.available}
                onChange={handleChange}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Button variant={editId ? "warning" : "success"} type="submit" className="w-100">
              {editId ? "Update Member" : "Add Member"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Members;
