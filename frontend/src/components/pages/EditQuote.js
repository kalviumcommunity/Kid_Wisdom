import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditQuote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    async function fetchQuote() {
      try {
        const res = await fetch(`http://localhost:3000/quotes/${id}`);
        const data = await res.json();
        setText(data.text);
        setAuthor(data.author);
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    }
    fetchQuote();
  }, [id]);

  async function updateQuote(e) {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3000/quotes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, author }),
      });
      navigate("/"); // Redirect to home after update
    } catch (error) {
      console.error("Error updating quote:", error);
    }
  }

  return (
    <div>
      <h2>Edit Quote</h2>
      <form onSubmit={updateQuote}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New Text" />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="New Author" />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
