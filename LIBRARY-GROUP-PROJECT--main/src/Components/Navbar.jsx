import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { IoLibrary } from "react-icons/io5";
import { useAuth } from "./AuthContext";
import {
  Navbar,
  Container,
  Button,
  Modal,
  Form,
  Dropdown,
  Nav,
} from "react-bootstrap";

function LibraryNavbar() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedIn, role, login, logout } = useAuth();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const msg = login(username, password);
    if (msg) alert(msg);
    setUsername("");
    setPassword("");
    setShowModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="shadow-sm"
        style={{ backgroundColor: "#ffffffff" }}
      >
        <Container>
          <Navbar.Brand
            style={{ cursor: "pointer", fontWeight: "bold" }}
            onClick={() => navigate("/")}
          >
            <IoLibrary size={26} className="me-2" />
            Library
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center gap-2">
              {isLoggedIn && (
                <Button
                  style={{
                    backgroundColor: "#000000ff",
                    border: "none",
                    color: "white",
                    fontSize: "16px",
                  }}
                  disabled={location.pathname === "/"}
                  onClick={() => navigate("/")}
                >
                  Library
                </Button>
              )}

              {!isLoggedIn && (
                <Button variant="success" onClick={() => setShowModal(true)}>
                  Login
                </Button>
              )}

              {isLoggedIn && role === "admin" && (
                <>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="secondary"
                      style={{
                        backgroundColor: "#000000ff",
                        border: "none",
                        color: "white",
                        fontSize: "16px",
                      }}
                    >
                      Records
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={NavLink} to="/Issues">
                        Issues
                      </Dropdown.Item>
                      <Dropdown.Item as={NavLink} to="/Fines">
                        Fines
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Button
                    style={{
                      backgroundColor: "#0e0000ff",
                      border: "none",
                      color: "white",
                      fontSize: "16px",
                    }}
                    onClick={() => navigate("/Members")}
                  >
                    Members
                  </Button>
                </>
              )}

              {isLoggedIn && (
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username (Admin / User)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
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
