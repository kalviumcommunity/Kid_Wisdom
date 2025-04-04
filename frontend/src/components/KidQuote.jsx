export default function KidQuote({ quotes }) {
    return (
      <div style={{ marginTop: "20px" }}>
        <h2>Funny Kid Quotes</h2>
        {quotes.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {quotes.map((quote) => (
              <li key={quote._id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
                <p><strong>"{quote.text}"</strong></p>
                <p>- {quote.author}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No quotes yet. Add some!</p>
        )}
      </div>
    );
  }
  