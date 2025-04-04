const KidQuote = () => {
    const quote = {
      text: "I don’t need school, Google knows everything!",
      author: "4-year-old Emma",
    };
  
    return (
      <div style={{ border: "2px solid black", padding: "10px", width: "300px", borderRadius: "10px" }}>
        <h3>Funny Quote</h3>
        <p>"{quote.text}"</p>
        <p>- {quote.author}</p>
      </div>
    );
  };
  
  export default KidQuote;
  