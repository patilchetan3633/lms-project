import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { IoLibrary } from "react-icons/io5";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { NavLink, useNavigate } from "react-router-dom";


function LibraryNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ setLibraryButton] = useState(false)
  const [disable, setdisable] = useState(true)
  const LibraryBack = useNavigate()
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
  const handleonetimeback = () => {
    LibraryBack(-1)
    setdisable(true)
  }
  const disbalebutton = () => {
    setdisable(false)
  }

  return (
    <>
      <Navbar bg="#BBDCE5" data-bs-theme="dark">
        <Container>
          <div style={{ color: "black" }}>
            <IoLibrary style={{ fontSize: "40px" }} /> Librart-Management
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {!isLoggedIn && (
              <Button
                variant="outline-dark"
                onClick={() => setShowModal(true)}
              >
                Login
              </Button>
            )}

            {isLoggedIn && (role == "admin" ? (
              <Button
                as={NavLink}
                to={"/Members"}
                variant="outline-info"
                onClick={() => {
                  setLibraryButton(false)
                  disbalebutton()
                }}>
                Members
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "black", color: "black" }}
                variant="outline-info"
                disabled
              >
                Members
              </Button>
            ))}
            {isLoggedIn && (<Button onClick={handleonetimeback} disabled={disable} >
              Library
            </Button>)}

          </div>
        </Container>
      </Navbar >

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
