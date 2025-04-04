// src/pages/AddQuote.jsx
import { useState, useEffect } from "react";

export default function AddQuote() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [quotes, setQuotes] = useState([]);

  // Fetch quotes from the server
  useEffect(() => {
    fetch("http://localhost:3000/quotes")
      .then((res) => res.json())
      .then((data) => setQuotes(data))
      .catch((err) => console.error("Error fetching quotes:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !author) return alert("Both fields are required");

    const newQuote = { text, author };
    
    try {
      const res = await fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuote),
      });
      const data = await res.json();
      
      setQuotes([...quotes, { ...newQuote, id: data.id }]); // Update list
      setText("");
      setAuthor("");
    } catch (err) {
      console.error("Error adding quote:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Add a Funny Kid Quote</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quote"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Add Quote</button>
      </form>
      <h3>Quotes List</h3>
      <ul>
        {quotes.map((quote) => (
          <li key={quote.id}>{quote.text} - {quote.author}</li>
        ))}
      </ul>
    </div>
  );
}
