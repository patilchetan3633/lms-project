import axios from "axios";
import { useEffect, useState } from "react";

function Members() {
    const [membershow, setmembershow] = useState([]);

    const BooksMember = async () => {
        try {
            const res = await axios.get("http://localhost:3000/Member");
            setmembershow(res.data || []);
        } catch (error) {
            console.log("Server-Down");
        }
    };

    useEffect(() => {
        BooksMember();
    }, []);

    return (
        <div className="container py-4">
            <h2 className="mb-3 text-black ">Members</h2>

            {membershow.length === 0 && (
                <div className="alert alert-light border">No members found.</div>
            )}

            <div className="list-group">
                <div className="member-header"></div>
                <ol>
                    {membershow.map((member) => (
                        <div
                            key={member?.id}
                            className="list-group-item member-item"
                        >
                            {/* Name */}
                            <h5 className="mb-2 member-name">{member?.name}</h5>

                            {/* Details Line by Line */}
                            <div className="member-details">
                                <p className="member-email">📧 {member?.email}</p>
                                <p className="member-phone">📞 {member?.phone}</p>
                                <p className="member-address">📍 {member?.address}</p>
                            </div>

                            {/* Status & Actions */}
                            <div className="d-flex align-items-center gap-2 mt-3">
                                <span className="badge text-bg-primary">{member?.type}</span>
                                <span
                                    className={
                                        "badge " +
                                        (member?.isActive ? "text-bg-success" : "text-bg-secondary")
                                    }
                                >
                                    {member?.isActive ? "Active" : "Inactive"}
                                </span>
                                <button className="btn btn-danger btn-sm">Delete</button>
                            </div>
                        </div>
                    ))}
        </ol>
            </div>
            <br />
            <button
                type="button"
                className="btn btn-outline-success add-member-btn"
            >
                Add Member
            </button>
        </div>
    );
}

export default Members;
