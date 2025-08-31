import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import logo from "./assets/logo.png";

const quotes = [
  "Modular resale. Branded polish. Built to flip.",
  "Every listing is a reflection of your philosophy.",
  "Automate the boring. Brand the rest.",
  "From impulse buy to flipper’s delight.",
  "Inventory is strategy. UI is psychology."
];

const welcomeLines = [
  "Let’s get ready to Ruck.",
  "Welcome to the flip zone.",
  "Time to polish and profit.",
  "RuckLogic booting up...",
  "Your dashboard is waking up."
];

function LoadingScreen() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [welcomeLine] = useState(() => {
    return welcomeLines[Math.floor(Math.random() * welcomeLines.length)];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <h2 className="welcome-line">{welcomeLine}</h2>
      <img src={logo} alt="RuckLogic logo" className="loading-logo" />
      <Spinner animation="border" variant="light" />
      <p className="loading-quote">{quotes[quoteIndex]}</p>
      <p className="loading-footer">RuckLogic Loading...</p>
    </div>
  );
}

export default LoadingScreen;
