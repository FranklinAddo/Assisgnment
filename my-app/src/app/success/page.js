'use client';

export default function OrderSuccess() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Order Successful!</h1>
      <p>Enjoy your meal!!</p>
      <p>Thank you for your purchase.</p>
      <p>Come back for more.....</p>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#7b1fa2",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() => (window.location.href = "/dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  );
}
