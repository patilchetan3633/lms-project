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
                <div className="member-header">
                    <h5>Name</h5>
                    <h5>Email</h5>
                    <h5>Phone.No</h5>
                    <h5>Address</h5>
                </div>
                <ol>
                    {membershow.map((member) => (
                        <div
                            key={member?.id}
                            className="list-group-item member-item d-flex align-items-center justify-content-evenly gap-3"
                        >
                            <div className="d-flex flex-column flex-md-row align-items-md-center gap-2">
                                <li></li>
                                <h5 className="mb-0 member-name">{member?.name}</h5>
                                <span className="text-muted small">•</span>
                                <span className="member-email">{member?.email}</span>
                            </div>

                            <div className="d-flex flex-wrap gap-2">
                                <span className="badge member-phone">
                                     {member?.phone}
                                </span>
                                <span className="text-truncate small member-address">
                                     {member?.address}
                                </span>
                            </div>

                            <div className="d-flex align-items-center gap-1">
                                <span className="badge text-bg-primary">{member?.type}</span>
                                <span
                                    className={
                                        "badge " +
                                        (member?.isActive ? "text-bg-success" : "text-bg-secondary")
                                    }
                                >
                                    {member?.isActive ? "Active" : "Inactive"}
                                </span>
                                <span>
                                    <button className="btn btn-danger">Delete</button>
                                </span>
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