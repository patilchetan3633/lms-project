// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Card, Row, Col, Button, Badge } from "react-bootstrap";
// import "./Fines.css";

// function Fines() {
//   const [books, setBooks] = useState([]);
//   const [members, setMembers] = useState([]);

//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/books");
//       setBooks(res.data || []);
//     } catch (err) {
//       console.log("Books fetch error");
//     }
//   };

//   const fetchMembers = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/Member");
//       setMembers(res.data || []);
//     } catch (err) {
//       console.log("Members fetch error");
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//     fetchMembers();
//   }, []);

//   // ✅ Fine calculate
//   const calculateFine = (dueDate) => {
//     if (!dueDate) return 0;
//     const today = new Date();
//     const due = new Date(dueDate);
//     const diffTime = today - due;
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays > 0 ? diffDays * 10 : 0; // ₹10 per day
//   };

//   const getMemberName = (memberId) => {
//     const member = members.find((m) => m.id === memberId);
//     return member ? member.name : "Unknown";
//   };

//   // ✅ Fine payment update
//   const handlePayFine = async (bookId) => {
//     const book = books.find((b) => b.id === bookId);
//     if (!book) return;

//     await axios.put(`http://localhost:3000/books/${bookId}`, {
//       ...book,
//       finePaid: true, // 👈 new property in DB
//     });

//     fetchBooks();
//   };

//   return (
//     <div className="container py-4">
//       <h2 className="fw-bold text-primary mb-4">💰 Fines</h2>
//       {books.filter((b) => b.rent).length === 0 ? (
//         <div className="alert alert-light border text-center">No fines!</div>
//       ) : (
//         <Row xs={1} sm={2} md={3} lg={4} className="g-4">
//           {books
//             .filter((b) => b.rent)
//             .map((book) => {
//               const fine = calculateFine(book.dueDate);
//               return (
//                 <Col key={book.id}>
//                   <Card className="fine-card h-100 shadow-sm">
//                     <Card.Body>
//                       <Card.Title className="fw-bold">{book.title}</Card.Title>
//                       <Card.Text>✍️ {book.author}</Card.Text>
//                       <Card.Text>👤 {getMemberName(book.memberId)}</Card.Text>
//                       <Card.Text>🗓️ Due: {book.dueDate || "-"}</Card.Text>
//                       <Card.Text>
//                         💸 Fine:{" "}
//                         <span className={fine > 0 ? "text-danger fw-bold" : "text-success"}>
//                           {fine} ₹
//                         </span>
//                       </Card.Text>

//                       {/* ✅ Payment Status */}
//                       <Card.Text>
//                         Status:{" "}
//                         {book.finePaid ? (
//                           <Badge bg="success">Paid</Badge>
//                         ) : fine > 0 ? (
//                           <Badge bg="danger">Unpaid</Badge>
//                         ) : (
//                           <Badge bg="secondary">No Fine</Badge>
//                         )}
//                       </Card.Text>

//                       {/* ✅ Pay Button */}
//                       {!book.finePaid && fine > 0 && (
//                         <Button
//                           variant="success"
//                           size="sm"
//                           onClick={() => handlePayFine(book.id)}
//                         >
//                           Pay Fine
//                         </Button>
//                       )}
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               );
//             })}
//         </Row>
//       )}
//     </div>
//   );
// }

// export default Fines;

import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";
import "./Fines.css";

function Fines() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  // 🔹 Fetch Books
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/books");
      setBooks(res.data || []);
    } catch (err) {
      console.log("Books fetch error");
    }
  };

  // 🔹 Fetch Members
  const fetchMembers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/Member");
      setMembers(res.data || []);
    } catch (err) {
      console.log("Members fetch error");
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchMembers();
  }, []);

  // 🔹 Fine calculation
  const calculateFine = (dueDate, finePaid) => {
    if (!dueDate || finePaid) return 0;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays * 10 : 0; // ₹10/day
  };

  // 🔹 Get member name
  const getMemberName = (memberId) => {
    const member = members.find((m) => m.id === memberId);
    return member ? member.name : "Unknown";
  };

  // 🔹 Update fine status
  const handlePayFine = async (bookId) => {
    const book = books.find((b) => b.id === bookId);
    if (!book) return;

    await axios.put(`http://localhost:3000/books/${bookId}`, {
      ...book,
      finePaid: true,
    });

    fetchBooks();
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-primary mb-4">💰 Fines</h2>

      {books.filter((b) => b.rent).length === 0 ? (
        <div className="alert alert-light border text-center">No fines!</div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {books
            .filter((b) => b.rent)
            .map((book) => {
              const fine = calculateFine(book.dueDate, book.finePaid);
              return (
                <Col key={book.id}>
                  <Card className="fine-card h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title className="fw-bold">{book.title}</Card.Title>
                      <Card.Text>✍️ {book.author}</Card.Text>
                      <Card.Text>👤 {getMemberName(book.memberId)}</Card.Text>
                      <Card.Text>🗓️ Due: {book.dueDate || "-"}</Card.Text>

                      <Card.Text>
                        💸 Fine:{" "}
                        <span
                          className={fine > 0 ? "text-danger fw-bold" : "text-success fw-bold"}
                        >
                          {fine} ₹
                        </span>
                      </Card.Text>

                      {/* 🔹 Payment Status */}
                      <Card.Text>
                        Status:{" "}
                        {book.finePaid ? (
                          <Badge bg="success">Paid</Badge>
                        ) : fine > 0 ? (
                          <Badge bg="danger">Unpaid</Badge>
                        ) : (
                          <Badge bg="secondary">No Fine</Badge>
                        )}
                      </Card.Text>

                      {/* 🔹 Pay Fine Button */}
                      {!book.finePaid && fine > 0 && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handlePayFine(book.id)}
                        >
                          Pay Fine
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      )}
    </div>
  );
}

export default Fines;
