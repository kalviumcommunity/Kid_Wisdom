import { Link } from "react-router-dom";

export default function KidQuote({ quotes, fetchQuotes }) {
  async function deleteQuote(id) {
    try {
      await fetch(`http://localhost:3000/quotes/${id}`, { method: "DELETE" });
      fetchQuotes(); // Refresh quotes after deletion
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Funny Kid Quotes</h2>
      {quotes.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {quotes.map((quote) => (
            <li key={quote._id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
              <p><strong>"{quote.text}"</strong></p>
              <p>- {quote.author}</p>
              <button onClick={() => deleteQuote(quote._id)}>Delete</button>
              <Link to={`/edit-quote/${quote._id}`}>
                <button>Edit</button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quotes yet. Add some!</p>
      )}
    </div>
  );
}
