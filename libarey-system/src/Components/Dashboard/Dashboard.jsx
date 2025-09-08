import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [fines, setFines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRes = await axios.get("http://localhost:3000/books");
        const memberRes = await axios.get("http://localhost:3000/Member");
        const fineRes = await axios.get("http://localhost:3000/fines");
        setBooks(bookRes.data || []);
        setMembers(memberRes.data || []);
        setFines(fineRes.data || []);
      } catch (error) {
        console.log("Error fetching dashboard data", error);
      }
    };
    fetchData();
  }, []);

  // Pie Chart ke liye genre wise data
  const genreData = Object.values(
    books.reduce((acc, book) => {
      acc[book.genre] = acc[book.genre] || { name: book.genre, value: 0 };
      acc[book.genre].value += 1;
      return acc;
    }, {})
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-primary mb-4">📊 Library Dashboard</h2>

      {/* Top Stats */}
      <Row className="mb-4 g-4">
        <Col md={4}>
          <Card className="shadow-sm text-center p-3">
            <h5>📚 Total Books</h5>
            <h3 className="fw-bold text-success">{books.length}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center p-3">
            <h5>👥 Members</h5>
            <h3 className="fw-bold text-info">{members.length}</h3>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center p-3">
            <h5>💰 Fines</h5>
            <h3 className="fw-bold text-danger">{fines.length}</h3>
          </Card>
        </Col>
      </Row>

      {/* Charts + Recent Members */}
      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm p-3">
            <h5 className="text-center">📖 Books by Genre</h5>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {genreData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm p-3">
            <h5>🆕 Recent Members</h5>
            <ListGroup variant="flush">
              {members.slice(-5).map((m) => (
                <ListGroup.Item key={m.id}>
                  <strong>{m.name}</strong> – {m.type}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;

