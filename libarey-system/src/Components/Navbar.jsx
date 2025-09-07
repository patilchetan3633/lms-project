import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg"; // 🖼️ Your custom logo

function LibraryNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(true);

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "123") {
      setRole("admin");
      setIsLoggedIn(true);
      alert("Admin Logged In");
      setShowModal(false);
    } else if (username === "user" && password === "123") {
      setRole("user");
      setIsLoggedIn(true);
      alert("User Logged In");
      setShowModal(false);
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
    setDisable(true);
  };

  return (
    <>
      <Navbar bg="light" className="shadow-sm">
        <Container className="d-flex justify-content-between align-items-center">
          {/* 🔥 LOGO + BRAND */}
          <div className="d-flex align-items-center gap-2">
            <img
              src={logo}
              alt="Library Logo"
              style={{
                width: "65px",
                height: "65px",
                borderRadius: "20%",
                objectFit: "cover",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            />
            <h4 className="m-0 fw-bold" style={{ color: "#333" }}>
              Library Management
            </h4>
          </div>

          {/* 🔥 BUTTONS */}
          <div className="d-flex gap-2">
            {!isLoggedIn && (
              <Button
                variant="outline-dark"
                onClick={() => setShowModal(true)}
              >
                Login
              </Button>
            )}

            {isLoggedIn && (role === "admin" ? (
              <Button
                as={NavLink}
                to="/members"
                variant="outline-info"
                onClick={() => setDisable(false)}
              >
                Members
              </Button>
            ) : (
              <Button variant="outline-info" disabled>
                Members
              </Button>
            ))}

            {isLoggedIn && (
              <Button onClick={handleGoBack} disabled={disable}>
                Library
              </Button>
            )}
          </div>
        </Container>
      </Navbar>

      {/* 🔥 Login Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="admin / user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LibraryNavbar;
