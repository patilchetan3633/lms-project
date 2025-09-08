import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

function IssueReturn() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);

  const fetchData = async () => {
    const bookRes = await axios.get("http://localhost:3000/books");
    const memberRes = await axios.get("http://localhost:3000/Member");
    setBooks(bookRes.data || []);
    setMembers(memberRes.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIssue = async (bookId, memberId) => {
    const book = books.find((b) => b.id === bookId);
    await axios.put(`http://localhost:3000/books/${bookId}`, {
      ...book,
      isAvailable: false,
      memberId,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    });
    fetchData();
  };

  const handleReturn = async (bookId) => {
    const book = books.find((b) => b.id === bookId);
    await axios.put(`http://localhost:3000/books/${bookId}`, {
      ...book,
      isAvailable: true,
      memberId: "",
      dueDate: "",
    });
    fetchData();
  };

  return (
    <div className="container py-4">
      <h2>📦 Issue & Return Books</h2>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Book</th>
            <th>Author</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b, idx) => (
            <tr key={b.id}>
              <td>{idx + 1}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.isAvailable ? "Available" : "Issued"}</td>
              <td>{b.dueDate || "-"}</td>
              <td>
                {b.isAvailable ? (
                  <select defaultValue="" onChange={(e) => handleIssue(b.id, e.target.value)}>
                    <option value="" disabled>Issue to...</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                ) : (
                  <Button size="sm" variant="success" onClick={() => handleReturn(b.id)}>✅ Return</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default IssueReturn;
