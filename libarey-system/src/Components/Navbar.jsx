import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useState } from "react";

function LibraryNavbar({ isLoggedIn, setIsLoggedIn, role, setRole }) {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "123") {
      setRole("admin");
      setIsLoggedIn(true);
      alert("Admin Logged In");
      setShowModal(false);
      navigate("/books"); // login ke baad redirect
    } else if (username === "user" && password === "123") {
      setRole("user");
      setIsLoggedIn(true);
      alert("User Logged In");
      setShowModal(false);
      navigate("/books"); // login ke baad redirect
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
    navigate("/");
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          {/* 🔥 Logo + Brand */}
          <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center gap-2">
            <img
              src={logo}
              alt="Library Logo"
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              }}
            />
            <span className="fw-bold">Library Management</span>
          </Navbar.Brand>

          {/* 🔥 Nav Links */}
          <Nav className="me-auto gap-2">
            <Nav.Link as={NavLink} to="/" end>
              Dashboard
            </Nav.Link>

            {isLoggedIn && (
              <Nav.Link as={NavLink} to="/books">
                Books
              </Nav.Link>
            )}

            {isLoggedIn && role === "admin" && (
              <Nav.Link as={NavLink} to="/members">
                Members
              </Nav.Link>
            )}

            {isLoggedIn && (
              <Nav.Link as={NavLink} to="/fines">
                Fines
              </Nav.Link>
            )}

            {isLoggedIn && (
              <Nav.Link as={NavLink} to="/issue-return">
                Issue/Return
              </Nav.Link>
            )}

              {isLoggedIn && (
              <Nav.Link as={NavLink} to="/reservation">
                Reservation
              </Nav.Link>
            )}

          </Nav>

          {/* 🔥 Right-side Buttons */}
          <div className="d-flex gap-2">
            {!isLoggedIn ? (
              <Button variant="outline-dark" onClick={() => setShowModal(true)}>
                Login
              </Button>
            ) : (
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
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
