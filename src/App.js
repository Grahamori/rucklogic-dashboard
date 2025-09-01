import React, { useState, useEffect } from "react";
import './App.css';
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import FlipForm from "./FlipForm";
import FlipHistory from "./FlipHistory";
import DescriptionHistory from "./DescriptionHistory";
import { generateDescription } from "./generateDescriptions";
import { updateFlip, saveFlip, saveDescription } from "./firestore";
import background from './assets/background.png';
import logo from './assets/logo.png';
import LoadingScreen from "./LoadingScreen";

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("pricing");
  const [editingFlip, setEditingFlip] = useState(null);
  const [refreshFlips, setRefreshFlips] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // const auth = getAuth(app);


  useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 3000); // 3 seconds
  return () => clearTimeout(timer);
}, []);



useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    setUser(user);
    setCheckingAuth(false);
  });
  return () => unsubscribe();
}, []);






  const [input, setInput] = useState({
    brand: "Nike",
    itemType: "hoodie",
    grade: "A",
    platform: "Depop",
    style: "witty",
    size: "L",
    colour: "Black",
    material: "Cotton blend",
    fit: "Relaxed",
    flaws: "Small mark on sleeve",
    personality: ["sarcasm", "resale"]
  });



  const handleLogin = () => {
  const provider = new GoogleAuthProvider();
  // signInWithRedirect(auth, provider);
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log("Popup result:", result);
    setUser(result.user);
  })
  .catch((error) => {
    console.error("Popup login error:", error.code, error.message);
  });

};

  const handleFlipSave = async (flipData) => {
    if (!user) return;

    if (flipData.id) {
      await updateFlip(user.uid, flipData.id, flipData);
    } else {
      const newId = await saveFlip(user.uid, flipData);
      flipData.id = newId;
    }

    setEditingFlip(null);
    setRefreshFlips(prev => prev + 1);
    setView("history");
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setInput((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckbox = (tag) => {
    setInput((prev) => ({
      ...prev,
      personality: prev.personality.includes(tag)
        ? prev.personality.filter((t) => t !== tag)
        : [...prev.personality, tag]
    }));
  };

  const renderView = () => {
    if (loading || checkingAuth) return <LoadingScreen />;


    if (view === "pricing") {
      return (
        <div>
          <h3 className="page-title">Pricing Sheet</h3>
          <FlipForm user={user} flip={editingFlip} onSave={handleFlipSave} />
        </div>
      );
    }

    if (view === "history") {
      return (
        <div>
          <h3 className="page-title">Flip History</h3>
          <FlipHistory
            user={user}
            userId={user?.uid}
            editingFlip={editingFlip}
            refreshTrigger={refreshFlips}
            onEdit={(flip) => {
              setEditingFlip(flip);
              setView("pricing");
            }}
          />
        </div>
      );
    }

    if (view === "descriptions") {
      const description = generateDescription(input);
      return (
        <div>
          <h3 className="description-title">Live Description Generator</h3>

          <div className="form-section">
            <Row>
              <Col md={3}><Form.Control placeholder="Brand" value={input.brand} onChange={handleChange("brand")} /></Col>
              <Col md={3}><Form.Control placeholder="Item Type" value={input.itemType} onChange={handleChange("itemType")} /></Col>
              <Col md={2}><Form.Control placeholder="Size" value={input.size} onChange={handleChange("size")} /></Col>
              <Col md={2}><Form.Control placeholder="Colour" value={input.colour} onChange={handleChange("colour")} /></Col>
              <Col md={2}><Form.Control placeholder="Material" value={input.material} onChange={handleChange("material")} /></Col>
            </Row>

            <Row>
              <Col md={2}><Form.Control placeholder="Fit" value={input.fit} onChange={handleChange("fit")} /></Col>
              <Col md={2}>
                <Form.Select value={input.grade} onChange={handleChange("grade")}>
                  <option value="A">Grade A</option>
                  <option value="B">Grade B</option>
                  <option value="C">Grade C</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Select value={input.platform} onChange={handleChange("platform")}>
                  <option value="Depop">Depop</option>
                  <option value="Vinted">Vinted</option>
                  <option value="eBay">eBay</option>
                </Form.Select>
              </Col>
              <Col md={2}>
                <Form.Select value={input.style} onChange={handleChange("style")}>
                  <option value="neutral">Neutral</option>
                  <option value="witty">Witty</option>
                  <option value="trustworthy">Trustworthy</option>
                  <option value="hype">Hype</option>
                  <option value="minimal">Minimal</option>
                </Form.Select>
              </Col>
              <Col md={4}>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Flaws"
                  value={input.flaws}
                  onChange={handleChange("flaws")}
                />
              </Col>
            </Row>
            <Row className="mt-3">
  <Col md={12}>
    <Button
  variant="success"
  onClick={async () => {
    if (!user) return;
    const descriptionText = generateDescription(input);
    const payload = {
      text: descriptionText,
      style: input.style
    };
    await saveDescription(user.uid, payload);
    setInput((prev) => ({
  ...prev,
  brand: "",
  itemType: "",
  size: "",
  colour: "",
  material: "",
  fit: ""
}));

    alert("Description saved!");
  }}
>
  💾 Save Description
</Button>
  </Col>
</Row>
          </div>

          <div className="checkbox-section">
            <Form.Label className="page-text">Personality Tags</Form.Label>
            <div className="checkbox-grid">
              {["sarcasm", "genZ", "resale", "clean"].map((tag) => (
                <Form.Check
                  key={tag}
                  type="checkbox"
                  label={tag}
                  value={tag}
                  checked={input.personality.includes(tag)}
                  onChange={() => handleCheckbox(tag)}
                />
              ))}
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="page-text">Generated Description</Form.Label>
            <Form.Control as="textarea" rows={5} value={description} readOnly />
          </Form.Group>
        </div>
      );
    }

    if (view === "descHistory") {
  return (
    <div>
      <h3 className="page-title">Description History</h3>
      <DescriptionHistory user={user} />
    </div>
  );
}


    if (view === "about") {
      return (
        <div className="about-container">
          <div>
            <h3 className="page-title-about">About RuckLogic</h3>
            <p className="page-text-about">
              RuckLogic is a modular resale dashboard built for speed, clarity, and branded polish.
              Automate your listings, track your flips, and generate descriptions that actually sell.
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="App">
      <div
        className="background-layer"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      {user && (
        <header className="app-header">
          <h1 className="app-title">RuckLogic</h1>
          <select
            className="nav-dropdown"
            value={view}
            onChange={(e) => setView(e.target.value)}
          >
            <option value="pricing">💰 Pricing Sheet</option>
            <option value="descriptions">📝 Description Generator</option>
            <option value="history">📦 Flip History</option>
            <option value="descHistory">📜 Description History</option>
            <option disabled>────────────</option>
            <option value="about">ℹ️ About</option>
          </select>
        </header>
      )}

            {user ? (
        <Container style={{ marginTop: "20px" }}>
          <div className="user-info">
            <img
              src={user.photoURL}
              alt="User avatar"
              className="user-avatar-inline"
            />
            <span className="user-name">Logged in as: {user.displayName}</span>
          </div>
          {renderView()}
        </Container>
      ) : (
        <div className="login-screen">
          <div className="login-box">
            <img src={logo} alt="RuckLogic logo" className="login-logo" />
            <h2 className="login-welcome">Welcome — please sign in with Google below</h2>
            <button onClick={handleLogin} className="google-login">
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                className="google-icon"
              />
              Sign in with Google
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
