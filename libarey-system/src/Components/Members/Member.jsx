// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Button, Modal, Form, Card, Row, Col, Badge } from "react-bootstrap";

// function Members() {
//   const [members, setMembers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [currentMember, setCurrentMember] = useState(null);

//   const fetchMembers = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/Member");
//       setMembers(res.data || []);
//     } catch (error) {
//       console.log("Server Down");
//     }
//   };

//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   const handleAdd = () => {
//     setCurrentMember({
//       name: "",
//       email: "",
//       phone: "",
//       address: "",
//       type: "student",
//       isActive: true,
//     });
//     setShowModal(true);
//   };

//   const handleEdit = (member) => {
//     setCurrentMember({ ...member });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this member?")) {
//       await axios.delete(`http://localhost:3000/Member/${id}`);
//       fetchMembers();
//     }
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     if (currentMember.id) {
//       await axios.put(
//         `http://localhost:3000/Member/${currentMember.id}`,
//         currentMember
//       );
//     } else {
//       await axios.post("http://localhost:3000/Member", {
//         ...currentMember,
//         id: Date.now().toString(),
//       });
//     }
//     setShowModal(false);
//     fetchMembers();
//   };

//   return (
//     <div className="container py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold text-primary">👥 Members</h2>
//         <Button variant="success" onClick={handleAdd}>
//           ➕ Add Member
//         </Button>
//       </div>

//       {members.length === 0 && (
//         <div className="alert alert-light border text-center">
//           No members found.
//         </div>
//       )}

//       <Row xs={1} sm={2} md={3} lg={4} className="g-4">
//         {members.map((member) => (
//           <Col key={member.id}>
//             <Card className="member-card h-100">
//               <Card.Body>
//                 <Card.Title className="fw-bold text-truncate">
//                   {member.name}
//                 </Card.Title>
//                 <Card.Text className="mb-1">📧 {member.email}</Card.Text>
//                 <Card.Text className="mb-1">📞 {member.phone}</Card.Text>
//                 <Card.Text className="mb-2">📍 {member.address}</Card.Text>

//                 <Badge
//                   bg={member.isActive ? "success" : "secondary"}
//                   className="mb-2"
//                 >
//                   {member.isActive ? "Active" : "Inactive"}
//                 </Badge>{" "}
//                 <Badge
//                   bg={member.type === "student" ? "info" : "warning"}
//                   text="dark"
//                 >
//                   {member.type}
//                 </Badge>

//                 <div className="d-flex gap-2 mt-3">
//                   <Button
//                     size="sm"
//                     variant="warning"
//                     onClick={() => handleEdit(member)}
//                   >
//                     ✏️ Edit
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="danger"
//                     onClick={() => handleDelete(member.id)}
//                   >
//                     🗑️ Delete
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {currentMember?.id ? "Edit Member" : "Add Member"}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSave}>
//             <Form.Group className="mb-2">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={currentMember?.name || ""}
//                 onChange={(e) =>
//                   setCurrentMember({ ...currentMember, name: e.target.value })
//                 }
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={currentMember?.email || ""}
//                 onChange={(e) =>
//                   setCurrentMember({ ...currentMember, email: e.target.value })
//                 }
//                 required
//               />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Phone</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={currentMember?.phone || ""}
//                 onChange={(e) =>
//                   setCurrentMember({ ...currentMember, phone: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Address</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={currentMember?.address || ""}
//                 onChange={(e) =>
//                   setCurrentMember({ ...currentMember, address: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Label>Type</Form.Label>
//               <Form.Select
//                 value={currentMember?.type || "student"}
//                 onChange={(e) =>
//                   setCurrentMember({ ...currentMember, type: e.target.value })
//                 }
//               >
//                 <option value="student">Student</option>
//                 <option value="faculty">Faculty</option>
//               </Form.Select>
//             </Form.Group>
//             <Form.Group>
//               <Form.Check
//                 type="checkbox"
//                 label="Active"
//                 checked={currentMember?.isActive || false}
//                 onChange={(e) =>
//                   setCurrentMember({
//                     ...currentMember,
//                     isActive: e.target.checked,
//                   })
//                 }
//               />
//             </Form.Group>
//             <Button type="submit" className="mt-3 w-100" variant="success">
//               {currentMember?.id ? "Update" : "Add"} Member
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default Members;


import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Button, Form, Modal } from "react-bootstrap";

function Members() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Member");
      setMembers(res.data || []);
    } catch (err) {
      console.log("Error fetching members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // 🔹 Add New or Update Member
  const handleSave = async () => {
    if (currentMember.id) {
      // Update existing member
      await axios.put(`http://localhost:3000/Member/${currentMember.id}`, currentMember);
    } else {
      // Add new member
      await axios.post("http://localhost:3000/Member", currentMember);
    }
    setShowModal(false);
    setCurrentMember(null);
    fetchMembers();
  };

  // 🔹 Delete Member
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      await axios.delete(`http://localhost:3000/Member/${id}`);
      fetchMembers();
    }
  };

  // 🔹 Search & Filter
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());

    const matchesType = filterType === "all" || m.type === filterType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-primary mb-4">👥 Library Members</h2>

      {/* Search & Filter Controls */}
      <div className="d-flex mb-3 gap-2">
        <Form.Control
          type="text"
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Form.Select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </Form.Select>
        <Button variant="success" onClick={() => { setCurrentMember({ name: "", email: "", phone: "", address: "", type: "student", isActive: "true", avatar: "" }); setShowModal(true); }}>
          ➕ Add Member
        </Button>
      </div>

      {/* Members List */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredMembers.map((member) => (
          <Col key={member.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={member.avatar || "/images/user-placeholder.png"}
                alt={member.name}
                className="p-3 rounded-circle mx-auto"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <Card.Body className="text-center">
                <Card.Title className="fw-bold">{member.name}</Card.Title>
                <Card.Text className="text-muted mb-1">📧 {member.email}</Card.Text>
                <Card.Text className="mb-1">📞 {member.phone}</Card.Text>
                <Card.Text className="mb-1">🏠 {member.address}</Card.Text>
                <Card.Text className="mb-1">🎓 {member.type}</Card.Text>
                <Card.Text>
                  Status:{" "}
                  <span
                    className={member.isActive === "true" ? "text-success fw-bold" : "text-danger fw-bold"}
                  >
                    {member.isActive === "true" ? "Active" : "Inactive"}
                  </span>
                </Card.Text>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => { setCurrentMember(member); setShowModal(true); }}
                >
                  ✏️ Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(member.id)}
                >
                  🗑️ Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentMember?.id ? "Edit Member" : "Add Member"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentMember && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={currentMember.name}
                  onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={currentMember.email}
                  onChange={(e) => setCurrentMember({ ...currentMember, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={currentMember.phone}
                  onChange={(e) => setCurrentMember({ ...currentMember, phone: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={currentMember.address}
                  onChange={(e) => setCurrentMember({ ...currentMember, address: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Avatar URL</Form.Label>
                <Form.Control
                  type="text"
                  value={currentMember.avatar}
                  onChange={(e) => setCurrentMember({ ...currentMember, avatar: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  value={currentMember.type}
                  onChange={(e) => setCurrentMember({ ...currentMember, type: e.target.value })}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Check
                  type="switch"
                  label="Active"
                  checked={currentMember.isActive === "true"}
                  onChange={(e) =>
                    setCurrentMember({ ...currentMember, isActive: e.target.checked ? "true" : "false" })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ❌ Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            💾 Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Members;







