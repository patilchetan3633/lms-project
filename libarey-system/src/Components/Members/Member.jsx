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






import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Form, Card, Row, Col, Badge } from "react-bootstrap";
import "./Members.css";

function Members() {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Member");
      setMembers(res.data || []);
    } catch (error) {
      console.log("Server Down");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAdd = () => {
    setCurrentMember({
      name: "",
      email: "",
      phone: "",
      address: "",
      type: "student",
      isActive: true,
    });
    setShowModal(true);
  };

  const handleEdit = (member) => {
    setCurrentMember({ ...member });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      await axios.delete(`http://localhost:3000/Member/${id}`);
      fetchMembers();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (currentMember.id) {
      await axios.put(
        `http://localhost:3000/Member/${currentMember.id}`,
        currentMember
      );
    } else {
      await axios.post("http://localhost:3000/Member", {
        ...currentMember,
        id: Date.now().toString(),
      });
    }
    setShowModal(false);
    fetchMembers();
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">👥 Members</h2>
        <Button variant="success" onClick={handleAdd}>
          ➕ Add Member
        </Button>
      </div>

      {members.length === 0 && (
        <div className="alert alert-light border text-center">
          No members found.
        </div>
      )}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {members.map((member) => (
          <Col key={member.id}>
            <Card className="member-card h-100">
              <Card.Body>
                <Card.Title className="fw-bold text-truncate">
                  {member.name}
                </Card.Title>
                <Card.Text className="mb-1">📧 {member.email}</Card.Text>
                <Card.Text className="mb-1">📞 {member.phone}</Card.Text>
                <Card.Text className="mb-2">📍 {member.address}</Card.Text>

                <Badge
                  bg={member.isActive ? "success" : "secondary"}
                  className="mb-2"
                >
                  {member.isActive ? "Active" : "Inactive"}
                </Badge>{" "}
                <Badge
                  bg={member.type === "student" ? "info" : "warning"}
                  text="dark"
                >
                  {member.type}
                </Badge>

                <div className="d-flex gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEdit(member)}
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(member.id)}
                  >
                    🗑️ Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentMember?.id ? "Edit Member" : "Add Member"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentMember?.name || ""}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentMember?.email || ""}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={currentMember?.phone || ""}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={currentMember?.address || ""}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, address: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={currentMember?.type || "student"}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, type: e.target.value })
                }
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Active"
                checked={currentMember?.isActive || false}
                onChange={(e) =>
                  setCurrentMember({
                    ...currentMember,
                    isActive: e.target.checked,
                  })
                }
              />
            </Form.Group>
            <Button type="submit" className="mt-3 w-100" variant="success">
              {currentMember?.id ? "Update" : "Add"} Member
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Members;
