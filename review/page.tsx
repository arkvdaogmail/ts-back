import type { NextPage } from "next";
import Link from "next/link";

const ReviewPage: NextPage = () => {
    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Leave a Review</h1>
            <form style={{ marginTop: "40px" }}>
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="name" style={{ display: "block", marginBottom: "8px" }}>
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ddd",
                            borderRadius: "4px"
                        }}
                    />
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="rating" style={{ display: "block", marginBottom: "8px" }}>
                        Rating
                    </label>
                    <select
                        id="rating"
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ddd",
                            borderRadius: "4px"
                        }}
                    >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="review" style={{ display: "block", marginBottom: "8px" }}>
                        Your Review
                    </label>
                    <textarea
                        id="review"
                        rows={5}
                        style={{
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            border: "1px solid #ddd",
                            borderRadius: "4px"
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: "12px 30px",
                        fontSize: "16px",
                        backgroundColor: "#0070f3",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    Submit Review
                </button>
            </form>
            <Link href="/" style={{ display: "inline-block", marginTop: "40px", color: "#0070f3" }}>
                ← Back to Home
            </Link>
        </div>
    );
};

export default ReviewPage;