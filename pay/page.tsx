import type { NextPage } from "next";
import Link from "next/link";

const PayPage: NextPage = () => {
    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>Payment Options</h1>
            <div style={{ marginTop: "40px" }}>
                <h2>Choose your payment method:</h2>
                <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                    <button 
                        style={{
                            padding: "15px 30px",
                            fontSize: "16px",
                            backgroundColor: "#0070f3",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}
                    >
                        Pay with PayPal
                    </button>
                    <button 
                        style={{
                            padding: "15px 30px",
                            fontSize: "16px",
                            backgroundColor: "#635bff",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}
                    >
                        Pay with Stripe
                    </button>
                </div>
                <Link href="/" style={{ display: "inline-block", marginTop: "40px", color: "#0070f3" }}>
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
};

export default PayPage;