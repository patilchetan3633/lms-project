import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Description() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`https://library-json-ufk5.onrender.com/books/${id}`);
                setBook(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBook();
    }, [id]);

    if (!book) return <h2 className="text-center text-muted mt-5">Loading...</h2>;

    return (
        <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light py-4">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 bg-white shadow-lg rounded-4 p-4">
                    <div className="row g-4 align-items-center">
                        <div className="col-12 col-md-5 text-center position-relative">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="img-fluid rounded-3 shadow-sm"
                                style={{ height: "auto", objectFit: "cover", width: "100%" }}
                            />

                            <span className="badge bg-danger position-absolute top-0 start-0 mt-2 ms-2 p-2 fs-6 shadow">
                                Rent: {book.rent}
                            </span>
                        </div>

                        <div className="col-12 col-md-7">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="badge text-dark border border-secondary px-3 py-2 rounded-pill">
                                    Book ID: {book.id}
                                </span>

                                <button
                                    onClick={() => navigate(-1)}
                                    className="btn btn-outline-danger btn-sm px-3"
                                >
                                    ← Back
                                </button>
                            </div>

                            <h2 className="fw-bold text-dark mb-2" style={{ fontSize: "clamp(22px, 3vw, 36px)" }}>
                                {book.title}
                            </h2>
                            <h5 className="text-secondary mb-3"><strong>Author :</strong> {book.author}</h5>
                            <p className="text-muted" style={{ fontSize: "20px", lineHeight: "1.6" }}>
                                {book.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Description;
