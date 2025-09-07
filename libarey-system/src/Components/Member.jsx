// import axios from "axios";
// import { useEffect, useState } from "react";

// function Members() {
//     const [membershow, setmembershow] = useState([]);

//     const BooksMember = async () => {
//         try {
//             const res = await axios.get("http://localhost:3000/Member");
//             setmembershow(res.data || []);
//         } catch (error) {
//             console.log("Server-Down");
//         }
//     };

//     useEffect(() => {
//         BooksMember();
//     }, []);

//     return (
//         <div className="container py-4">
//             <h2 className="mb-3 text-black ">Members</h2>

//             {membershow.length === 0 && (
//                 <div className="alert alert-light border">No members found.</div>
//             )}

//             <div className="list-group">
//                 <div className="member-header"></div>
//                 <ol>
//                     {membershow.map((member) => (
//                         <div
//                             key={member?.id}
//                             className="list-group-item member-item"
//                         >
//                             {/* Name */}
//                             <h5 className="mb-2 member-name">{member?.name}</h5>

//                             {/* Details Line by Line */}
//                             <div className="member-details">
//                                 <p className="member-email">📧 {member?.email}</p>
//                                 <p className="member-phone">📞 {member?.phone}</p>
//                                 <p className="member-address">📍 {member?.address}</p>
//                             </div>

//                             {/* Status & Actions */}
//                             <div className="d-flex align-items-center gap-2 mt-3">
//                                 <span className="badge text-bg-primary">{member?.type}</span>
//                                 <span
//                                     className={
//                                         "badge " +
//                                         (member?.isActive ? "text-bg-success" : "text-bg-secondary")
//                                     }
//                                 >
//                                     {member?.isActive ? "Active" : "Inactive"}
//                                 </span>
//                                 <button className="btn btn-danger btn-sm">Delete</button>
//                             </div>
//                         </div>
//                     ))}
//         </ol>
//             </div>
//             <br />
//             <button
//                 type="button"
//                 className="btn btn-outline-success add-member-btn"
//             >
//                 Add Member
//             </button>
//         </div>
//     );
// }

// export default Members;


import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

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
      <h2 className="mb-3 text-black">Members</h2>

      {members.length === 0 && (
        <div className="alert alert-light border">No members found.</div>
      )}

      <ol className="list-group">
        {members.map((member) => (
          <li key={member?.id} className="list-group-item">
            <h5>{member?.name}</h5>
            <p>📧 {member?.email}</p>
            <p>📞 {member?.phone}</p>
            <p>📍 {member?.address}</p>
            <div className="d-flex gap-2">
              <Button size="sm" variant="warning" onClick={() => handleEdit(member)}>Edit</Button>
              <Button size="sm" variant="danger" onClick={() => handleDelete(member.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ol>

      <Button className="mt-3" variant="success" onClick={handleAdd}>
        ➕ Add Member
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentMember?.id ? "Edit Member" : "Add Member"}</Modal.Title>
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

