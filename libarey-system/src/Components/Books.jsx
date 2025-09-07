// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";


// function Books() {
//     const [showbooks, setshowbooks] = useState([]);

//     const BooksData = async () => {
//         try {
//             const res = await axios.get("http://localhost:3000/books");
//             setshowbooks(res.data);
//         } catch (error) {
//             console.log("Server-Down");
//         }
//     };

//     useEffect(() => {
//         BooksData();
//     }, []);

//     return (
//         <div className="books-wrap">
//             <header className="books-header">
//                 <h1>Library Management </h1>
//             </header>

//             <div className="books-grid">
//                 {showbooks.map((data) => (
//                     <article key={data?.id} className="book-card">

//                         <div className="book-body">
//                             <span className="badge-genre">{data.gener}</span>
//                             <h2 className="book-title">{data.title}</h2>

//                             <div className="book-meta">
//                                 <span className="book-author">by {data.author}</span>
//                                 <span className="book-isbn">ISBN: {data.isbn}</span>
//                             </div>

//                             <div className="book-footer">
//                                 <div className="rent">
//                                     <span>Rent</span>
//                                     <strong>{data.rent}</strong>
//                                 </div>
//                                 <Button className="btn-view" variant="primary">View</Button>
//                             </div>
//                         </div>
//                     </article>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Books;




import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function Books() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/books");
      setBooks(res.data || []);
    } catch (error) {
      console.log("Server Down");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAdd = () => {
    setCurrentBook({ title: "", author: "", genre: "", rent: false });
    setShowModal(true);
  };

  const handleEdit = (book) => {
    setCurrentBook({ ...book });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      await axios.delete(`http://localhost:3000/books/${id}`);
      fetchBooks();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (currentBook.id) {
      await axios.put(`http://localhost:3000/books/${currentBook.id}`, currentBook);
    } else {
      await axios.post("http://localhost:3000/books", {
        ...currentBook,
        id: Date.now().toString(),
      });
    }
    setShowModal(false);
    fetchBooks();
  };

  return (
    <div className="container py-4">
      <h2 className="mb-3 text-black">Books</h2>

      {books.length === 0 && (
        <div className="alert alert-light border">No books found.</div>
      )}

      <ol className="list-group">
        {books.map((book) => (
          <li key={book?.id} className="list-group-item">
               <img
        src={book.cover || "/images/placeholder.png"}
        alt={book.title}
        style={{
          width: "100px",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "10px"
        }}
      />
            // <h5>{book?.title}</h5>
            <p>✍️ {book?.author}</p>
            <p>📖 {book?.genre}</p>
            <p>{book?.rent ? "Rented" : "Available"}</p>
            <div className="d-flex gap-2">
              <Button size="sm" variant="warning" onClick={() => handleEdit(book)}>Edit</Button>
              <Button size="sm" variant="danger" onClick={() => handleDelete(book.id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ol>

      <Button className="mt-3" variant="success" onClick={handleAdd}>
        ➕ Add Book
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentBook?.id ? "Edit Book" : "Add Book"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSave}>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={currentBook?.title || ""}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, title: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={currentBook?.author || ""}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, author: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                value={currentBook?.genre || ""}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, genre: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Rented"
                checked={currentBook?.rent || false}
                onChange={(e) =>
                  setCurrentBook({ ...currentBook, rent: e.target.checked })
                }
              />
            </Form.Group>
            <Button type="submit" className="mt-3 w-100" variant="success">
              {currentBook?.id ? "Update" : "Add"} Book
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Books;
