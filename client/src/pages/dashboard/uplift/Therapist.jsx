import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";

const Therapist = () => {
  const [content, setContent] = useState("");
  const [response, setResponse] = useState("What is bothering you?");
  const [showRelatedQuestions, setShowRelatedQuestions] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [voiceAssistant, setVoiceAssistant] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if ("speechSynthesis" in window) {
      setVoiceEnabled(true);
      const assistant = new SpeechSynthesisUtterance();
      assistant.lang = "en-US";
      assistant.pitch = 1;
      assistant.rate = 1;
      setVoiceAssistant(assistant);
    }
  }, []);

  const speakResponse = () => {
    if (voiceAssistant && !isSpeaking) {
      voiceAssistant.text = response;
      setIsSpeaking(true);
      speechSynthesis.speak(voiceAssistant);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call your server or AI service to generate a response based on the user's input
      setResponse("Response from AI goes here...");
      setShowRelatedQuestions(true);
    } catch (error) {
      console.log("error generating response", error);
    }
    setContent("");
    speakResponse();
  };

  const handleConnect = () => {
    // Redirect to care leaver page
  };

  const handleFindSupport = () => {
    window.location.href = "https://blog.opencounseling.com/hotlines-in/";
  };

  const handleSearchSupport = () => {
    window.location.href = "https://www.thelivelovelaughfoundation.org/find-help/helplines";
  };

  useEffect(() => {
    if (showRelatedQuestions) {
      generateRelatedQuestions();
    }
  }, [showRelatedQuestions]);

  const generateRelatedQuestions = async () => {
    try {
      // Call your server to generate related questions based on the user's input
      let res = await axios.post("/generate-questions", {
        input: content,
      });
      setRelatedQuestions(res.data.questions);
    } catch (error) {
      console.log("error generating related questions", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col style={{ margin: "auto" }} xs={12} md={6}>
          <Card className="shadow mt-5">
            <Card.Body>
              <div style={{ height: "300px", overflowY: "scroll" }}>
                {response}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="shadow mt-5">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="textEntry">
              <Form.Label>
                Write about your problems, ask solutions or just vent out.
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="What is bothering you?"
                rows={5}
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="global-theme-button mr-3"
            >
              Submit
            </Button>
            {voiceEnabled && (
              <Button
                variant="primary"
                className="global-theme-button"
                onClick={speakResponse}
                disabled={!response || isSpeaking}
              >
                {isSpeaking ? "Speaking..." : "Speak Response"}
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
      {showRelatedQuestions && (
        <div className="mt-5">
          <h2>Follow-up Questions</h2>
          <ul>
            {relatedQuestions.map((question, index) => (
              <li key={index}>{question}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-5">
        <h2>Connect with Care Leavers Around India</h2>
        <Button
          variant="secondary"
          onClick={handleConnect}
          className="global-theme-button mr-3"
        >
          Connect with Care Leavers
        </Button>
      </div>
      <div className="mt-3">
        <h2>Find Support Across India</h2>
        <Button
          variant="secondary"
          onClick={handleFindSupport}
          className="global-theme-button mr-3"
        >
          Find Support Across India
        </Button>
      </div>
      <div className="mt-3">
        <h2>Search for Support</h2>
        <Button
          variant="secondary"
          onClick={handleSearchSupport}
          className="global-theme-button"
        >
          Search for Support
        </Button>
      </div>
      <footer className="bg-light py-3 mt-5">
        {/* <Container>
          <p className="text-center">Powered by OpenAI's GPT-3.5</p>
        </Container> */}
      </footer>
    </Container>
  );
};

export default Therapist;
