import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import KidQuote from "./components/KidQuote";
import AddQuote from "./pages/AddQuote";
import EditQuote from "./pages/EditQuote";

export default function App() {
  const [quotes, setQuotes] = useState([]);

  async function fetchQuotes() {
    try {
      const res = await fetch("http://localhost:3000/quotes");
      const data = await res.json();
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  }

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <Router>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Welcome to Funny Things Kids Say!</h1>
        <p>A platform to share and enjoy hilarious kid quotes.</p>

        <nav>
          <Link to="/">Home</Link> | <Link to="/add-quote">Add Quote</Link>
        </nav>

        <Routes>
          <Route path="/" element={<KidQuote quotes={quotes} fetchQuotes={fetchQuotes} />} />
          <Route path="/add-quote" element={<AddQuote />} />
          <Route path="/edit-quote/:id" element={<EditQuote />} />
        </Routes>
      </div>
    </Router>
  );
}
