import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";


function Books() {
    const [showbooks, setshowbooks] = useState([]);

    const BooksData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/books");
            setshowbooks(res.data);
        } catch (error) {
            console.log("Server-Down");
        }
    };

    useEffect(() => {
        BooksData();
    }, []);

    return (
        <div className="books-wrap">
            <header className="books-header">
                <h1>Library Management </h1>
            </header>

            <div className="books-grid">
                {showbooks.map((data) => (
                    <article key={data?.id} className="book-card">

                        <div className="book-body">
                            <span className="badge-genre">{data.gener}</span>
                            <h2 className="book-title">{data.title}</h2>

                            <div className="book-meta">
                                <span className="book-author">by {data.author}</span>
                                <span className="book-isbn">ISBN: {data.isbn}</span>
                            </div>

                            <div className="book-footer">
                                <div className="rent">
                                    <span>Rent</span>
                                    <strong>{data.rent}</strong>
                                </div>
                                <Button className="btn-view" variant="primary">View</Button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Books;