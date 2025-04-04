import { useEffect, useState } from "react";
import KidQuote from "./components/KidQuote";

export default function App() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/quotes") // Adjust if your backend is running elsewhere
      .then((response) => response.json())
      .then((data) => setQuotes(data))
      .catch((error) => console.error("Error fetching quotes:", error));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to Funny Things Kids Say!</h1>
      <p>A platform to share and enjoy hilarious kid quotes.</p>

      {/* Render KidQuote with fetched quotes */}
      <KidQuote quotes={quotes} />
    </div>
  );
}
